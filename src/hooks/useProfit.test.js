import { renderHook, waitFor } from '@testing-library/react';
import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest';
import { useProfit } from './useProfit.js';

describe('useProfit', () => {
  beforeEach(() => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({
        total: 500,
        lastPayment: { amount: 49, source: 'acme.co', time: '2026-06-08T00:00:00Z' },
      }),
    }));
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllMocks();
  });

  it('fetches /api/profit on mount and returns data', async () => {
    const { result } = renderHook(() => useProfit());

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(result.current.total).toBe(500);
    expect(result.current.lastPayment).toEqual({
      amount: 49, source: 'acme.co', time: '2026-06-08T00:00:00Z',
    });
    expect(fetch).toHaveBeenCalledWith('/api/profit');
  });

  it('handles fetch errors gracefully and sets loading false', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Network error')));

    const { result } = renderHook(() => useProfit());

    await waitFor(() => expect(result.current.loading).toBe(false));
    expect(result.current.total).toBe(0);
    expect(result.current.lastPayment).toBe(null);
  });
});
