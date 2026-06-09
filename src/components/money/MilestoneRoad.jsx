import React from 'react';
import { Avatar } from '../core/Avatar.jsx';

/**
 * MilestoneRoad — the horizontal progress road. Stops are spaced evenly;
 * the avatar interpolates within each segment by actual profit.
 *
 * The road background uses overflow:hidden for the rounded clip.
 * The avatar lives outside that clip container so its glow ring is never cut off.
 */
export function MilestoneRoad({
  milestones = [],
  current = 0,
  avatarSrc,
  height = 220,
  style = {},
  ...rest
}) {
  const n = milestones.length;
  const inset = 7;
  const stopX = (i) => inset + (i * (100 - inset * 2)) / Math.max(1, n - 1);

  // xs[0] starts at inset/2 (≈3.5%) so the avatar is fully visible at $0,
  // then travels to the first milestone marker (inset%) as profit reaches threshold[1].
  const thresholds = [0, ...milestones.map((m) => m.amount)];
  const xs = [inset / 2, ...milestones.map((_, i) => stopX(i))];

  let avatarPos = xs[0];
  if (current >= thresholds[thresholds.length - 1]) {
    avatarPos = xs[xs.length - 1];
  } else {
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
    // Outer wrapper: no overflow:hidden — lets the avatar glow extend beyond the road edge
    <div style={{ position: 'relative', height, ...style }} {...rest}>

      {/* Clipped road background — all visual elements that must stay inside the rounded border */}
      <div style={{
        position: 'absolute', inset: 0,
        borderRadius: 'var(--radius-lg)',
        background: 'linear-gradient(180deg, var(--road-bed), #0a0d0a)',
        border: '1px solid var(--border-hairline)',
        boxShadow: 'inset 0 2px 30px rgba(0,0,0,0.6)',
        overflow: 'hidden',
      }}>
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

        {/* travelled fill (green) along center line */}
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
              <div style={{ textAlign: 'center', order: i % 2 === 0 ? 0 : 2, height: 52, display: 'flex', flexDirection: 'column', justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start' }}>
                <div style={{ fontSize: 26, lineHeight: 1, filter: reached ? 'none' : 'grayscale(0.85) opacity(0.5)' }}>{m.emoji}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: reached ? 'var(--green-300)' : 'var(--text-lo)', marginTop: 3, whiteSpace: 'nowrap', letterSpacing: '0.04em' }}>{m.name}</div>
              </div>
              <div style={{
                width: reached ? 20 : 16, height: reached ? 20 : 16, borderRadius: '50%',
                background: reached ? 'var(--green-400)' : 'var(--surface-chip)',
                border: `2px solid ${reached ? 'var(--green-300)' : 'var(--border-strong)'}`,
                boxShadow: reached ? 'var(--glow-green)' : 'none',
                transition: 'all var(--dur-base) var(--ease-out)', flex: 'none',
              }} />
              <div style={{ textAlign: 'center', order: i % 2 === 0 ? 2 : 0, height: 52, display: 'flex', alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end', justifyContent: 'center' }}>
                <div style={{ fontFamily: 'var(--font-numeric)', fontWeight: 'var(--fw-bold)', fontSize: 'var(--fs-sm)', fontVariantNumeric: 'tabular-nums', color: reached ? 'var(--text-hi)' : 'var(--text-mid)' }}>{fmt(m.amount)}</div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Avatar — positioned relative to outer wrapper (no overflow:hidden), glow ring never clipped */}
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
