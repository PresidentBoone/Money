import React from 'react';

/**
 * Badge — small status pill. Used for milestone states (locked / unlocked / live)
 * and inline tags. The `live` tone gets a pulsing dot.
 */
export function Badge({
  children,
  tone = 'neutral',  // 'unlocked' | 'locked' | 'live' | 'cash' | 'neutral'
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    unlocked: { bg: 'color-mix(in oklab, var(--green-500) 18%, transparent)', fg: 'var(--green-300)', bd: 'color-mix(in oklab, var(--green-500) 45%, transparent)' },
    locked:   { bg: 'var(--surface-chip)', fg: 'var(--text-lo)', bd: 'var(--border-hairline)' },
    live:     { bg: 'color-mix(in oklab, var(--green-500) 14%, transparent)', fg: 'var(--green-300)', bd: 'color-mix(in oklab, var(--green-500) 40%, transparent)' },
    cash:     { bg: 'color-mix(in oklab, var(--gold-500) 18%, transparent)', fg: 'var(--gold-300)', bd: 'color-mix(in oklab, var(--gold-500) 45%, transparent)' },
    neutral:  { bg: 'var(--surface-chip)', fg: 'var(--text-mid)', bd: 'var(--border-hairline)' },
  };
  const t = tones[tone] || tones.neutral;

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: '6px',
        padding: '4px 10px',
        background: t.bg,
        color: t.fg,
        border: `1px solid ${t.bd}`,
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-2xs)',
        fontWeight: 'var(--fw-medium)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {(dot || tone === 'live') && (
        <span
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            background: 'currentColor',
            boxShadow: '0 0 8px currentColor',
            animation: tone === 'live' ? 'wr-pulse 1.4s var(--ease-in-out) infinite' : 'none',
          }}
        />
      )}
      {children}
      <style>{`@keyframes wr-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }`}</style>
    </span>
  );
}
