import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [total, lastPayment] = await Promise.all([
    kv.get('profit_total'),
    kv.get('last_payment'),
  ]);

  res.status(200).json({
    total: total ?? 0,
    lastPayment: lastPayment ?? null,
  });
}
