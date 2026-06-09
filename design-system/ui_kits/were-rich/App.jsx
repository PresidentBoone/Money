// We're Rich — main app. Manages profit state, unlocks, confetti, and a
// "simulate Stripe payment" control so the demo is interactive.
function WRApp() {
  const NS = window.WeReRichSetNForgetDesignSystem_60fa1b;
  const { MilestoneRoad, MilestoneCard, ConfettiBurst, Button, Badge } = NS;
  const MILES = window.WR_MILESTONES;

  const [total, setTotal] = React.useState(window.WR_STARTING_PROFIT);
  const [payments, setPayments] = React.useState(window.WR_PAYMENTS);
  const [burst, setBurst] = React.useState(0);
  const [hype, setHype] = React.useState("WE'RE EATING");
  const prevTotal = React.useRef(total);

  const fmtMoney = (n) => '$' + Math.round(n).toLocaleString('en-US');

  // Detect a milestone crossing → fire confetti + hype line.
  React.useEffect(() => {
    const before = prevTotal.current;
    const crossed = MILES.find((m) => before < m.amount && total >= m.amount);
    if (crossed) {
      setHype(crossed.hype);
      setBurst((n) => n + 1);
    }
    prevTotal.current = total;
  }, [total]);

  const lastPayment = payments[0] || { amount: 0, source: '—', ago: 'just now' };
  const nextMilestone = MILES.find((m) => total < m.amount) || null;
  const toGo = nextMilestone ? nextMilestone.amount - total : 0;
  const unlockedCount = MILES.filter((m) => total >= m.amount).length;

  const SOURCES = ['acme.co', 'globex.io', 'hooli.com', 'initech.dev', 'piedpiper.com', 'umbrella.corp', 'stark.io'];
  const cashIn = () => {
    const amt = [9, 19, 29, 49, 99, 199, 499][Math.floor(Math.random() * 7)];
    const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
    setTotal((t) => t + amt);
    setPayments((p) => [{ amount: amt, source: src, ago: 'just now' }, ...p].slice(0, 6));
  };
  const bigCashIn = () => {
    const amt = 2500;
    setTotal((t) => t + amt);
    setPayments((p) => [{ amount: amt, source: 'enterprise.deal', ago: 'just now' }, ...p].slice(0, 6));
  };

  const updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';

  return (
    <div className="wr-shell">
      <div className="wr-bg" aria-hidden="true" />
      <div className="grain-layer" style={{ opacity: 0.06, position: 'fixed' }} aria-hidden="true" />

      <main className="wr-container">
        <WRHeader
          total={total}
          fmtMoney={fmtMoney}
          lastPayment={lastPayment}
          nextMilestone={nextMilestone}
          toGo={toGo}
        />

        {/* THE ROAD */}
        <section style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--space-3)' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12, flexWrap: 'wrap' }}>
            <span className="wr-eyebrow">The Road to Riches</span>
            <Badge tone={unlockedCount === MILES.length ? 'unlocked' : 'neutral'} dot={unlockedCount === MILES.length}>
              {unlockedCount} / {MILES.length} unlocked
            </Badge>
          </div>
          <MilestoneRoad milestones={MILES} current={total} avatarSrc="../../assets/cofounder-avatar.gif" height={230} />
        </section>

        {/* MILESTONE CARDS */}
        <section style={{ position: 'relative', zIndex: 2, display: 'flex', flexDirection: 'column', gap: 'var(--space-4)' }}>
          <span className="wr-eyebrow">All Six Milestones</span>
          <div className="wr-grid">
            {MILES.map((m, i) => (
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

        <WRFooter updatedAt={updatedAt} />
      </main>

      {/* floating simulate controls (demo only) */}
      <div className="wr-sim">
        <span className="wr-sim-label">SIMULATE</span>
        <Button variant="primary" size="sm" onClick={cashIn}>+ Stripe payment</Button>
        <Button variant="cash" size="sm" onClick={bigCashIn}>+ $2,500 deal</Button>
      </div>

      <ConfettiBurst fire={burst} message={hype} />
    </div>
  );
}
window.WRApp = WRApp;
