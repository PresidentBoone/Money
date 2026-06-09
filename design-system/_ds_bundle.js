/* @ds-bundle: {"format":3,"namespace":"WeReRichSetNForgetDesignSystem_60fa1b","components":[{"name":"Avatar","sourcePath":"components/core/Avatar.jsx"},{"name":"Badge","sourcePath":"components/core/Badge.jsx"},{"name":"Button","sourcePath":"components/core/Button.jsx"},{"name":"Card","sourcePath":"components/core/Card.jsx"},{"name":"ConfettiBurst","sourcePath":"components/money/ConfettiBurst.jsx"},{"name":"MilestoneCard","sourcePath":"components/money/MilestoneCard.jsx"},{"name":"MilestoneRoad","sourcePath":"components/money/MilestoneRoad.jsx"},{"name":"ProgressBar","sourcePath":"components/money/ProgressBar.jsx"},{"name":"StatBlock","sourcePath":"components/money/StatBlock.jsx"},{"name":"Ticker","sourcePath":"components/money/Ticker.jsx"}],"sourceHashes":{"components/core/Avatar.jsx":"4574e141f0be","components/core/Badge.jsx":"f0b6a312e80f","components/core/Button.jsx":"03229e3a40b4","components/core/Card.jsx":"d96026b4a4b5","components/money/ConfettiBurst.jsx":"ba1737272a9c","components/money/MilestoneCard.jsx":"7a6aed8ff334","components/money/MilestoneRoad.jsx":"572e9558d33e","components/money/ProgressBar.jsx":"d6eb07e2d7c5","components/money/StatBlock.jsx":"598dbd8e90df","components/money/Ticker.jsx":"89e1ccb48441","ui_kits/were-rich/App.jsx":"7a9407546f61","ui_kits/were-rich/Footer.jsx":"3b8433dd2dd5","ui_kits/were-rich/Header.jsx":"33be660029d8","ui_kits/were-rich/data.jsx":"0bd1a2e50040"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.WeReRichSetNForgetDesignSystem_60fa1b = window.WeReRichSetNForgetDesignSystem_60fa1b || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/core/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Avatar — circular co-founder face with the signature money-glow ring.
 * This is what rides the road. Accepts a still or animated (GIF) src.
 */
function Avatar({
  src,
  alt = 'co-founder',
  size = 72,
  glow = true,
  ring = 'green',
  // 'green' | 'gold' | 'none'
  style = {},
  ...rest
}) {
  const rings = {
    green: 'var(--glow-avatar)',
    gold: '0 0 0 3px var(--ink-900), 0 0 0 5px var(--gold-500), 0 0 30px color-mix(in oklab, var(--gold-500) 60%, transparent)',
    none: '0 0 0 3px var(--ink-900), 0 0 0 4px var(--border-strong)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: size,
      height: size,
      borderRadius: '50%',
      overflow: 'hidden',
      flex: 'none',
      boxShadow: glow ? rings[ring] || rings.green : rings.none,
      background: 'var(--surface-chip)',
      ...style
    }
  }, rest), src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: alt,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      display: 'grid',
      placeItems: 'center',
      fontFamily: 'var(--font-display)',
      fontSize: size * 0.42,
      color: 'var(--text-lo)'
    }
  }, "?"));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/core/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Badge — small status pill. Used for milestone states (locked / unlocked / live)
 * and inline tags. The `live` tone gets a pulsing dot.
 */
function Badge({
  children,
  tone = 'neutral',
  // 'unlocked' | 'locked' | 'live' | 'cash' | 'neutral'
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    unlocked: {
      bg: 'color-mix(in oklab, var(--green-500) 18%, transparent)',
      fg: 'var(--green-300)',
      bd: 'color-mix(in oklab, var(--green-500) 45%, transparent)'
    },
    locked: {
      bg: 'var(--surface-chip)',
      fg: 'var(--text-lo)',
      bd: 'var(--border-hairline)'
    },
    live: {
      bg: 'color-mix(in oklab, var(--green-500) 14%, transparent)',
      fg: 'var(--green-300)',
      bd: 'color-mix(in oklab, var(--green-500) 40%, transparent)'
    },
    cash: {
      bg: 'color-mix(in oklab, var(--gold-500) 18%, transparent)',
      fg: 'var(--gold-300)',
      bd: 'color-mix(in oklab, var(--gold-500) 45%, transparent)'
    },
    neutral: {
      bg: 'var(--surface-chip)',
      fg: 'var(--text-mid)',
      bd: 'var(--border-hairline)'
    }
  };
  const t = tones[tone] || tones.neutral;
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '6px',
      padding: '4px 10px',
      background: t.bg,
      color: t.fg,
      border: `1px solid ${t.bd}`,
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      fontWeight: 'var(--fw-medium)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), (dot || tone === 'live') && /*#__PURE__*/React.createElement("span", {
    style: {
      width: '6px',
      height: '6px',
      borderRadius: '50%',
      background: 'currentColor',
      boxShadow: '0 0 8px currentColor',
      animation: tone === 'live' ? 'wr-pulse 1.4s var(--ease-in-out) infinite' : 'none'
    }
  }), children, /*#__PURE__*/React.createElement("style", null, `@keyframes wr-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.4;transform:scale(.7)} }`));
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Badge.jsx", error: String((e && e.message) || e) }); }

// components/core/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Button — the primary action control for We're Rich.
 * Loud, confident, money-glow on the primary variant.
 */
function Button({
  children,
  variant = 'primary',
  // 'primary' | 'cash' | 'secondary' | 'ghost'
  size = 'md',
  // 'sm' | 'md' | 'lg'
  disabled = false,
  iconLeft = null,
  iconRight = null,
  style = {},
  ...rest
}) {
  const sizes = {
    sm: {
      padding: '8px 14px',
      fontSize: '13px',
      radius: 'var(--radius-sm)',
      gap: '7px'
    },
    md: {
      padding: '12px 20px',
      fontSize: '15px',
      radius: 'var(--radius-md)',
      gap: '9px'
    },
    lg: {
      padding: '16px 28px',
      fontSize: '17px',
      radius: 'var(--radius-md)',
      gap: '11px'
    }
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
    whiteSpace: 'nowrap'
  };
  const variants = {
    primary: {
      background: 'var(--green-500)',
      color: 'var(--text-on-green)',
      boxShadow: 'var(--glow-green-soft)'
    },
    cash: {
      background: 'var(--gold-500)',
      color: 'var(--text-on-gold)',
      boxShadow: 'var(--glow-gold)'
    },
    secondary: {
      background: 'var(--surface-raised)',
      color: 'var(--text-hi)',
      borderColor: 'var(--border-strong)'
    },
    ghost: {
      background: 'transparent',
      color: 'var(--text-body)'
    }
  };
  const v = variants[variant] || variants.primary;
  const onEnter = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(-1px)';
    if (variant === 'primary') e.currentTarget.style.boxShadow = 'var(--glow-green)';
    if (variant === 'cash') e.currentTarget.style.boxShadow = 'var(--glow-gold)';
    if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-chip)';
    if (variant === 'ghost') e.currentTarget.style.background = 'var(--surface-raised)';
  };
  const onLeave = e => {
    if (disabled) return;
    e.currentTarget.style.transform = 'translateY(0)';
    e.currentTarget.style.boxShadow = v.boxShadow || 'none';
    if (variant === 'secondary') e.currentTarget.style.background = 'var(--surface-raised)';
    if (variant === 'ghost') e.currentTarget.style.background = 'transparent';
  };
  const onDown = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(1px) scale(0.98)';
  };
  const onUp = e => {
    if (!disabled) e.currentTarget.style.transform = 'translateY(-1px)';
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    disabled: disabled,
    style: {
      ...base,
      ...v,
      ...style
    },
    onMouseEnter: onEnter,
    onMouseLeave: onLeave,
    onMouseDown: onDown,
    onMouseUp: onUp
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Button.jsx", error: String((e && e.message) || e) }); }

// components/core/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Card — the base dark surface container. Optional green/gold glow border
 * for "unlocked" / highlighted states.
 */
function Card({
  children,
  glow = 'none',
  // 'none' | 'green' | 'gold'
  padding = 'var(--space-5)',
  interactive = false,
  style = {},
  ...rest
}) {
  const glows = {
    none: {
      border: '1px solid var(--border-hairline)',
      boxShadow: 'var(--shadow-card)'
    },
    green: {
      border: '1px solid color-mix(in oklab, var(--green-500) 50%, transparent)',
      boxShadow: 'var(--glow-green-soft), var(--shadow-card)'
    },
    gold: {
      border: '1px solid color-mix(in oklab, var(--gold-500) 50%, transparent)',
      boxShadow: '0 0 26px color-mix(in oklab, var(--gold-500) 22%, transparent), var(--shadow-card)'
    }
  };
  const g = glows[glow] || glows.none;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      background: 'var(--surface-card)',
      borderRadius: 'var(--radius-md)',
      padding,
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), border-color var(--dur-base) var(--ease-out)',
      ...g,
      ...style
    },
    onMouseEnter: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(-3px)';
      e.currentTarget.style.borderColor = 'var(--border-strong)';
    } : undefined,
    onMouseLeave: interactive ? e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.borderColor = g.border.split(' ').slice(2).join(' ');
    } : undefined
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/core/Card.jsx", error: String((e && e.message) || e) }); }

// components/money/ConfettiBurst.jsx
try { (() => {
/**
 * ConfettiBurst — fullscreen money-confetti explosion + a brief hype banner.
 * Trigger it by changing the `fire` key (e.g. a counter or the unlocked
 * milestone name). Pass `message` for the hype text ("WE'RE EATING").
 */
function ConfettiBurst({
  fire = 0,
  message = "WE'RE EATING",
  duration = 2200,
  colors = ['#15C672', '#34E08A', '#B6F5D2', '#ECA42F', '#F6C778', '#F4F8F3']
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
    const W = canvas.clientWidth,
      H = canvas.clientHeight;
    canvas.width = W * dpr;
    canvas.height = H * dpr;
    ctx.scale(dpr, dpr);
    const N = 160;
    const parts = Array.from({
      length: N
    }, () => ({
      x: W / 2 + (Math.random() - 0.5) * 80,
      y: H * 0.42 + (Math.random() - 0.5) * 40,
      vx: (Math.random() - 0.5) * 16,
      vy: -Math.random() * 16 - 6,
      g: 0.32 + Math.random() * 0.2,
      size: 5 + Math.random() * 7,
      rot: Math.random() * Math.PI,
      vr: (Math.random() - 0.5) * 0.3,
      color: colors[Math.random() * colors.length | 0],
      shape: Math.random() > 0.5 ? 'rect' : 'circle'
    }));
    const start = performance.now();
    setShowMsg(true);
    const msgTimer = setTimeout(() => setShowMsg(false), Math.min(duration, 1600));
    const tick = now => {
      const t = now - start;
      ctx.clearRect(0, 0, W, H);
      parts.forEach(p => {
        p.vy += p.g;
        p.x += p.vx;
        p.y += p.vy;
        p.vx *= 0.99;
        p.rot += p.vr;
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.rot);
        ctx.globalAlpha = Math.max(0, 1 - t / duration);
        ctx.fillStyle = p.color;
        if (p.shape === 'rect') ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.6);else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      });
      if (t < duration) rafRef.current = requestAnimationFrame(tick);else ctx.clearRect(0, 0, W, H);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      clearTimeout(msgTimer);
    };
  }, [fire]);
  return /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'fixed',
      inset: 0,
      pointerEvents: 'none',
      zIndex: 9999
    }
  }, /*#__PURE__*/React.createElement("canvas", {
    ref: canvasRef,
    style: {
      position: 'absolute',
      inset: 0,
      width: '100%',
      height: '100%'
    }
  }), showMsg && /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: '50%',
      top: '38%',
      transform: 'translate(-50%, -50%)',
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'clamp(2.5rem, 8vw, 6rem)',
      letterSpacing: '-0.02em',
      color: 'var(--green-300)',
      textShadow: 'var(--text-glow-green)',
      animation: 'wr-hype 1.6s var(--ease-bounce) both',
      whiteSpace: 'nowrap'
    }
  }, message), /*#__PURE__*/React.createElement("style", null, `@keyframes wr-hype {
        0% { opacity: 0; transform: translate(-50%, -50%) scale(0.4) rotate(-4deg); }
        55% { opacity: 1; transform: translate(-50%, -50%) scale(1.08) rotate(1deg); }
        80% { transform: translate(-50%, -50%) scale(0.98); }
        100% { opacity: 1; transform: translate(-50%, -50%) scale(1); }
      }`));
}
Object.assign(__ds_scope, { ConfettiBurst });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/ConfettiBurst.jsx", error: String((e && e.message) || e) }); }

// components/money/MilestoneRoad.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MilestoneRoad — the horizontal progress road. Mile-marker stops for each
 * milestone, a dashed gold center line, a green "travelled" fill, and the
 * co-founder Avatar riding along it in real time as profit grows.
 *
 * Stops are spaced evenly (not by dollar amount, which spans $75→$500k);
 * the avatar interpolates within each segment by actual profit.
 */
function MilestoneRoad({
  milestones = [],
  // [{ emoji, name, amount }]
  current = 0,
  avatarSrc,
  height = 220,
  style = {},
  ...rest
}) {
  const n = milestones.length;
  // Evenly spaced stop x-positions (%), inset from the edges.
  const inset = 7;
  const stopX = i => inset + i * (100 - inset * 2) / Math.max(1, n - 1);

  // Build waypoints: profit 0 sits at the left edge, each milestone at its stop.
  const thresholds = [0, ...milestones.map(m => m.amount)];
  const xs = [0, ...milestones.map((_, i) => stopX(i))];

  // Interpolate avatar x by current profit across the waypoints.
  let avatarPos = 0;
  if (current <= 0) avatarPos = 0;else if (current >= thresholds[thresholds.length - 1]) avatarPos = xs[xs.length - 1];else {
    for (let i = 1; i < thresholds.length; i++) {
      if (current < thresholds[i]) {
        const t = (current - thresholds[i - 1]) / (thresholds[i] - thresholds[i - 1]);
        avatarPos = xs[i - 1] + t * (xs[i] - xs[i - 1]);
        break;
      }
    }
  }
  const fmt = n => '$' + n.toLocaleString('en-US');
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      height,
      borderRadius: 'var(--radius-lg)',
      background: 'linear-gradient(180deg, var(--road-bed), #0a0d0a)',
      border: '1px solid var(--border-hairline)',
      boxShadow: 'inset 0 2px 30px rgba(0,0,0,0.6)',
      overflow: 'hidden',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    className: "grain-layer",
    style: {
      opacity: 0.07
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: 0,
      right: 0,
      top: '50%',
      transform: 'translateY(-50%)',
      height: 64,
      background: 'linear-gradient(180deg, #15181400, #181c18 18%, #14181400 100%)',
      borderTop: '1px solid var(--ink-700)',
      borderBottom: '1px solid var(--ink-700)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${inset}%`,
      right: `${inset}%`,
      top: '50%',
      height: 0,
      borderTop: '3px dashed color-mix(in oklab, var(--gold-400) 70%, transparent)',
      transform: 'translateY(-1px)',
      opacity: 0.55
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${inset}%`,
      top: '50%',
      width: `calc(${Math.max(0, avatarPos - inset)}%)`,
      height: 5,
      transform: 'translateY(-2.5px)',
      background: 'linear-gradient(90deg, var(--green-600), var(--green-400))',
      borderRadius: 'var(--radius-pill)',
      boxShadow: '0 0 14px color-mix(in oklab, var(--green-500) 70%, transparent)',
      transition: 'width var(--dur-travel) var(--ease-out)'
    }
  }), milestones.map((m, i) => {
    const reached = current >= m.amount;
    const x = stopX(i);
    return /*#__PURE__*/React.createElement("div", {
      key: i,
      style: {
        position: 'absolute',
        left: `${x}%`,
        top: 0,
        bottom: 0,
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 8,
        width: 120
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        order: i % 2 === 0 ? 0 : 2,
        height: 52,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: i % 2 === 0 ? 'flex-end' : 'flex-start'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontSize: 26,
        lineHeight: 1,
        filter: reached ? 'none' : 'grayscale(0.85) opacity(0.5)'
      }
    }, m.emoji), /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 'var(--fs-2xs)',
        color: reached ? 'var(--green-300)' : 'var(--text-lo)',
        marginTop: 3,
        whiteSpace: 'nowrap',
        letterSpacing: '0.04em'
      }
    }, m.name)), /*#__PURE__*/React.createElement("div", {
      style: {
        width: reached ? 20 : 16,
        height: reached ? 20 : 16,
        borderRadius: '50%',
        background: reached ? 'var(--green-400)' : 'var(--surface-chip)',
        border: `2px solid ${reached ? 'var(--green-300)' : 'var(--border-strong)'}`,
        boxShadow: reached ? 'var(--glow-green)' : 'none',
        transition: 'all var(--dur-base) var(--ease-out)',
        flex: 'none'
      }
    }), /*#__PURE__*/React.createElement("div", {
      style: {
        textAlign: 'center',
        order: i % 2 === 0 ? 2 : 0,
        height: 52,
        display: 'flex',
        alignItems: i % 2 === 0 ? 'flex-start' : 'flex-end',
        justifyContent: 'center'
      }
    }, /*#__PURE__*/React.createElement("div", {
      style: {
        fontFamily: 'var(--font-numeric)',
        fontWeight: 'var(--fw-bold)',
        fontSize: 'var(--fs-sm)',
        fontVariantNumeric: 'tabular-nums',
        color: reached ? 'var(--text-hi)' : 'var(--text-mid)'
      }
    }, fmt(m.amount))));
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      left: `${avatarPos}%`,
      top: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 5,
      transition: 'left var(--dur-travel) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      animation: 'wr-bob 1.8s ease-in-out infinite'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.Avatar, {
    src: avatarSrc,
    size: 56,
    ring: "green"
  }))), /*#__PURE__*/React.createElement("style", null, `@keyframes wr-bob { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-5px)} }`));
}
Object.assign(__ds_scope, { MilestoneRoad });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/MilestoneRoad.jsx", error: String((e && e.message) || e) }); }

// components/money/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * ProgressBar — money progress fill with a glowing leading edge and animated travel.
 * `value` / `max` define fill; pass `label` to show a % or amount on the right.
 */
function ProgressBar({
  value = 0,
  max = 100,
  height = 14,
  tone = 'green',
  // 'green' | 'gold'
  showLabel = false,
  label = null,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value / max * 100));
  const fill = tone === 'gold' ? 'var(--gold-500)' : 'var(--green-500)';
  const fillBright = tone === 'gold' ? 'var(--gold-400)' : 'var(--green-400)';
  const glow = tone === 'gold' ? '0 0 14px color-mix(in oklab, var(--gold-500) 65%, transparent)' : '0 0 14px color-mix(in oklab, var(--green-500) 70%, transparent)';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: '12px',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      flex: 1,
      height,
      borderRadius: 'var(--radius-pill)',
      background: 'var(--surface-sunken)',
      border: '1px solid var(--border-hairline)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      width: `${pct}%`,
      borderRadius: 'var(--radius-pill)',
      background: `linear-gradient(90deg, ${fill}, ${fillBright})`,
      boxShadow: glow,
      transition: 'width var(--dur-travel) var(--ease-out)'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: `calc(${pct}% - 12px)`,
      width: '12px',
      background: 'rgba(255,255,255,0.5)',
      filter: 'blur(5px)',
      opacity: pct > 0 && pct < 100 ? 0.8 : 0,
      transition: 'left var(--dur-travel) var(--ease-out)'
    }
  })), (showLabel || label) && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-medium)',
      color: tone === 'gold' ? 'var(--gold-300)' : 'var(--green-300)',
      minWidth: '42px',
      textAlign: 'right',
      fontVariantNumeric: 'tabular-nums'
    }
  }, label != null ? label : `${Math.round(pct)}%`));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/money/MilestoneCard.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * MilestoneCard — one unlockable goal. Shows emoji, name, target amount,
 * a dumb funny subtitle, progress %, and a locked vs unlocked state.
 */
function MilestoneCard({
  emoji,
  name,
  amount,
  // numeric target, e.g. 3000
  amountLabel,
  // optional pre-formatted, e.g. "$3,000"
  subtitle,
  current = 0,
  // current total profit
  index = null,
  // optional ordinal for the corner marker
  style = {},
  ...rest
}) {
  const unlocked = current >= amount;
  const pct = Math.max(0, Math.min(100, current / amount * 100));
  const fmt = n => '$' + n.toLocaleString('en-US');
  return /*#__PURE__*/React.createElement(__ds_scope.Card, _extends({
    glow: unlocked ? 'green' : 'none',
    interactive: true,
    padding: "var(--space-5)",
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)',
      opacity: unlocked ? 1 : 0.96,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-start',
      justifyContent: 'space-between',
      gap: '12px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: '40px',
      lineHeight: 1,
      filter: unlocked ? 'none' : 'grayscale(0.85) opacity(0.55)',
      transition: 'filter var(--dur-base) var(--ease-out)'
    }
  }, emoji), unlocked ? /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "unlocked",
    dot: true
  }, "Unlocked") : /*#__PURE__*/React.createElement(__ds_scope.Badge, {
    tone: "locked"
  }, "Locked")), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: '8px'
    }
  }, index != null && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-lo)'
    }
  }, String(index).padStart(2, '0')), /*#__PURE__*/React.createElement("h3", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      fontSize: 'var(--fs-lg)',
      letterSpacing: '0.01em',
      color: unlocked ? 'var(--text-hi)' : 'var(--text-mid)',
      margin: 0
    }
  }, name)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--fs-2xl)',
      marginTop: '4px',
      color: unlocked ? 'var(--green-400)' : 'var(--text-body)',
      textShadow: unlocked ? 'var(--text-glow-green)' : 'none'
    }
  }, amountLabel || fmt(amount))), subtitle && /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-sm)',
      lineHeight: 1.45,
      color: 'var(--text-mid)',
      margin: 0,
      textWrap: 'pretty'
    }
  }, subtitle), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 'auto',
      display: 'flex',
      flexDirection: 'column',
      gap: '7px'
    }
  }, /*#__PURE__*/React.createElement(__ds_scope.ProgressBar, {
    value: current,
    max: amount,
    height: 10,
    showLabel: true
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-lo)'
    }
  }, unlocked ? 'CLEARED ✓' : `${fmt(Math.max(0, amount - current))} TO GO`)));
}
Object.assign(__ds_scope, { MilestoneCard });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/MilestoneCard.jsx", error: String((e && e.message) || e) }); }

// components/money/StatBlock.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * StatBlock — a big money figure with an eyebrow label and optional delta.
 * Use it for total profit, MRR, runway, etc. The hero size glows.
 */
function StatBlock({
  label,
  value,
  // string already formatted, e.g. "$14,820"
  delta = null,
  // e.g. "+$49 today"
  size = 'md',
  // 'hero' | 'lg' | 'md'
  tone = 'green',
  // 'green' | 'gold' | 'plain'
  align = 'left',
  style = {},
  ...rest
}) {
  const sizes = {
    hero: 'var(--fs-money)',
    lg: 'clamp(2.5rem, 5vw, 4rem)',
    md: 'var(--fs-2xl)'
  };
  const colors = {
    green: 'var(--green-400)',
    gold: 'var(--gold-400)',
    plain: 'var(--text-hi)'
  };
  const glow = size === 'hero' ? tone === 'gold' ? 'var(--text-glow-gold)' : tone === 'green' ? 'var(--text-glow-green)' : 'none' : 'none';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: '6px',
      textAlign: align,
      alignItems: align === 'center' ? 'center' : 'flex-start',
      ...style
    }
  }, rest), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mid)'
    }
  }, label), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums',
      letterSpacing: '-0.01em',
      fontSize: sizes[size] || sizes.md,
      lineHeight: 1,
      color: colors[tone] || colors.green,
      textShadow: glow
    }
  }, value), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      fontWeight: 'var(--fw-medium)',
      color: 'var(--green-300)'
    }
  }, delta));
}
Object.assign(__ds_scope, { StatBlock });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/StatBlock.jsx", error: String((e && e.message) || e) }); }

// components/money/Ticker.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Ticker — the "last payment received" live readout. Mono, green amount,
 * pulsing LIVE dot. Pass the latest payment as props.
 */
function Ticker({
  amount,
  // e.g. "+$49.00"
  source = '',
  // e.g. "acme.co"
  ago = '',
  // e.g. "2 min ago"
  live = true,
  style = {},
  ...rest
}) {
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '12px',
      padding: '10px 16px',
      background: 'var(--surface-card)',
      border: '1px solid var(--border-hairline)',
      borderRadius: 'var(--radius-pill)',
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-sm)',
      ...style
    }
  }, rest), live && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: '7px'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      width: '7px',
      height: '7px',
      borderRadius: '50%',
      background: 'var(--green-400)',
      boxShadow: '0 0 10px var(--green-400)',
      animation: 'wr-ticker-pulse 1.4s var(--ease-in-out) infinite'
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-lo)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      fontSize: 'var(--fs-2xs)'
    }
  }, "Last payment")), /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-400)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums'
    }
  }, amount), source && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-mid)'
    }
  }, "\xB7 ", source), ago && /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--text-lo)'
    }
  }, "\xB7 ", ago), /*#__PURE__*/React.createElement("style", null, `@keyframes wr-ticker-pulse { 0%,100%{opacity:1;transform:scale(1)} 50%{opacity:.35;transform:scale(.65)} }`));
}
Object.assign(__ds_scope, { Ticker });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/money/Ticker.jsx", error: String((e && e.message) || e) }); }

// ui_kits/were-rich/App.jsx
try { (() => {
// We're Rich — main app. Manages profit state, unlocks, confetti, and a
// "simulate Stripe payment" control so the demo is interactive.
function WRApp() {
  const NS = window.WeReRichSetNForgetDesignSystem_60fa1b;
  const {
    MilestoneRoad,
    MilestoneCard,
    ConfettiBurst,
    Button,
    Badge
  } = NS;
  const MILES = window.WR_MILESTONES;
  const [total, setTotal] = React.useState(window.WR_STARTING_PROFIT);
  const [payments, setPayments] = React.useState(window.WR_PAYMENTS);
  const [burst, setBurst] = React.useState(0);
  const [hype, setHype] = React.useState("WE'RE EATING");
  const prevTotal = React.useRef(total);
  const fmtMoney = n => '$' + Math.round(n).toLocaleString('en-US');

  // Detect a milestone crossing → fire confetti + hype line.
  React.useEffect(() => {
    const before = prevTotal.current;
    const crossed = MILES.find(m => before < m.amount && total >= m.amount);
    if (crossed) {
      setHype(crossed.hype);
      setBurst(n => n + 1);
    }
    prevTotal.current = total;
  }, [total]);
  const lastPayment = payments[0] || {
    amount: 0,
    source: '—',
    ago: 'just now'
  };
  const nextMilestone = MILES.find(m => total < m.amount) || null;
  const toGo = nextMilestone ? nextMilestone.amount - total : 0;
  const unlockedCount = MILES.filter(m => total >= m.amount).length;
  const SOURCES = ['acme.co', 'globex.io', 'hooli.com', 'initech.dev', 'piedpiper.com', 'umbrella.corp', 'stark.io'];
  const cashIn = () => {
    const amt = [9, 19, 29, 49, 99, 199, 499][Math.floor(Math.random() * 7)];
    const src = SOURCES[Math.floor(Math.random() * SOURCES.length)];
    setTotal(t => t + amt);
    setPayments(p => [{
      amount: amt,
      source: src,
      ago: 'just now'
    }, ...p].slice(0, 6));
  };
  const bigCashIn = () => {
    const amt = 2500;
    setTotal(t => t + amt);
    setPayments(p => [{
      amount: amt,
      source: 'enterprise.deal',
      ago: 'just now'
    }, ...p].slice(0, 6));
  };
  const updatedAt = new Date().toISOString().replace('T', ' ').slice(0, 19) + ' UTC';
  return /*#__PURE__*/React.createElement("div", {
    className: "wr-shell"
  }, /*#__PURE__*/React.createElement("div", {
    className: "wr-bg",
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("div", {
    className: "grain-layer",
    style: {
      opacity: 0.06,
      position: 'fixed'
    },
    "aria-hidden": "true"
  }), /*#__PURE__*/React.createElement("main", {
    className: "wr-container"
  }, /*#__PURE__*/React.createElement(WRHeader, {
    total: total,
    fmtMoney: fmtMoney,
    lastPayment: lastPayment,
    nextMilestone: nextMilestone,
    toGo: toGo
  }), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-3)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 12,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wr-eyebrow"
  }, "The Road to Riches"), /*#__PURE__*/React.createElement(Badge, {
    tone: unlockedCount === MILES.length ? 'unlocked' : 'neutral',
    dot: unlockedCount === MILES.length
  }, unlockedCount, " / ", MILES.length, " unlocked")), /*#__PURE__*/React.createElement(MilestoneRoad, {
    milestones: MILES,
    current: total,
    avatarSrc: "../../assets/cofounder-avatar.gif",
    height: 230
  })), /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-4)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    className: "wr-eyebrow"
  }, "All Six Milestones"), /*#__PURE__*/React.createElement("div", {
    className: "wr-grid"
  }, MILES.map((m, i) => /*#__PURE__*/React.createElement(MilestoneCard, {
    key: m.name,
    index: i + 1,
    emoji: m.emoji,
    name: m.name,
    amount: m.amount,
    current: total,
    subtitle: m.subtitle
  })))), /*#__PURE__*/React.createElement(WRFooter, {
    updatedAt: updatedAt
  })), /*#__PURE__*/React.createElement("div", {
    className: "wr-sim"
  }, /*#__PURE__*/React.createElement("span", {
    className: "wr-sim-label"
  }, "SIMULATE"), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm",
    onClick: cashIn
  }, "+ Stripe payment"), /*#__PURE__*/React.createElement(Button, {
    variant: "cash",
    size: "sm",
    onClick: bigCashIn
  }, "+ $2,500 deal")), /*#__PURE__*/React.createElement(ConfettiBurst, {
    fire: burst,
    message: hype
  }));
}
window.WRApp = WRApp;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/were-rich/App.jsx", error: String((e && e.message) || e) }); }

// ui_kits/were-rich/Footer.jsx
try { (() => {
// We're Rich — Footer.
function WRFooter({
  updatedAt
}) {
  return /*#__PURE__*/React.createElement("footer", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap',
      paddingTop: 'var(--space-6)',
      marginTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-lo)'
    }
  }, "SetNForget Systems LLC \xB7 ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-300)'
    }
  }, "we are so back")), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      color: 'var(--text-faint)',
      letterSpacing: '0.06em'
    }
  }, "UPDATED ", updatedAt));
}
window.WRFooter = WRFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/were-rich/Footer.jsx", error: String((e && e.message) || e) }); }

// ui_kits/were-rich/Header.jsx
try { (() => {
// We're Rich — Header: brand row, WE'RE RICH title, hero total, live ticker.
function WRHeader({
  total,
  fmtMoney,
  lastPayment,
  nextMilestone,
  toGo
}) {
  const {
    Ticker,
    Badge
  } = window.WeReRichSetNForgetDesignSystem_60fa1b;
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'relative',
      zIndex: 2,
      display: 'flex',
      flexDirection: 'column',
      gap: 'var(--space-6)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      gap: 16,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/setnforget-mark.png",
    alt: "SetNForget",
    style: {
      width: 34,
      height: 34,
      borderRadius: 9
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--text-mid)'
    }
  }, "SetNForget Systems \xB7 internal")), /*#__PURE__*/React.createElement(Badge, {
    tone: "live"
  }, "Live from Stripe")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'minmax(0,1fr) auto',
      gap: 'var(--space-6)',
      alignItems: 'end'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      textTransform: 'uppercase',
      margin: 0,
      fontSize: 'var(--fs-mega)',
      lineHeight: 0.88,
      letterSpacing: '-0.02em',
      color: 'var(--text-hi)'
    }
  }, "WE'RE ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--green-400)',
      textShadow: 'var(--text-glow-green)'
    }
  }, "RICH")), /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 'var(--fs-md)',
      color: 'var(--text-mid)',
      marginTop: 'var(--space-3)',
      maxWidth: 440,
      textWrap: 'pretty'
    }
  }, "Every dollar Stripe sends us, live. ", nextMilestone ? /*#__PURE__*/React.createElement(React.Fragment, null, "Next stop: ", /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--text-hi)'
    }
  }, nextMilestone.emoji, " ", nextMilestone.name), " \u2014 ", fmtMoney(toGo), " to go.") : /*#__PURE__*/React.createElement("strong", {
    style: {
      color: 'var(--green-400)'
    }
  }, "Every milestone cleared. We are unwell."))), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'right'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-2xs)',
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-mid)',
      marginBottom: 6
    }
  }, "Total profit \xB7 all time"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-numeric)',
      fontWeight: 'var(--fw-bold)',
      fontVariantNumeric: 'tabular-nums',
      fontSize: 'var(--fs-money)',
      lineHeight: 1,
      letterSpacing: '-0.01em',
      color: 'var(--green-400)',
      textShadow: 'var(--text-glow-green)'
    }
  }, fmtMoney(total)))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 14,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Ticker, {
    amount: `+${fmtMoney(lastPayment.amount)}`,
    source: lastPayment.source,
    ago: lastPayment.ago
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 'var(--fs-xs)',
      color: 'var(--text-lo)'
    }
  }, "stripe webhook \xB7 setnforget-prod")));
}
window.WRHeader = WRHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/were-rich/Header.jsx", error: String((e && e.message) || e) }); }

// ui_kits/were-rich/data.jsx
try { (() => {
// We're Rich — milestone data + hype copy. Internal. Unhinged by design.
const WR_MILESTONES = [{
  emoji: '🍔',
  name: "McDonald's Cheeseburgers",
  amount: 75,
  subtitle: "Six double cheeseburgers between three grown men. The first taste of victory is $1 each plus tax.",
  hype: "WE'RE EATING"
}, {
  emoji: '💻',
  name: 'Claude Max Plan',
  amount: 500,
  subtitle: "We will no longer be rate-limited at 2am. The vibes will be uncapped. The agents will run free.",
  hype: "MAX UNLOCKED"
}, {
  emoji: '🤠',
  name: 'Montana Trip',
  amount: 3000,
  subtitle: "Big sky, bigger margins. Yellowstone is calling and it wants our ARR. Yeehaw responsibly.",
  hype: "YEEHAW"
}, {
  emoji: '🇮🇳',
  name: 'Hire a Dev from India',
  amount: 12000,
  subtitle: "Someone who actually writes tests. We will finally sleep. He will carry us. We love him already.",
  hype: "WE'RE A COMPANY NOW"
}, {
  emoji: '🏢',
  name: 'Office Space',
  amount: 45000,
  subtitle: "A door that locks and a fridge that is ours. No more standups in the kitchen. We have arrived.",
  hype: "WE HAVE A DOOR"
}, {
  emoji: '✈️',
  name: 'Private Jet',
  amount: 500000,
  subtitle: "Statistically unreasonable. Spiritually mandatory. If you can read this we already left.",
  hype: "WHEELS UP"
}];

// Fake-but-believable recent Stripe payments (newest first).
const WR_PAYMENTS = [{
  amount: 49,
  source: 'acme.co',
  ago: '2 min ago'
}, {
  amount: 199,
  source: 'globex.io',
  ago: '41 min ago'
}, {
  amount: 29,
  source: 'hooli.com',
  ago: '1 hr ago'
}, {
  amount: 499,
  source: 'initech.dev',
  ago: '3 hr ago'
}, {
  amount: 29,
  source: 'piedpiper.com',
  ago: '5 hr ago'
}];
const WR_STARTING_PROFIT = 1840;
Object.assign(window, {
  WR_MILESTONES,
  WR_PAYMENTS,
  WR_STARTING_PROFIT
});
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/were-rich/data.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.ConfettiBurst = __ds_scope.ConfettiBurst;

__ds_ns.MilestoneCard = __ds_scope.MilestoneCard;

__ds_ns.MilestoneRoad = __ds_scope.MilestoneRoad;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.StatBlock = __ds_scope.StatBlock;

__ds_ns.Ticker = __ds_scope.Ticker;

})();
