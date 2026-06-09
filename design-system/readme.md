# We're Rich — SetNForget Systems Design System

An internal, money-obsessed design system for **SetNForget Systems LLC**. It powers
**"We're Rich"**, the single-page internal profit tracker the three founders stare at
while Stripe pays them. Dark, premium, and a little unhinged — built to feel like
something a hype startup shipped at 2am that somehow looks incredible.

> Audience: the three of us. Tone: motivational, deranged, affectionate. We are so back.

---

## Sources & provenance

This system was generated from brand assets uploaded by the founder:

| Asset | Original | Stored as |
|---|---|---|
| Parent-company logo (wordmark) | `IMG_8451.png` | `assets/setnforget-logo.png` |
| App / "N" mark | `IMG_8452.png` | `assets/setnforget-mark.png` |
| Co-founder face (animated) | `IMG_7893.gif` | `assets/cofounder-avatar.gif` |

There is no external codebase or Figma file — the visual direction was authored from the
brief plus the SetNForget brand marks. If a production "We're Rich" repo or Figma exists,
link it here so future passes can cross-reference.

---

## Content fundamentals — how we write

The product is internal and gleefully unserious. Copy is the personality.

- **Voice:** first-person plural, always. "**We're** rich", "**we're** eating", "**we** have a door".
  It's a group chat that became a dashboard.
- **Register:** hype-man meets accountant. Real numbers, unreal confidence.
  "Statistically unreasonable. Spiritually mandatory."
- **Casing:** display headlines and hype banners are **ALL CAPS** (Anton). Labels and system
  text are `lowercase mono` or `UPPERCASE MONO eyebrows`. Body is sentence case.
- **Punctuation:** minimal. Period for deadpan landings. No exclamation-point spam — the
  caps already yell.
- **Emoji:** yes, but **only as milestone glyphs** (🍔 💻 🤠 🇮🇳 🏢 ✈️). One per goal, load-bearing,
  never decorative sprinkles in body copy. Locked milestones desaturate their emoji.
- **Hype lines** (fired on unlock): short, screamed, specific —
  `WE'RE EATING` · `MAX UNLOCKED` · `YEEHAW` · `WE'RE A COMPANY NOW` · `WE HAVE A DOOR` · `WHEELS UP`.
- **Milestone subtitles:** one dumb-but-true sentence. Self-aware, slightly cursed.
  "Six double cheeseburgers between three grown men." / "He will carry us. We love him already."
- **Footer signature:** `SetNForget Systems LLC · we are so back`.

Avoid: corporate hedging, "leverage/synergy", earnest motivational-poster energy, and
anything that sounds like it's addressing customers. There are no customers here. Only us.

---

## Visual foundations

**Mood:** near-black room, one green neon sign, gold trim. Premium, not casino.

- **Background:** `--ink-900` (#0B0F0D) — near-black with a faint green-warm tint, never pure
  black. Layered radial **washes** (`--wash-green`, `--wash-gold`) bloom from the top and
  bottom corners. A low-opacity SVG **grain** layer (`.grain-layer`, ~5–7% over `overlay`)
  sits on top of everything for texture. No photographic backgrounds.
- **Color:** money green is the primary accent — a jade/emerald scale (`--green-500` #15C672
  as the anchor), deliberately premium rather than dollar-bill kitsch. The SetNForget brand
  **orange** (#ECA42F) is repurposed as a "cash / premium" **gold** accent (dashed road line,
  premium badges, the `cash` button). Two accents, used sparingly against lots of dark.
- **Type:** **Anton** for loud condensed display (the "WE'RE RICH" title, milestone names,
  hype banners), **Space Grotesk** for UI and the big tabular money numbers, **JetBrains Mono**
  for the ticker, timestamps, mile markers, and system eyebrows. Big numbers carry a soft
  green text-glow (`--text-glow-green`).
- **Spacing:** 8px base grid (`--space-1`…`--space-10`). Generous section gaps
  (`clamp(40px,6vw,72px)`), comfortable card padding (`--space-5`).
- **Radii:** soft but not bubbly — `--radius-md` (14px) is the default card; pills
  (`--radius-pill`) for badges, ticker, progress tracks and the floating control bar.
- **Borders:** 1px hairlines in `--ink-600`; stronger dividers in `--ink-500`. Unlocked /
  highlighted surfaces swap the hairline for a green-mix border + glow.
- **Shadows & glows:** elevation is mostly black drop-shadow on dark (`--shadow-card`,
  `--shadow-lg`). The signature move is the **glow**: `--glow-green` / `--glow-gold` rings,
  `--glow-avatar` (double ring + bloom) on the riding face, and text-glows on hero numbers.
- **Motion:** snappy settles (`--ease-out`), an overshoot **pop** for celebrations
  (`--ease-bounce`). The avatar travels the road over `--dur-travel` (1.1s) and gently bobs.
  Progress fills slide with a moving sheen. Confetti bursts + a bounced hype banner on unlock.
  Respect `prefers-reduced-motion` in production.
- **Hover:** buttons lift 1px and intensify their glow; cards lift 3px and brighten their
  border. **Press:** buttons sink + scale to 0.98. Everything is springy, nothing is slow.
- **Transparency & blur:** used only for floating overlays — the simulate control bar uses
  `backdrop-filter: blur(12px)` over a translucent `--ink-800`. Surfaces themselves are solid.
- **Cards:** solid `--surface-card` (#141A16), 14px radius, hairline border, soft black
  shadow; unlocked state = green glow border + bloom. No left-accent-border cliché.
- **Imagery:** the only photographic element is the co-founder avatar (warm, grainy webcam
  selfie GIF) inside a circular green-glow ring. Everything else is type, tokens, and light.

---

## Iconography

- **No icon font, no SVG icon set.** The brand's "icons" are the **milestone emoji**
  (🍔 💻 🤠 🇮🇳 🏢 ✈️) — one per goal, treated as content, not decoration. Locked goals render
  the emoji desaturated (`grayscale + reduced opacity`); unlocking restores full color.
- **Unicode glyphs** stand in for the few UI marks we need: `✓` (cleared), `▸` / `·`
  separators in mono strings, `◆` to flag the anchor swatch in specimen cards.
- **Brand marks:** the **N mark** (`assets/setnforget-mark.png`) is the only logo used inside
  the dark app (top-left, small, rounded). The full **wordmark** (`assets/setnforget-logo.png`)
  is for light surfaces / external docs — on dark, prefer the mark over inverting the wordmark
  (inverting turns the orange square an off-brand blue).
- If a future surface genuinely needs line icons, substitute **Lucide** (CDN) at 1.75–2px
  stroke to match the clean Space-Grotesk UI weight — and flag the substitution. None are
  bundled today.

---

## Index — what's in this system

**Foundations**
- `styles.css` — root entry (imports only). Consumers link this one file.
- `tokens/colors.css` · `typography.css` · `spacing.css` · `effects.css` · `fonts.css` · `base.css`
- `guidelines/*.card.html` — specimen cards (colors, type, spacing, effects, brand)

**Components** (`window.WeReRichSetNForgetDesignSystem_60fa1b`)
- `components/core/` — **Button**, **Badge**, **Avatar**, **Card**
- `components/money/` — **ProgressBar**, **StatBlock**, **Ticker**, **MilestoneCard**,
  **MilestoneRoad**, **ConfettiBurst**

**UI kit**
- `ui_kits/were-rich/` — the full single-page **We're Rich** profit tracker
  (`index.html` + `App.jsx`, `Header.jsx`, `Footer.jsx`, `data.jsx`). Also a Starting Point.

**Assets** (`assets/`)
- `setnforget-logo.png` · `setnforget-mark.png` · `cofounder-avatar.gif`

**Meta**
- `SKILL.md` — Agent-Skill wrapper so this system is usable from Claude Code.

---

## Fonts — substitution note

All three families are **Google Fonts** (Anton, Space Grotesk, JetBrains Mono), loaded via
CDN `@import` in `tokens/fonts.css` — no binaries are bundled. These were chosen to match the
brief's "loud display + clean numbers + mono system" direction; the SetNForget wordmark's own
custom rounded-grotesque face was **not** provided. If you have the real brand font files,
drop them in and swap the `@import` for local `@font-face` rules.
