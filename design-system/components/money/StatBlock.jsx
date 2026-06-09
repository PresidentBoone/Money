import React from 'react';

/**
 * StatBlock — a big money figure with an eyebrow label and optional delta.
 * Use it for total profit, MRR, runway, etc. The hero size glows.
 */
export function StatBlock({
  label,
  value,            // string already formatted, e.g. "$14,820"
  delta = null,     // e.g. "+$49 today"
  size = 'md',      // 'hero' | 'lg' | 'md'
  tone = 'green',   // 'green' | 'gold' | 'plain'
  align = 'left',
  style = {},
  ...rest
}) {
  const sizes = {
    hero: 'var(--fs-money)',
    lg: 'clamp(2.5rem, 5vw, 4rem)',
    md: 'var(--fs-2xl)',
  };
  const colors = {
    green: 'var(--green-400)',
    gold: 'var(--gold-400)',
    plain: 'var(--text-hi)',
  };
  const glow = size === 'hero'
    ? (tone === 'gold' ? 'var(--text-glow-gold)' : tone === 'green' ? 'var(--text-glow-green)' : 'none')
    : 'none';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', textAlign: align, alignItems: align === 'center' ? 'center' : 'flex-start', ...style }} {...rest}>
      {label && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', letterSpacing: '0.08em',
          textTransform: 'uppercase', color: 'var(--text-mid)',
        }}>{label}</span>
      )}
      <span style={{
        fontFamily: 'var(--font-numeric)', fontWeight: 'var(--fw-bold)',
        fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.01em',
        fontSize: sizes[size] || sizes.md, lineHeight: 1,
        color: colors[tone] || colors.green, textShadow: glow,
      }}>{value}</span>
      {delta && (
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', fontWeight: 'var(--fw-medium)',
          color: 'var(--green-300)',
        }}>{delta}</span>
      )}
    </div>
  );
}
