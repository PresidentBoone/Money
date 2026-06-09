import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/**
 * MilestoneRoad — the horizontal progress road. Mile-marker stops for each
 * milestone, a dashed gold center line, a green "travelled" fill, and the
 * co-founder Avatar riding along it in real time as profit grows.
 *
 * Stops are spaced evenly (not by dollar amount, which spans $75→$500k);
 * the avatar interpolates within each segment by actual profit.
 */
export function MilestoneRoad({
  milestones = [],   // [{ emoji, name, amount }]
  current = 0,
  avatarSrc,
  height = 220,
  style = {},
  ...rest
}) {
  const n = milestones.length;
  // Evenly spaced stop x-positions (%), inset from the edges.
  const inset = 7;
  const stopX = (i) => inset + (i * (100 - inset * 2)) / Math.max(1, n - 1);

  // Build waypoints: profit 0 sits at the left edge, each milestone at its stop.
  const thresholds = [0, ...milestones.map((m) => m.amount)];
  const xs = [0, ...milestones.map((_, i) => stopX(i))];

  // Interpolate avatar x by current profit across the waypoints.
  let avatarPos = 0;
  if (current <= 0) avatarPos = 0;
  else if (current >= thresholds[thresholds.length - 1]) avatarPos = xs[xs.length - 1];
  else {
    for (let i = 1; i < thresholds.length; i++) {
      if (current < thresholds[i]) {
        const t = (current - thresholds[i - 1]) / (thresholds[i] - thresholds[i - 1]);
        avatarPos = xs[i - 1] + t * (xs[i] - xs[i - 1]);
        break;
      }
    }
  }
  const fmt = (n) => '$' + n.toLocaleString('en-US');

  return (
    <div
      style={{
        position: 'relative',
        height,
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, var(--road-bed), #0a0d0a)',
        border: '1px solid var(--border-hairline)',
        boxShadow: 'inset 0 2px 30px rgba(0,0,0,0.6)',
        overflow: 'hidden',
        ...style,
      }}
      {...rest}
    >
      {/* asphalt grain */}
      <div className="grain-layer" style={{ opacity: 0.07 }} />

      {/* road surface band */}
      <div style={{
        position: 'absolute', left: 0, right: 0, top: '50%', transform: 'translateY(-50%)',
        height: 64, background: 'linear-gradient(180deg, #15181400, #181c18 18%, #14181400 100%)',
        borderTop: '1px solid var(--ink-700)', borderBottom: '1px solid var(--ink-700)',
      }} />

      {/* dashed gold center line */}
      <div style={{
        position: 'absolute', left: `${inset}%`, right: `${inset}%`, top: '50%', height: 0,
        borderTop: '3px dashed color-mix(in oklab, var(--gold-400) 70%, transparent)',
        transform: 'translateY(-1px)', opacity: 0.55,
      }} />

      {/* travelled fill (green) along the center line */}
      <div style={{
        position: 'absolute', left: `${inset}%`, top: '50%',
        width: `calc(${Math.max(0, avatarPos - inset)}%)`, height: 5,
        transform: 'translateY(-2.5px)',
        background: 'linear-gradient(90deg, var(--green-600), var(--green-400))',
        borderRadius: 'var(--radius-pill)',
        boxShadow: '0 0 14px color-mix(in oklab, var(--green-500) 70%, transparent)',
        transition: 'width var(--dur-travel) var(--ease-out)',
      }} />

      {/* milestone stops */}
      {milestones.map((m, i) => {
        const reached = current >= m.amount;
        const x = stopX(i);
        return (
          <div key={i} style={{
            position: 'absolute', left: `${x}%`, top: 0, bottom: 0,
            transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', gap: 8, width: 120,
          }}>
            {/* emoji + name above */}
            <div style={{ textAlign: 'center', order: i % 2 === 0 ? 0 : 2, height: 52, display:'flex', flexDirection:'column', justifyContent: i%2===0?'flex-end':'flex-start' }}>
              <div style={{ fontSize: 26, lineHeight: 1, filter: reached ? 'none' : 'grayscale(0.85) opacity(0.5)' }}>{m.emoji}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: reached ? 'var(--green-300)' : 'var(--text-lo)', marginTop: 3, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>{m.name}</div>
            </div>
            {/* the marker dot on the line */}
            <div style={{
              width: reached ? 20 : 16, height: reached ? 20 : 16, borderRadius: '50%',
              background: reached ? 'var(--green-400)' : 'var(--surface-chip)',
              border: `2px solid ${reached ? 'var(--green-300)' : 'var(--border-strong)'}`,
              boxShadow: reached ? 'var(--glow-green)' : 'none',
              transition: 'all var(--dur-base) var(--ease-out)', flex: 'none',
            }} />
            {/* amount below */}
            <div style={{ textAlign: 'center', order: i % 2 === 0 ? 2 : 0, height: 52, display:'flex', alignItems: i%2===0?'flex-start':'flex-end', justifyContent:'center' }}>
              <div style={{ fontFamily: 'var(--font-numeric)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-sm)', fontVariantNumeric: 'tabular-nums', color: reached ? 'var(--text-hi)' : 'var(--text-mid)' }}>{fmt(m.amount)}</div>
            </div>
          </div>
        );
      })}

      {/* the riding avatar */}
      <div style={{
        position: 'absolute', left: `${avatarPos}%`, top: '50%',
        transform: 'translate(-50%, -50%)', zIndex: 5,
        transition: 'left var(--dur-travel) var(--ease-out)',
      }}>
        <div style={{ animation: 'wr-bob 1.8s ease-in-out infinite' }}>
          <Avatar src={avatarSrc} size={56} ring="green" />
        </div>
      </div>

      <style>{`@keyframes wr-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`}</style>
    </div>
  );
}
