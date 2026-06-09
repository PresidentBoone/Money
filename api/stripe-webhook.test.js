import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mocks must be declared before any imports that use them
vi.mock('@vercel/kv', () => ({
  kv: {
    incrbyfloat: vi.fn().mockResolvedValue(100),
    set: vi.fn().mockResolvedValue('OK'),
  },
}));

const mockConstructEvent = vi.fn();
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    webhooks: { constructEvent: mockConstructEvent },
  })),
}));

const { default: handler } = await import('./stripe-webhook.js');

// Builds a minimal req-like object that emits 'data' + 'end' synchronously
function makeReq({ method = 'POST', sig = 'valid-sig', body = Buffer.from('{}') } = {}) {
  return {
    method,
    headers: { 'stripe-signature': sig },
    on(event, cb) {
      if (event === 'data') cb(body);
      if (event === 'end') cb();
      return this;
    },
  };
}

function makeRes() {
  const res = { _status: 200, _body: null };
  res.status = (code) => { res._status = code; return res; };
  res.json = (body) => { res._body = body; return res; };
  return res;
}

describe('stripe-webhook handler', () => {
  beforeEach(() => vi.clearAllMocks());

  it('rejects non-POST methods with 405', async () => {
    const res = makeRes();
    await handler({ method: 'GET', headers: {} }, res);
    expect(res._status).toBe(405);
  });

  it('returns 400 when Stripe signature verification fails', async () => {
    mockConstructEvent.mockImplementationOnce(() => { throw new Error('Bad sig'); });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(res._status).toBe(400);
    expect(res._body.error).toContain('Webhook Error');
  });

  it('increments profit_total and responds 200 on payment_intent.succeeded', async () => {
    const { kv } = await import('@vercel/kv');
    mockConstructEvent.mockReturnValueOnce({
      type: 'payment_intent.succeeded',
      data: { object: { amount: 4900, metadata: { customer_email: 'test@acme.co' }, description: null } },
    });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(kv.incrbyfloat).toHaveBeenCalledWith('profit_total', 49);
    expect(kv.set).toHaveBeenCalledWith('last_payment', expect.objectContaining({ amount: 49, source: 'test@acme.co' }));
    expect(res._status).toBe(200);
    expect(res._body).toEqual({ received: true });
  });

  it('increments profit_total and responds 200 on invoice.paid', async () => {
    const { kv } = await import('@vercel/kv');
    mockConstructEvent.mockReturnValueOnce({
      type: 'invoice.paid',
      data: { object: { amount_paid: 19900, customer_email: 'globex@io.com' } },
    });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(kv.incrbyfloat).toHaveBeenCalledWith('profit_total', 199);
    expect(res._status).toBe(200);
  });

  it('ignores unhandled event types and returns 200', async () => {
    const { kv } = await import('@vercel/kv');
    mockConstructEvent.mockReturnValueOnce({ type: 'customer.created', data: { object: {} } });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(kv.incrbyfloat).not.toHaveBeenCalled();
    expect(res._status).toBe(200);
  });
});
