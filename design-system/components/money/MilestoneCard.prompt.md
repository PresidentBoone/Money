One unlockable goal card — emoji, name, target, funny subtitle, progress, locked/unlocked.

```jsx
<MilestoneCard
  index={3}
  emoji="🤠"
  name="Montana Trip"
  amount={3000}
  current={1240}
  subtitle="Big sky, bigger margins. Yellowstone is calling and it wants our ARR."
/>
```

Pass `current` (total profit) and `amount` (target) — the card unlocks itself (green glow, colour emoji, "CLEARED ✓") once `current >= amount`, otherwise shows "$X TO GO". Composes `Card`, `Badge`, `ProgressBar`.
