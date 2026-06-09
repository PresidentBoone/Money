import React, { useState, useEffect, useRef } from 'react';
import { MilestoneRoad } from './components/money/MilestoneRoad.jsx';
import { MilestoneCard } from './components/money/MilestoneCard.jsx';
import { ConfettiBurst } from './components/money/ConfettiBurst.jsx';
import { Badge } from './components/core/Badge.jsx';
import { Header } from './Header.jsx';
import { Footer } from './Footer.jsx';
import { MILESTONES } from './data.jsx';
import { useProfit } from './hooks/useProfit.js';
import './App.css';

const ACCESS_CODE = import.meta.env.VITE_ACCESS_CODE;

function Gate({ onUnlock }) {
  const [input, setInput] = useState('');
  const [shake, setShake] = useState(false);

  const tryUnlock = () => {
    if (input === ACCESS_CODE) {
      localStorage.setItem('wr_unlocked', '1');
      onUnlock();
    } else {
      setShake(true);
      setInput('');
      setTimeout(() => setShake(false), 500);
    }
  };

  return (
    <div className="wr-gate">
      <div className="wr-gate-inner">
        <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'var(--fs-d1)', textTransform: 'uppercase', color: 'var(--text-hi)', margin: 0, lineHeight: 1 }}>
          WE'RE RICH
        </h1>
        <p style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-lo)', letterSpacing: '0.08em', textTransform: 'uppercase', margin: 0 }}>
          SetNForget Systems · Internal
        </p>
        <input
          type="password"
          placeholder="access code"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && tryUnlock()}
          className={`wr-gate-input${shake ? ' wr-gate-shake' : ''}`}
          autoFocus
        />
      </div>
    </div>
  );
}

function WRApp() {
  const { total, lastPayment } = useProfit();
  const [burst, setBurst] = useState(0);
  const [hype, setHype] = useState("WE'RE RICH");

  // Track which milestones have already fired confetti so we never double-fire.
  const crossedRef = useRef(new Set());
  // null = first render, we skip confetti and just mark existing milestones as seen.
  const prevTotal = useRef(null);

  const fmtMoney = n => '$' + Math.round(n).toLocaleString('en-US');

  useEffect(() => {
    if (prevTotal.current === null) {
      MILESTONES.forEach(m => { if (total >= m.amount) crossedRef.current.add(m.name); });
      prevTotal.current = total;
      return;
    }
    const before = prevTotal.current;
    const crossed = MILESTONES.find(
      m => before < m.amount && total >= m.amount && !crossedRef.current.has(m.name)
    );
    if (crossed) {
      crossedRef.current.add(crossed.name);
      setHype(crossed.hype);
      setBurst(n => n + 1);
    }
    prevTotal.current = total;
  }, [total]);

  const nextMilestone = MILESTONES.find(m => total < m.amount) ?? null;
  const toGo = nextMilestone ? nextMilestone.amount - total : 0;
  const unlockedCount = MILESTONES.filter(m => total >= m.amount).length;
  const updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  const lastPaymentDisplay = lastPayment
    ? { amount: lastPayment.amount, source: lastPayment.source, ago: new Date(lastPayment.time).toLocaleTimeString() }
    : { amount: 0, source: '—', ago: 'waiting...' };

  return (
    <div className="wr-shell">
      <div className="wr-bg" aria-hidden="true" />
      <div className="grain-layer" style={{ opacity: 0.06, position: 'fixed' }} aria-hidden="true" />

      <main className="wr-container">
        <Header
          total={total}
          fmtMoney={fmtMoney}
          lastPayment={lastPaymentDisplay}
          nextMilestone={nextMilestone}
          toGo={toGo}
        />

        <section style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span className="wr-eyebrow">The Road to Riches</span>
            <Badge
              tone={unlockedCount === MILESTONES.length ? 'unlocked' : 'neutral'}
              dot={unlockedCount === MILESTONES.length}
            >
              {unlockedCount} / {MILESTONES.length} unlocked
            </Badge>
          </div>
          <MilestoneRoad
            milestones={MILESTONES}
            current={total}
            avatarSrc="/cofounder-avatar.gif"
            height={230}
          />
        </section>

        <section style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span className="wr-eyebrow">All Six Milestones</span>
          <div className="wr-grid">
            {MILESTONES.map((m, i) => (
              <MilestoneCard
                key={m.name}
                index={i + 1}
                emoji={m.emoji}
                name={m.name}
                amount={m.amount}
                current={total}
                subtitle={m.subtitle}
              />
            ))}
          </div>
        </section>

        <Footer updatedAt={updatedAt} />
      </main>

      <ConfettiBurst fire={burst} message={hype} />
    </div>
  );
}

export default function App() {
  const needsGate = !!ACCESS_CODE;
  const [unlocked, setUnlocked] = useState(
    !needsGate || localStorage.getItem('wr_unlocked') === '1'
  );

  if (!unlocked) return <Gate onUnlock={() => setUnlocked(true)} />;
  return <WRApp />;
}
