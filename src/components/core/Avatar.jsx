import React from 'react';

/**
 * Avatar — circular co-founder face with the signature money-glow ring.
 * This is what rides the road. Accepts a still or animated (GIF) src.
 */
export function Avatar({
  src,
  alt = 'co-founder',
  size = 72,
  glow = true,
  ring = 'green',   // 'green' | 'gold' | 'none'
  style = {},
  ...rest
}) {
  const rings = {
    green: 'var(--glow-avatar)',
    gold: '0 0 0 3px var(--ink-900), 0 0 0 5px var(--gold-500), 0 0 30px color-mix(in oklab, var(--gold-500) 60%, transparent)',
    none: '0 0 0 3px var(--ink-900), 0 0 0 4px var(--border-strong)',
  };
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        overflow: 'hidden',
        flex: 'none',
        boxShadow: glow ? (rings[ring] || rings.green) : rings.none,
        background: 'var(--surface-chip)',
        ...style,
      }}
      {...rest}
    >
      {src ? (
        <img src={src} alt={alt} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
      ) : (
        <div style={{
          width: '100%', height: '100%', display: 'grid', placeItems: 'center',
          fontFamily: 'var(--font-display)', fontSize: size * 0.42, color: 'var(--text-lo)',
        }}>?</div>
      )}
    </div>
  );
}
