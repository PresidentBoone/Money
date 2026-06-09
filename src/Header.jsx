import React from 'react';
import { Ticker } from './components/money/Ticker.jsx';
import { Badge } from './components/core/Badge.jsx';

export function Header({ total, fmtMoney, lastPayment, nextMilestone, toGo }) {
  return (
    <header style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--space-6)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <img src="/setnforget-mark.png" alt="SetNForget" style={{ width: 34, height: 34, borderRadius: 9 }} />
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--text-mid)' }}>
            SetNForget Systems · internal
          </span>
        </div>
        <Badge tone="live">Live from Stripe</Badge>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) auto', gap: 'var(--space-6)', alignItems: 'end' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-display)', textTransform: 'uppercase', margin: 0, fontSize: 'var(--fs-mega)', lineHeight: 0.88, letterSpacing: '-0.02em', color: 'var(--text-hi)' }}>
            WE'RE <span style={{ color: 'var(--green-400)', textShadow: 'var(--text-glow-green)' }}>RICH</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-sans)', fontSize: 'var(--fs-md)', color: 'var(--text-mid)', marginTop: 'var(--space-3)', maxWidth: 440, textWrap: 'pretty' }}>
            Every dollar Stripe sends us, live.{' '}
            {nextMilestone
              ? <>Next stop: <strong style={{ color: 'var(--text-hi)' }}>{nextMilestone.emoji} {nextMilestone.name}</strong> — {fmtMoney(toGo)} to go.</>
              : <strong style={{ color: 'var(--green-400)' }}>Every milestone cleared. We are unwell.</strong>}
          </p>
        </div>
        <div style={{ textAlign: 'right' }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--text-mid)', marginBottom: 6 }}>
            Total profit · all time
          </div>
          <div style={{ fontFamily: 'var(--font-numeric)', fontWeight: 'var(--fw-bold)', fontVariantNumeric: 'tabular-nums', fontSize: 'var(--fs-money)', lineHeight: 1, letterSpacing: '-0.01em', color: 'var(--green-400)', textShadow: 'var(--text-glow-green)' }}>
            {fmtMoney(total)}
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <Ticker
          amount={`+${fmtMoney(lastPayment.amount)}`}
          source={lastPayment.source}
          ago={lastPayment.ago}
        />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-lo)' }}>
          stripe webhook · setnforget-prod
        </span>
      </div>
    </header>
  );
}
