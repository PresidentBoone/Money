# We're Rich — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Vite React SPA that tracks Stripe revenue against 6 milestones, backed by Vercel serverless functions + Vercel KV.

**Architecture:** Vite SPA in `src/` + Vercel serverless in `api/`. All UI components exist in `design-system/` (extracted from the zip) as proper ES modules — we copy them verbatim and adapt only the three ui_kit files (App, Header, Footer) to use ES imports instead of UMD globals. A `useProfit` hook polls `/api/profit` every 10 s; the Stripe webhook handler writes to Vercel KV.

**Tech Stack:** Vite 6, React 18, JavaScript/JSX, Vercel KV (`@vercel/kv`), Stripe SDK (`stripe`), Vitest for tests.

---

## File Map

| File | Action | Purpose |
|---|---|---|
| `package.json` | Create | Vite + React + Stripe + KV deps |
| `vite.config.js` | Create | Vite config with Vitest |
| `index.html` | Create | App entry point |
| `src/main.jsx` | Create | React root mount + CSS import |
| `src/styles/styles.css` | Copy | Root CSS import chain |
| `src/styles/tokens/*.css` | Copy | All design tokens |
| `src/components/core/*.jsx` | Copy | Avatar, Badge, Button, Card |
| `src/components/money/*.jsx` | Copy | ProgressBar, Ticker, MilestoneCard, MilestoneRoad, ConfettiBurst |
| `src/data.jsx` | Adapt | Milestones — add `export`, remove window globals |
| `src/Header.jsx` | Adapt | Replace UMD globals with ES imports |
| `src/Footer.jsx` | Adapt | Add named export |
| `src/hooks/useProfit.js` | Create | Polling hook + mock mode |
| `src/App.jsx` | Adapt | Wire useProfit, add Gate, ES imports |
| `src/App.css` | Create | Layout styles: .wr-shell .wr-container .wr-grid .wr-sim .wr-gate |
| `public/cofounder-avatar.gif` | Copy | Riding avatar |
| `public/setnforget-mark.png` | Copy | Brand mark |
| `public/setnforget-logo.png` | Copy | Full wordmark |
| `api/profit.js` | Create | GET endpoint — reads Vercel KV |
| `api/stripe-webhook.js` | Create | POST endpoint — verifies sig, increments KV |
| `vercel.json` | Create | Route /api/* to serverless, /* to SPA |
| `.env.example` | Create | All required env var keys |

---

## Task 1: Scaffold the Vite project

**Files:**
- Create: `package.json`
- Create: `vite.config.js`
- Create: `index.html`
- Create: `src/main.jsx`

- [ ] **Step 1: Create package.json**

```json
{
  "name": "were-rich",
  "version": "0.1.0",
  "private": true,
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview",
    "test": "vitest run"
  },
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "@vercel/kv": "^3.0.0",
    "stripe": "^17.0.0"
  },
  "devDependencies": {
    "@vitejs/plugin-react": "^4.3.4",
    "vite": "^6.0.0",
    "vitest": "^2.0.0",
    "@testing-library/react": "^16.0.0",
    "@testing-library/jest-dom": "^6.6.3",
    "jsdom": "^25.0.0"
  }
}
```

- [ ] **Step 2: Create vite.config.js**

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.js'],
  },
});
```

- [ ] **Step 3: Create src/test-setup.js**

```javascript
import '@testing-library/jest-dom';
```

- [ ] **Step 4: Create index.html**

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>We're Rich · SetNForget Systems</title>
  <link rel="icon" href="/setnforget-mark.png" />
</head>
<body>
  <div id="root"></div>
  <script type="module" src="/src/main.jsx"></script>
</body>
</html>
```

- [ ] **Step 5: Create src/main.jsx**

```jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './styles/styles.css';
import App from './App.jsx';

createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

- [ ] **Step 6: Install dependencies**

```bash
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 7: Commit**

```bash
git add package.json package-lock.json vite.config.js index.html src/main.jsx src/test-setup.js
git commit -m "scaffold: init Vite React project"
```

---

## Task 2: Copy CSS design tokens

**Files:**
- Create: `src/styles/styles.css`
- Create: `src/styles/tokens/base.css`
- Create: `src/styles/tokens/colors.css`
- Create: `src/styles/tokens/effects.css`
- Create: `src/styles/tokens/fonts.css`
- Create: `src/styles/tokens/spacing.css`
- Create: `src/styles/tokens/typography.css`

- [ ] **Step 1: Copy token files from design-system**

```bash
mkdir -p src/styles/tokens
cp design-system/tokens/base.css src/styles/tokens/
cp design-system/tokens/colors.css src/styles/tokens/
cp design-system/tokens/effects.css src/styles/tokens/
cp design-system/tokens/fonts.css src/styles/tokens/
cp design-system/tokens/spacing.css src/styles/tokens/
cp design-system/tokens/typography.css src/styles/tokens/
```

- [ ] **Step 2: Create src/styles/styles.css** (update import paths to match new location)

```css
@import url("./tokens/fonts.css");
@import url("./tokens/colors.css");
@import url("./tokens/typography.css");
@import url("./tokens/spacing.css");
@import url("./tokens/effects.css");
@import url("./tokens/base.css");
```

- [ ] **Step 3: Commit**

```bash
git add src/styles/
git commit -m "style: add design system CSS tokens"
```

---

## Task 3: Copy core components

**Files:**
- Create: `src/components/core/Avatar.jsx`
- Create: `src/components/core/Badge.jsx`
- Create: `src/components/core/Button.jsx`
- Create: `src/components/core/Card.jsx`

- [ ] **Step 1: Copy core component files**

```bash
mkdir -p src/components/core
cp design-system/components/core/Avatar.jsx src/components/core/
cp design-system/components/core/Badge.jsx src/components/core/
cp design-system/components/core/Button.jsx src/components/core/
cp design-system/components/core/Card.jsx src/components/core/
```

- [ ] **Step 2: Commit**

```bash
git add src/components/core/
git commit -m "feat: add core design system components"
```

---

## Task 4: Copy money components

**Files:**
- Create: `src/components/money/ProgressBar.jsx`
- Create: `src/components/money/Ticker.jsx`
- Create: `src/components/money/MilestoneCard.jsx`
- Create: `src/components/money/MilestoneRoad.jsx`
- Create: `src/components/money/ConfettiBurst.jsx`

- [ ] **Step 1: Copy money component files**

```bash
mkdir -p src/components/money
cp design-system/components/money/ProgressBar.jsx src/components/money/
cp design-system/components/money/Ticker.jsx src/components/money/
cp design-system/components/money/MilestoneCard.jsx src/components/money/
cp design-system/components/money/MilestoneRoad.jsx src/components/money/
cp design-system/components/money/ConfettiBurst.jsx src/components/money/
```

- [ ] **Step 2: Fix internal import paths in MilestoneCard.jsx**

The copied MilestoneCard.jsx imports from `'../core/...'` and `'./...'` — these paths are correct relative to `src/components/money/`, so no change needed.

Verify with:
```bash
head -5 src/components/money/MilestoneCard.jsx
```
Expected output:
```
import React from 'react';
import { Card } from '../core/Card.jsx';
import { Badge } from '../core/Badge.jsx';
import { ProgressBar } from './ProgressBar.jsx';
```

Same check for MilestoneRoad.jsx (imports `../core/Avatar.jsx`) — path is correct.

- [ ] **Step 3: Commit**

```bash
git add src/components/money/
git commit -m "feat: add money design system components"
```

---

## Task 5: Create data.jsx

**Files:**
- Create: `src/data.jsx`

The original `design-system/ui_kits/were-rich/data.jsx` uses `window` globals. We replace those with named exports.

- [ ] **Step 1: Create src/data.jsx**

```jsx
export const MILESTONES = [
  {
    emoji: '🍔', name: "McDonald's Cheeseburgers", amount: 75,
    subtitle: "Six double cheeseburgers between three grown men. The first taste of victory is $1 each plus tax.",
    hype: "WE'RE EATING",
  },
  {
    emoji: '💻', name: 'Claude Max Plan', amount: 500,
    subtitle: "We will no longer be rate-limited at 2am. The vibes will be uncapped. The agents will run free.",
    hype: "MAX UNLOCKED",
  },
  {
    emoji: '🤠', name: 'Montana Trip', amount: 3000,
    subtitle: "Big sky, bigger margins. Yellowstone is calling and it wants our ARR. Yeehaw responsibly.",
    hype: "YEEHAW",
  },
  {
    emoji: '🇮🇳', name: 'Hire a Dev from India', amount: 12000,
    subtitle: "Someone who actually writes tests. We will finally sleep. He will carry us. We love him already.",
    hype: "WE'RE A COMPANY NOW",
  },
  {
    emoji: '🏢', name: 'Office Space', amount: 45000,
    subtitle: "A door that locks and a fridge that is ours. No more standups in the kitchen. We have arrived.",
    hype: "WE HAVE A DOOR",
  },
  {
    emoji: '✈️', name: 'Private Jet', amount: 500000,
    subtitle: "Statistically unreasonable. Spiritually mandatory. If you can read this we already left.",
    hype: "WHEELS UP",
  },
];
```

- [ ] **Step 2: Commit**

```bash
git add src/data.jsx
git commit -m "feat: add milestone data with exports"
```

---

## Task 6: Adapt Header and Footer

**Files:**
- Create: `src/Header.jsx`
- Create: `src/Footer.jsx`

- [ ] **Step 1: Create src/Header.jsx**

(Adapted from `design-system/ui_kits/were-rich/Header.jsx` — replace `window.*` with imports, change image paths to `/public` roots, add named export.)

```jsx
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
        <Ticker amount={`+${fmtMoney(lastPayment.amount)}`} source={lastPayment.source} ago={lastPayment.ago} />
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-lo)' }}>
          stripe webhook · setnforget-prod
        </span>
      </div>
    </header>
  );
}
```

- [ ] **Step 2: Create src/Footer.jsx**

```jsx
import React from 'react';

export function Footer({ updatedAt }) {
  return (
    <footer style={{
      position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      gap: 16, flexWrap: 'wrap', paddingTop: 'var(--space-6)', marginTop: 'var(--space-4)',
      borderTop: '1px solid var(--border-hairline)',
    }}>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-xs)', color: 'var(--text-lo)' }}>
        SetNForget Systems LLC · <span style={{ color: 'var(--green-300)' }}>we are so back</span>
      </span>
      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 'var(--fs-2xs)', color: 'var(--text-faint)', letterSpacing: '0.06em' }}>
        UPDATED {updatedAt}
      </span>
    </footer>
  );
}
```

- [ ] **Step 3: Commit**

```bash
git add src/Header.jsx src/Footer.jsx
git commit -m "feat: adapt Header and Footer to ES module imports"
```

---

## Task 7: Build useProfit hook

**Files:**
- Create: `src/hooks/useProfit.js`
- Create: `src/hooks/useProfit.test.js`

- [ ] **Step 1: Write the failing test**

```javascript
// src/hooks/useProfit.test.js
import { renderHook } from '@testing-library/react';
import { vi, expect, it, describe, beforeEach, afterEach } from 'vitest';
import { useProfit } from './useProfit.js';

describe('useProfit — mock mode', () => {
  it('returns mock total immediately without fetching', () => {
    // VITE_MOCK_PROFIT is set to '1840' by the test environment (see vite.config.js test.env)
    const { result } = renderHook(() => useProfit());
    expect(result.current.total).toBe(1840);
    expect(result.current.loading).toBe(false);
  });
});

describe('useProfit — live mode', () => {
  let fetchMock;

  beforeEach(() => {
    fetchMock = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => ({ total: 500, lastPayment: { amount: 49, source: 'acme.co', time: '2026-06-08T00:00:00Z' } }),
    });
    vi.stubGlobal('fetch', fetchMock);
  });

  afterEach(() => {
    vi.unstubAllGlobals();
    vi.clearAllTimers();
  });

  it('fetches /api/profit and returns total', async () => {
    const { result } = renderHook(() => useProfit());
    await vi.waitFor(() => expect(result.current.total).toBe(500));
    expect(result.current.lastPayment).toEqual({ amount: 49, source: 'acme.co', time: '2026-06-08T00:00:00Z' });
    expect(fetchMock).toHaveBeenCalledWith('/api/profit');
  });
});
```

- [ ] **Step 2: Add mock env to vite.config.js test section**

Edit `vite.config.js` — add `env` inside `test`:

```javascript
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./src/test-setup.js'],
    env: {
      VITE_MOCK_PROFIT: '1840',
    },
  },
});
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `useProfit` not found.

- [ ] **Step 4: Create src/hooks/useProfit.js**

```javascript
import { useState, useEffect } from 'react';

const POLL_MS = 10_000;
const MOCK_VALUE = import.meta.env.VITE_MOCK_PROFIT;

export function useProfit() {
  const mockTotal = MOCK_VALUE ? Number(MOCK_VALUE) : null;
  const [total, setTotal] = useState(mockTotal ?? 0);
  const [lastPayment, setLastPayment] = useState(null);
  const [loading, setLoading] = useState(mockTotal === null);

  useEffect(() => {
    if (mockTotal !== null) return; // mock mode: no polling

    let cancelled = false;

    async function poll() {
      try {
        const res = await fetch('/api/profit');
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        if (!cancelled) {
          setTotal(data.total ?? 0);
          setLastPayment(data.lastPayment ?? null);
          setLoading(false);
        }
      } catch {
        if (!cancelled) setLoading(false);
      }
    }

    poll();
    const id = setInterval(poll, POLL_MS);
    return () => { cancelled = true; clearInterval(id); };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return { total, lastPayment, loading };
}
```

- [ ] **Step 5: Run tests to verify they pass**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 6: Commit**

```bash
git add src/hooks/
git commit -m "feat: add useProfit polling hook with mock mode"
```

---

## Task 8: Build App.jsx and App.css

**Files:**
- Create: `src/App.jsx`
- Create: `src/App.css`

- [ ] **Step 1: Create src/App.css**

(Layout pulled from `design-system/ui_kits/were-rich/index.html` `<style>` block, plus Gate styles.)

```css
html, body { background: var(--surface-void); }

.wr-shell {
  position: relative;
  min-height: 100vh;
  overflow: hidden;
}

.wr-bg {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    var(--wash-green),
    var(--wash-gold),
    radial-gradient(1000px 700px at 15% 110%, color-mix(in oklab, var(--green-700) 22%, transparent), transparent 60%),
    var(--surface-page);
}

.wr-container {
  position: relative;
  z-index: 2;
  max-width: var(--container-max);
  margin: 0 auto;
  padding: clamp(28px, 5vw, 64px) var(--container-pad) 80px;
  display: flex;
  flex-direction: column;
  gap: clamp(40px, 6vw, 72px);
}

.wr-eyebrow {
  font-family: var(--font-mono);
  font-size: var(--fs-2xs);
  font-weight: var(--fw-medium);
  letter-spacing: 0.14em;
  text-transform: uppercase;
  color: var(--text-mid);
}

.wr-grid {
  display: grid;
  gap: var(--space-4);
  grid-template-columns: repeat(3, 1fr);
}
@media (max-width: 920px) { .wr-grid { grid-template-columns: repeat(2, 1fr); } }
@media (max-width: 600px) { .wr-grid { grid-template-columns: 1fr; } }

/* passcode gate */
.wr-gate {
  position: fixed;
  inset: 0;
  background: var(--surface-void);
  display: grid;
  place-items: center;
  z-index: 9999;
}
.wr-gate-inner {
  display: flex;
  flex-direction: column;
  gap: var(--space-4);
  align-items: center;
  max-width: 320px;
  width: 100%;
  padding: var(--space-5);
}
.wr-gate-input {
  width: 100%;
  padding: 12px 16px;
  background: var(--surface-card);
  border: 1px solid var(--border-strong);
  border-radius: var(--radius-md);
  color: var(--text-hi);
  font-family: var(--font-mono);
  font-size: var(--fs-sm);
  outline: none;
  text-align: center;
  transition: border-color var(--dur-base) var(--ease-out);
}
.wr-gate-input:focus { border-color: var(--green-500); }
.wr-gate-shake { animation: wr-shake 0.4s var(--ease-out); }
@keyframes wr-shake {
  0%, 100% { transform: translateX(0); }
  20%, 60% { transform: translateX(-8px); }
  40%, 80% { transform: translateX(8px); }
}
```

- [ ] **Step 2: Create src/App.jsx**

```jsx
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
  const crossedRef = useRef(new Set());
  const prevTotal = useRef(null);

  const fmtMoney = n => '$' + Math.round(n).toLocaleString('en-US');

  useEffect(() => {
    if (prevTotal.current === null) {
      // First load: mark already-cleared milestones as seen — no confetti for past wins
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
            <Badge tone={unlockedCount === MILESTONES.length ? 'unlocked' : 'neutral'} dot={unlockedCount === MILESTONES.length}>
              {unlockedCount} / {MILESTONES.length} unlocked
            </Badge>
          </div>
          <MilestoneRoad milestones={MILESTONES} current={total} avatarSrc="/cofounder-avatar.gif" height={230} />
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
```

- [ ] **Step 3: Commit**

```bash
git add src/App.jsx src/App.css
git commit -m "feat: build main App with useProfit, milestone logic, and Gate"
```

---

## Task 9: Copy public assets

**Files:**
- Create: `public/cofounder-avatar.gif`
- Create: `public/setnforget-mark.png`
- Create: `public/setnforget-logo.png`

- [ ] **Step 1: Copy assets**

```bash
cp design-system/assets/cofounder-avatar.gif public/
cp design-system/assets/setnforget-mark.png public/
cp design-system/assets/setnforget-logo.png public/
```

- [ ] **Step 2: Verify files exist**

```bash
ls -lh public/
```

Expected: three files (gif ~10 MB, two PNGs).

- [ ] **Step 3: Commit**

```bash
git add public/
git commit -m "feat: add brand assets and co-founder avatar to public/"
```

---

## Task 10: Build api/profit.js

**Files:**
- Create: `api/profit.js`

This is a Vercel serverless function. It reads `profit_total` and `last_payment` from Vercel KV and returns them as JSON.

- [ ] **Step 1: Create api/profit.js**

```javascript
import { kv } from '@vercel/kv';

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const [total, lastPayment] = await Promise.all([
    kv.get('profit_total'),
    kv.get('last_payment'),
  ]);

  res.status(200).json({
    total: total ?? 0,
    lastPayment: lastPayment ?? null,
  });
}
```

- [ ] **Step 2: Commit**

```bash
git add api/profit.js
git commit -m "feat: add GET /api/profit endpoint reading from Vercel KV"
```

---

## Task 11: Build api/stripe-webhook.js

**Files:**
- Create: `api/stripe-webhook.js`

This is the most security-critical file. It must verify the Stripe webhook signature before processing any payload. Raw body access works because Vercel's plain Node.js serverless runtime does NOT auto-parse the request body (unlike Next.js).

- [ ] **Step 1: Write the failing test**

```javascript
// api/stripe-webhook.test.js
import { describe, it, expect, vi, beforeEach } from 'vitest';

// Mock @vercel/kv
vi.mock('@vercel/kv', () => ({
  kv: {
    incrbyfloat: vi.fn().mockResolvedValue(100),
    set: vi.fn().mockResolvedValue('OK'),
  },
}));

// Mock stripe
const mockConstructEvent = vi.fn();
vi.mock('stripe', () => ({
  default: vi.fn(() => ({
    webhooks: { constructEvent: mockConstructEvent },
  })),
}));

const { default: handler } = await import('./stripe-webhook.js');

function makeReq({ method = 'POST', sig = 'valid-sig', body = Buffer.from('{}'), type = 'payment_intent.succeeded', amount = 4900, email = 'test@acme.co' } = {}) {
  const readable = {
    on: (event, cb) => {
      if (event === 'data') cb(body);
      if (event === 'end') cb();
      return readable;
    },
  };
  return { method, headers: { 'stripe-signature': sig }, ...readable };
}

function makeRes() {
  const res = {
    _status: 200,
    _body: null,
    status(code) { this._status = code; return this; },
    json(body) { this._body = body; return this; },
    send(body) { this._body = body; return this; },
    end() { return this; },
  };
  return res;
}

describe('stripe-webhook', () => {
  beforeEach(() => vi.clearAllMocks());

  it('rejects non-POST methods', async () => {
    const res = makeRes();
    await handler({ method: 'GET', headers: {} }, res);
    expect(res._status).toBe(405);
  });

  it('returns 400 when signature verification fails', async () => {
    mockConstructEvent.mockImplementationOnce(() => { throw new Error('Bad sig'); });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(res._status).toBe(400);
  });

  it('increments KV and returns 200 on payment_intent.succeeded', async () => {
    const { kv } = await import('@vercel/kv');
    mockConstructEvent.mockReturnValueOnce({
      type: 'payment_intent.succeeded',
      data: { object: { amount: 4900, metadata: { customer_email: 'test@acme.co' }, description: null } },
    });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(kv.incrbyfloat).toHaveBeenCalledWith('profit_total', 49);
    expect(res._status).toBe(200);
  });

  it('increments KV and returns 200 on invoice.paid', async () => {
    const { kv } = await import('@vercel/kv');
    mockConstructEvent.mockReturnValueOnce({
      type: 'invoice.paid',
      data: { object: { amount_paid: 19900, customer_email: 'globex@io.com' } },
    });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(kv.incrbyfloat).toHaveBeenCalledWith('profit_total', 199);
    expect(res._status).toBe(200);
  });

  it('ignores unhandled event types gracefully', async () => {
    mockConstructEvent.mockReturnValueOnce({ type: 'customer.created', data: { object: {} } });
    const res = makeRes();
    await handler(makeReq(), res);
    expect(res._status).toBe(200);
  });
});
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```

Expected: FAIL — `stripe-webhook.js` not found.

- [ ] **Step 3: Create api/stripe-webhook.js**

```javascript
import Stripe from 'stripe';
import { kv } from '@vercel/kv';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

async function readRawBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => resolve(Buffer.concat(chunks)));
    req.on('error', reject);
  });
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const rawBody = await readRawBody(req);
  const sig = req.headers['stripe-signature'];

  let event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    return res.status(400).json({ error: `Webhook Error: ${err.message}` });
  }

  let amount = 0;
  let source = 'stripe';

  if (event.type === 'payment_intent.succeeded') {
    const pi = event.data.object;
    amount = pi.amount / 100;
    source = pi.metadata?.customer_email || pi.description || 'stripe';
  } else if (event.type === 'invoice.paid') {
    const inv = event.data.object;
    amount = inv.amount_paid / 100;
    source = inv.customer_email || 'stripe';
  } else {
    // Unhandled event type — acknowledge and ignore
    return res.status(200).json({ received: true });
  }

  await Promise.all([
    kv.incrbyfloat('profit_total', amount),
    kv.set('last_payment', { amount, source, time: new Date().toISOString() }),
  ]);

  return res.status(200).json({ received: true });
}
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```

Expected: all tests pass.

- [ ] **Step 5: Commit**

```bash
git add api/stripe-webhook.js api/stripe-webhook.test.js
git commit -m "feat: add Stripe webhook handler with KV persistence and tests"
```

---

## Task 12: Config files

**Files:**
- Create: `vercel.json`
- Create: `.env.example`
- Create: `.gitignore` (additions)

- [ ] **Step 1: Create vercel.json**

```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

- [ ] **Step 2: Create .env.example**

```bash
# Stripe (required)
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Vercel KV (auto-set by Vercel KV integration; set manually for local vercel dev)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Local UI dev only — set to a number to skip the API and render at that profit level
# e.g. VITE_MOCK_PROFIT=1840 puts the avatar between milestones 1 and 2
VITE_MOCK_PROFIT=

# Optional passcode gate — if set, visitors must enter this code on first load
# Leave empty to deploy without a gate
VITE_ACCESS_CODE=
```

- [ ] **Step 3: Update .gitignore** (append if file exists, create if not)

```
# deps
node_modules/

# build
dist/

# env
.env
.env.local
.env.*.local

# vercel
.vercel/
```

- [ ] **Step 4: Commit**

```bash
git add vercel.json .env.example .gitignore
git commit -m "config: add vercel.json, .env.example, and .gitignore"
```

---

## Task 13: Verify the build

- [ ] **Step 1: Run the full test suite**

```bash
npm test
```

Expected: all tests pass (useProfit + stripe-webhook tests).

- [ ] **Step 2: Run a production build**

```bash
npm run build
```

Expected: `dist/` created, no errors.

- [ ] **Step 3: Start local dev server with mock profit**

Create `.env.local`:
```
VITE_MOCK_PROFIT=1840
```

Then:
```bash
npm run dev
```

Expected: app runs at `http://localhost:5173`. Road tracker shows $1,840 (between milestones 1 and 2). Avatar positioned between the 🍔 and 💻 markers.

- [ ] **Step 4: Verify milestone crossing confetti in mock mode**

Change `.env.local` to `VITE_MOCK_PROFIT=500`, restart dev server. App should show Claude Max Plan as unlocked with green glow. No confetti fires (it was already unlocked on load — confetti only fires when the total crosses a threshold AFTER the page has initialized).

- [ ] **Step 5: Final commit**

```bash
git add -A
git commit -m "chore: verify build and add .env.local to .gitignore"
```

---

## Deployment Steps (after plan completes)

1. Push to GitHub: `git push origin main`
2. Import repo in [vercel.com/new](https://vercel.com/new)
3. Add **Vercel KV** integration (Storage tab → Create Database)
4. Set env vars in Vercel dashboard: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `VITE_ACCESS_CODE` (optional)
5. Deploy
6. In Stripe dashboard → Developers → Webhooks → Add endpoint:
   - URL: `https://your-app.vercel.app/api/stripe-webhook`
   - Events: `payment_intent.succeeded`, `invoice.paid`
   - Copy signing secret → paste as `STRIPE_WEBHOOK_SECRET` → redeploy

**API keys needed before deploying:**
- `STRIPE_SECRET_KEY` — from stripe.com/apikeys
- `STRIPE_WEBHOOK_SECRET` — generated when you create the webhook endpoint in Stripe
- Vercel KV credentials auto-set by the Vercel integration
