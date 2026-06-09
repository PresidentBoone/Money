import React from 'react';

/**
 * ProgressBar — money progress fill with a glowing leading edge and animated travel.
 * `value` / `max` define fill; pass `label` to show a % or amount on the right.
 */
export function ProgressBar({
  value = 0,
  max = 100,
  height = 14,
  tone = 'green',     // 'green' | 'gold'
  showLabel = false,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, (value / max) * 100));
  const fill = tone === 'gold' ? 'var(--gold-500)' : 'var(--green-500)';
  const fillBright = tone === 'gold' ? 'var(--gold-400)' : 'var(--green-400)';
  const glow = tone === 'gold'
    ? '0 0 14px color-mix(in oklab, var(--gold-500) 65%, transparent)'
    : '0 0 14px color-mix(in oklab, var(--green-500) 70%, transparent)';

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', ...style }} {...rest}>
      <div
        style={{
          position: 'relative',
          flex: 1,
          height,
          borderRadius: 'var(--radius-pill)',
          background: 'var(--surface-sunken)',
          border: '1px solid var(--border-hairline)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            inset: 0,
            width: `${pct}%`,
            borderRadius: 'var(--radius-pill)',
            background: `linear-gradient(90deg, ${fill}, ${fillBright})`,
            boxShadow: glow,
            transition: 'width var(--dur-travel) var(--ease-out)',
          }}
        />
        {/* moving sheen */}
        <div
          style={{
            position: 'absolute',
            top: 0, bottom: 0,
            left: `calc(${pct}% - 12px)`,
            width: '12px',
            background: 'rgba(255,255,255,0.5)',
            filter: 'blur(5px)',
            opacity: pct > 0 && pct < 100 ? 0.8 : 0,
            transition: 'left var(--dur-travel) var(--ease-out)',
          }}
        />
      </div>
      {(showLabel || label) && (
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 'var(--fs-xs)',
          fontWeight: 'var(--fw-medium)',
          color: tone === 'gold' ? 'var(--gold-300)' : 'var(--green-300)',
          minWidth: '42px',
          textAlign: 'right',
          fontVariantNumeric: 'tabular-nums',
        }}>
          {label != null ? label : `${Math.round(pct)}%`}
        </span>
      )}
    </div>
  );
}
