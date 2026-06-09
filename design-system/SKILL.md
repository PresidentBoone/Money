---
name: weAreRich-design
description: Use this skill to generate well-branded interfaces and assets for SetNForget Systems and its internal "We're Rich" profit tracker, either for production or throwaway prototypes/mocks. Contains essential design guidelines, colors, type, fonts, assets, and UI kit components for prototyping a dark, money-green, premium-but-unhinged dashboard aesthetic.
user-invocable: true
---

Read the `readme.md` file within this skill, and explore the other available files.

If creating visual artifacts (slides, mocks, throwaway prototypes, etc), copy assets out and
create static HTML files for the user to view. If working on production code, you can copy
assets and read the rules here to become an expert in designing with this brand.

Key entry points:
- `readme.md` — full design guide: content fundamentals, visual foundations, iconography, index.
- `styles.css` — the single stylesheet to link; it imports every token + font file under `tokens/`.
- `tokens/` — colors, typography, spacing, effects (glows, grain, motion) as CSS custom properties.
- `components/core/` + `components/money/` — React primitives (Button, Badge, Avatar, Card,
  ProgressBar, StatBlock, Ticker, MilestoneCard, MilestoneRoad, ConfettiBurst). Each has a
  `.prompt.md` with usage.
- `ui_kits/were-rich/` — the full single-page "We're Rich" dashboard, assembled from the components.
- `assets/` — SetNForget logo, N mark, and the co-founder avatar GIF.

Brand in one breath: near-black background, money-green (`#15C672`) primary accent, SetNForget
gold (`#ECA42F`) as the cash/premium accent, Anton for loud display, Space Grotesk for clean
tabular numbers, JetBrains Mono for the live ticker. First-person-plural, hype-man-meets-accountant
copy. Emoji only as milestone glyphs. Glows over gradients. We are so back.

If the user invokes this skill without any other guidance, ask them what they want to build or
design, ask a few questions, and act as an expert designer who outputs HTML artifacts _or_
production code, depending on the need.
