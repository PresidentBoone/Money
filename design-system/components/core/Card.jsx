import React from 'react';

/**
 * Card — the base dark surface container. Optional green/gold glow border
 * for "unlocked" / highlighted states.
 */
export function Card({
  children,
  glow = 'none',     // 'none' | 'green' | 'gold'
  padding = 'var(--space-5)',
  interactive = false,
  style = {},
  ...rest
}) {
  const glows = {
    none: { border: '1px solid var(--border-hairline)', boxShadow: 'var(--shadow-card)' },
    green: { border: '1px solid color-mix(in oklab, var(--green-500) 50%, transparent)', boxShadow: 'var(--glow-green-soft), var(--shadow-card)' },
    gold: { border: '1px solid color-mix(in oklab, var(--gold-500) 50%, transparent)', boxShadow: '0 0 26px color-mix(in oklab, var(--gold-500) 22%, transparent), var(--shadow-card)' },
  };
  const g = glows[glow] || glows.none;

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--surface-card)',
        borderRadius: 'var(--radius-md)',
        padding,
        transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
        ...g,
        ...style,
      }}
      onMouseEnter={interactive ? (e) => { e.currentTarget.style.transform = 'translateY(-3px)'; e.currentTarget.style.borderColor = 'var(--border-strong)'; } : undefined}
      onMouseLeave={interactive ? (e) => { e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.borderColor = g.border.split(' ').slice(2).join(' '); } : undefined}
      {...rest}
    >
      {children}
    </div>
  );
}
