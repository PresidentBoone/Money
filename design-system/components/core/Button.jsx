import React from 'react';

/**
 * Button — the primary action control for We're Rich.
 * Loud, confident, money-glow on the primary variant.
 */
export function Button({
  children,
  variant = 'primary',   // 'primary' | 'cash' | 'secondary' | 'ghost'
  size = 'md',           // 'sm' | 'md' | 'lg'
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: { padding: '8px 14px', fontSize: '13px', radius: 'var(--radius-sm)', gap: '7px' },
    md: { padding: '12px 20px', fontSize: '15px', radius: 'var(--radius-md)', gap: '9px' },
    lg: { padding: '16px 28px', fontSize: '17px', radius: 'var(--radius-md)', gap: '11px' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    padding: s.padding,
    fontSize: s.fontSize,
    fontFamily: 'var(--font-sans)',
    fontWeight: 'var(--fw-bold)',
    letterSpacing: '0.01em',
    lineHeight: 1,
    borderRadius: s.radius,
    border: '1px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transition: 'transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), background var(--dur-fast) var(--ease-out)',
    userSelect: 'none',
    whiteSpace: 'nowrap',
  };

  const variants = {
    primary: {
      background: 'var(--green-500)',
      color: 'var(--text-on-green)',
      boxShadow: 'var(--glow-green-soft)',
    },
    cash: {
      background: 'var(--gold-500)',
      color: 'var(--text-on-gold)',
      boxShadow: 'var(--glow-gold)',
    },
    secondary: {
      background: 'var(--surface-raised)',
      color: 'var(--text-hi)',
      borderColor: 'var(--border-strong)',
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)',
    },
  };

  const v = variants[variant] || variants.primary;

  const onEnter = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--glow-green)';
    if (variant === 'cash') e.currentTarget.style.boxShadow = 'var(--glow-gold)';
    if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-chip)';
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-raised)';
  };
  const onLeave = (e) => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = v.boxShadow || 'none';
    if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-raised)';
    if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
  };
  const onDown = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(1px) scale(0.98)'; };
  const onUp = (e) => { if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)'; };

  return (
    <button
      type="button"
      disabled={disabled}
      style={{ ...base, ...v, ...style }}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
      onMouseDown={onDown}
      onMouseUp={onUp}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
