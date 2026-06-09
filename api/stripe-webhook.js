import Stripe from 'stripe';
import { Redis } from '@upstash/redis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const redis = Redis.fromEnv();

// Reads the raw request body as a Buffer so Stripe can verify the webhook signature.
// This works because Vercel's plain Node.js serverless runtime does NOT auto-parse
// the request body (unlike Next.js API routes), so the stream is still readable here.
async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  let amount = 0;
  let source = 'stripe';

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    amount = pi.amount / 100; // Stripe amounts are in cents
    source = pi.metadata?.customer_email || pi.description || 'stripe';
  } else if (event.type === 'invoice.paid') {
    const inv = event.data.object;
    amount = inv.amount_paid / 100;
    source = inv.customer_email || 'stripe';
  } else {
    return res.status(200).json({ received: true });
  }

  // incrbyfloat is atomic — safe if two webhooks arrive simultaneously
  await Promise.all([
    redis.incrbyfloat('profit_total', amount),
    redis.set('last_payment', { amount, source, time: new Date().toISOString() }),
  ]);

  return res.status(200).json({ received: true });
}
