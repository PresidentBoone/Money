import React from 'react';

/**
 * ConfettiBurst — fullscreen money-confetti explosion + a brief hype banner.
 * Trigger it by changing the `fire` key (e.g. a counter or the unlocked
 * milestone name). Pass `message` for the hype text ("WE'RE EATING").
 */
export function ConfettiBurst({
  fire = 0,
  message = "WE'RE EATING",
  duration = 2200,
  colors = ['#15C672', '#34E08A', '#B6F5D2', '#ECA42F', '#F6C778', '#F4F8F3'],
}) {
  const canvasRef = React.useRef(null);
  const [showMsg, setShowMsg] = React.useState(false);
  const rafRef = React.useRef(0);

  React.useEffect(() => {
    if (!fire) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    const dpr = window.devicePixelRatio || 1;
    const W = canvas.clientWidth, H = canvas.clientHeight;
    canvas.width = W * dpr; canvas.height = H * dpr;
    ctx.scale(dpr, dpr);

    const N = 160;
    const parts = Array.from({ length: N }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 80,
      y: H * 0.42 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 6,
      g: 0.32 + Math.random() * 0.2,
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[(Math.random() * colors.length) | 0],
      shape: Math.random() > 0.5 ? 'rect' : 'circle',
    }));

    const start = performance.now();
    setShowMsg(true);
    const msgTimer = setTimeout(() => setShowMsg(false), Math.min(duration, 1600));

    const tick = (now) => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      parts.forEach((p) => {
        p.vy += p.g; p.x += p.vx; p.y += p.vy; p.vx *= 0.99; p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - t / duration);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);
        else { ctx.beginPath(); ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2); ctx.fill(); }
        ctx.restore();
      });
      if (t < duration) rafRef.current = requestAnimationFrame(tick);
      else ctx.clearRect(0, 0, W, H);
    };
    rafRef.current = requestAnimationFrame(tick);

    return () => { cancelAnimationFrame(rafRef.current); clearTimeout(msgTimer); };
  }, [fire]);

  return (
    <div style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999 }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} />
      {showMsg && (
        <div style={{
          position: 'absolute', left: '50%', top: '38%', transform: 'translate(-50%, -50%)',
          fontFamily: 'var(--font-display)', textTransform: 'uppercase',
          fontSize: 'clamp(2.5rem, 8vw, 6rem)', letterSpacing: '-0.02em',
          color: 'var(--green-300)', textShadow: 'var(--text-glow-green)',
          animation: 'wr-hype 1.6s var(--ease-bounce) both', whiteSpace: 'nowrap',
        }}>{message}</div>
      )}
      <style>{`@keyframes wr-hype {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4) rotate(-4deg); }
        55% { opacity: 1; transform: translate(-50%, -50%) scale(1.08) rotate(1deg); }
        80% { transform: translate(-50%, -50%) scale(0.98); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }`}</style>
    </div>
  );
}
