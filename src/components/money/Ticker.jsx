import React from 'react';

/**
 * Ticker — the "last payment received" live readout. Mono, green amount,
 * pulsing LIVE dot. Pass the latest payment as props.
 */
export function Ticker({
  amount,            // e.g. "+$49.00"
  source = '',       // e.g. "acme.co"
  ago = '',          // e.g. "2 min ago"
  live = true,
  style = {},
  ...rest
}) {
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '12px',
        padding: '10px 16px',
        background: 'var(--surface-card)',
        border: '1px solid var(--border-hairline)',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-sm)',
        ...style,
      }}
      {...rest}
    >
      {live && (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: '7px' }}>
          <span style={{
            width: '7px', height: '7px', borderRadius: '50%',
            background: 'var(--green-400)', boxShadow: '0 0 10px var(--green-400)',
            animation: 'wr-ticker-pulse 1.4s var(--ease-in-out) infinite',
          }} />
          <span style={{ color: 'var(--text-lo)', letterSpacing: '0.08em', textTransform: 'uppercase', fontSize: 'var(--fs-2xs)' }}>Last payment</span>
        </span>
      )}
      <span style={{ color: 'var(--green-400)', fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums' }}>{amount}</span>
      {source && <span style={{ color: 'var(--text-mid)' }}>· {source}</span>}
      {ago && <span style={{ color: 'var(--text-lo)' }}>· {ago}</span>}
      <style>{`@keyframes wr-ticker-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }`}</style>
    </div>
  );
}
