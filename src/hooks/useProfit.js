import { useState, useEffect } from 'react';

const POLL_MS = 10_000;
const MOCK_VALUE = import.meta.env.VITE_MOCK_PROFIT;

export function useProfit() {
  const mockTotal = MOCK_VALUE ? Number(MOCK_VALUE) : null;
  const [total, setTotal] = useState(mockTotal ?? 0);
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(mockTotal === null);

  useEffect(() => {
    if (mockTotal !== null) return; // mock mode: no polling

    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch('/api/profit');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setTotal(data.total ?? 0);
          setLastPayment(data.lastPayment ?? null);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => {
      cancelled = true;
      clearInterval(id);
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { total, lastPayment, loading };
}
