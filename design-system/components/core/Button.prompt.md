Loud, confident action button — use for any primary CTA, milestone claim, or nav action in We're Rich.

```jsx
<Button variant="primary" size="lg" onClick={cashIn}>WE'RE EATING</Button>
<Button variant="cash">Go Premium</Button>
<Button variant="secondary" size="sm">View ledger</Button>
<Button variant="ghost" disabled>Locked</Button>
```

Variants: `primary` (money-green glow, default), `cash` (brand gold), `secondary` (outlined surface), `ghost` (bare). Sizes: `sm | md | lg`. Pass `iconLeft` / `iconRight` for icon+label. Primary and cash lift and intensify their glow on hover; all variants press down on click.
