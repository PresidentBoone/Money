# We're Rich — Profit Tracker: Design Spec

**Date:** 2026-06-08  
**Project:** SetNForget Systems LLC internal profit tracker  
**Deploy target:** Vercel via GitHub

---

## What we're building

A single-page React app that shows real-time Stripe revenue against 6 milestone goals. Every Stripe payment increments a persistent total stored in Vercel KV. A polling hook pulls the current total every 10 seconds and drives the UI. When a milestone threshold is crossed, a confetti burst fires and a hype banner appears. The co-founder avatar rides a road track as profit grows.

The design system (components, CSS tokens, assets) was pre-built by Claude Design and ships inside `design-system/` (extracted from the zip in the repo root). All components are already proper ES modules — zero conversion needed.

---

## Stack

| Layer | Choice | Reason |
|---|---|---|
| Bundler | **Vite** | Matches spec; lighter than CRA; Vercel supports `/api` serverless at root |
| Language | **JavaScript / JSX** | Design system components are JSX; no type conversion overhead |
| Persistence | **Vercel KV** (`@vercel/kv`) | Atomic `incrbyfloat` for concurrent webhook safety; free tier is fine |
| Payments | **Stripe** (webhook) | `payment_intent.succeeded` + `invoice.paid` events |
| Styling | **CSS custom properties** | All design tokens already authored; no Tailwind needed for this project |

---

## File structure

```
src/
  App.jsx                   ← main orchestrator (adapted from design-system ui_kit)
  App.css                   ← layout: .wr-shell .wr-container .wr-grid .wr-sim .wr-gate
  components/
    core/
      Avatar.jsx
      Badge.jsx
      Button.jsx
      Card.jsx
    money/
      ConfettiBurst.jsx
      MilestoneCard.jsx
      MilestoneRoad.jsx
      ProgressBar.jsx
      Ticker.jsx
    Header.jsx
    Footer.jsx
  data.jsx                  ← MILESTONES array + hype copy (already written)
hooks/
  useProfit.js              ← polls /api/profit every 10s; mock mode support
api/
  profit.js                 ← GET: returns { total, lastPayment }
  stripe-webhook.js         ← POST: verifies sig, increments KV
public/
  cofounder-avatar.gif      ← copied from design-system/assets
  setnforget-mark.png
  setnforget-logo.png
styles/
  styles.css                ← root import (all tokens)
  tokens/
    base.css
    colors.css
    effects.css
    fonts.css
    spacing.css
    typography.css
.env.example
.env.local                  ← gitignored; VITE_MOCK_PROFIT for local dev
vite.config.js
vercel.json
package.json
README.md
```

---

## Component adaptation notes

The design system components (`Card`, `Badge`, `Button`, `Avatar`, `ProgressBar`, `Ticker`, `MilestoneCard`, `MilestoneRoad`, `ConfettiBurst`) are copied verbatim — they already use `import React from 'react'` and named exports.

The ui_kit files (`App.jsx`, `Header.jsx`, `Footer.jsx`) need two small changes:
1. Replace `window.WeReRichSetNForgetDesignSystem_60fa1b` destructuring with named imports from component files
2. Replace `window.WR_MILESTONES` / `window.WR_PAYMENTS` / `window.WR_STARTING_PROFIT` with `import { MILESTONES } from './data.jsx'`

`data.jsx` exports the milestones array and hype copy (already written in the design system; just add `export`).

---

## Data flow

```
Stripe → POST /api/stripe-webhook
    verify signature (STRIPE_WEBHOOK_SECRET)
    extract amount from:
      payment_intent.succeeded → payment_intent.amount (cents ÷ 100)
      invoice.paid             → invoice.amount_paid (cents ÷ 100)
    extract source:
      payment_intent.metadata.customer_email || description || "stripe"
      invoice.customer_email || "stripe"
    kv.incrbyfloat('profit_total', amount)          ← atomic, concurrent-safe
    kv.set('last_payment', { amount, source, time })
    → 200 OK

GET /api/profit
    kv.get('profit_total')     → default 0 if null
    kv.get('last_payment')     → default null if none yet
    → { total: number, lastPayment: { amount, source, time } | null }

useProfit.js (browser)
    polls GET /api/profit every 10 000 ms
    returns { total, lastPayment, lastPaymentTime, loading }
    mock mode: if import.meta.env.VITE_MOCK_PROFIT is set, skip fetch and
               return { total: Number(VITE_MOCK_PROFIT), lastPayment: null, loading: false }

App.jsx
    const { total, lastPayment } = useProfit()
    tracks crossed milestones in a useRef(new Set()) — fires confetti ONCE per crossing
    passes total to MilestoneRoad, MilestoneCard, Header
```

---

## Vercel KV schema

| Key | Type | Value |
|---|---|---|
| `profit_total` | float | running sum of all payments in USD |
| `last_payment` | JSON string | `{ amount: number, source: string, time: string (ISO) }` |

`incrbyfloat` is used for `profit_total` so concurrent webhook calls can't produce a lost-update race.

---

## Environment variables

```bash
# .env.example

# Stripe
STRIPE_SECRET_KEY=sk_live_...
STRIPE_WEBHOOK_SECRET=whsec_...

# Vercel KV (auto-set by Vercel KV integration; also set locally for dev)
KV_REST_API_URL=
KV_REST_API_TOKEN=

# Local dev only — set to a number to bypass API and use mock profit value
VITE_MOCK_PROFIT=

# Optional passcode gate — if set, visitors must enter this code on first load
# Cleared guess persists in localStorage so refresh doesn't re-prompt
VITE_ACCESS_CODE=
```

---

## Passcode gate

If `VITE_ACCESS_CODE` is set at build time:
- On first load, show a fullscreen dark overlay with a single password input
- On correct match: store `wr_unlocked=1` in `localStorage`, hide gate
- On reload: check `localStorage` first, skip gate if already unlocked
- On wrong code: shake animation, clear input
- Gate renders before the main app; the app is not rendered at all until unlocked

Implementation: a `<Gate>` component in `App.jsx`, rendered conditionally. Dead simple — no auth library.

---

## Vercel config

`vercel.json`:
```json
{
  "rewrites": [
    { "source": "/api/:path*", "destination": "/api/:path*" },
    { "source": "/(.*)",       "destination": "/index.html" }
  ]
}
```

Vite builds to `dist/`. Vercel auto-detects Vite and sets `outputDirectory: dist`.

---

## Local dev flow

1. `npm install`
2. Create `.env.local` with `VITE_MOCK_PROFIT=1840` (or any number to test UI states)
3. `npm run dev` — runs on `:5173`; API routes not available but mock bypasses them
4. To test live webhooks: run `vercel dev` instead (starts serverless functions locally) + `stripe listen --forward-to localhost:3000/api/stripe-webhook`

---

## Deployment checklist (README content)

1. Push repo to GitHub
2. Import project in Vercel dashboard
3. Add **Vercel KV** integration → auto-sets `KV_REST_API_URL` + `KV_REST_API_TOKEN`
4. Add env vars: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, optionally `VITE_ACCESS_CODE`
5. Deploy
6. In Stripe dashboard → Webhooks → Add endpoint: `https://your-app.vercel.app/api/stripe-webhook`
   - Events: `payment_intent.succeeded`, `invoice.paid`
   - Copy the signing secret → paste as `STRIPE_WEBHOOK_SECRET` in Vercel → redeploy

---

## What is NOT in scope

- Multi-user auth (it's internal, 3 people)
- Historical payment ledger / chart (just current total + last payment)
- Mobile-first redesign (desktop primary, mobile responsive via existing CSS breakpoints)
- Email/Slack notifications on milestone unlock
- Manual profit adjustment UI (edit KV directly if needed)
