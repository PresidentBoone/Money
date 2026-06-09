import React from 'react';
import { Card } from '../core/Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { ProgressBar } from './ProgressBar.jsx';

/**
 * MilestoneCard — one unlockable goal. Shows emoji, name, target amount,
 * a dumb funny subtitle, progress %, and a locked vs unlocked state.
 */
export function MilestoneCard({
  emoji,
  name,
  amount,           // numeric target, e.g. 3000
  amountLabel,      // optional pre-formatted, e.g. "$3,000"
  subtitle,
  current = 0,      // current total profit
  index = null,     // optional ordinal for the corner marker
  style = {},
  ...rest
}) {
  const unlocked = current >= amount;
  const pct = Math.max(0, Math.min(100, (current / amount) * 100));
  const fmt = (n) => '$' + n.toLocaleString('en-US');

  return (
    <Card
      glow={unlocked ? 'green' : 'none'}
      interactive
      padding="var(--space-5)"
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--space-4)', opacity: unlocked ? 1 : 0.96, ...style }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '12px' }}>
        <div style={{
          fontSize: '40px', lineHeight: 1,
          filter: unlocked ? 'none' : 'grayscale(0.85) opacity(0.55)',
          transition: 'filter var(--dur-base) var(--ease-out)',
        }}>{emoji}</div>
        {unlocked
          ? <Badge tone="unlocked" dot>Unlocked</Badge>
          : <Badge tone="locked">Locked</Badge>}
      </div>

      <div>
        <div style={{ display: 'flex', alignItems: 'baseline', gap: '8px' }}>
          {index != null && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--text-lo)' }}>
              {String(index).padStart(2, '0')}
            </span>
          )}
          <h3 style={{
            fontFamily: 'var(--font-display)', textTransform: 'uppercase',
            fontSize: 'var(--fs-lg)', letterSpacing: '0.01em',
            color: unlocked ? 'var(--text-hi)' : 'var(--text-mid)', margin: 0,
          }}>{name}</h3>
        </div>
        <div style={{
          fontFamily: 'var(--font-numeric)', fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums',
          fontSize: 'var(--fs-2xl)', marginTop: '4px',
          color: unlocked ? 'var(--green-400)' : 'var(--text-body)',
          textShadow: unlocked ? 'var(--text-glow-green)' : 'none',
        }}>{amountLabel || fmt(amount)}</div>
      </div>

      {subtitle && (
        <p style={{
          fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-sm)', lineHeight: 1.45,
          color: 'var(--text-mid)', margin: 0, textWrap: 'pretty',
        }}>{subtitle}</p>
      )}

      <div style={{ marginTop: 'auto', display: 'flex', flexDirection: 'column', gap: '7px' }}>
        <ProgressBar value={current} max={amount} height={10} showLabel />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--text-lo)' }}>
          {unlocked ? 'CLEARED ✓' : `${fmt(Math.max(0, amount - current))} TO GO`}
        </span>
      </div>
    </Card>
  );
}
