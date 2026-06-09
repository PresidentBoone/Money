Money progress fill with a glowing leading edge — used everywhere a goal advances.

```jsx
<ProgressBar value={1240} max={3000} showLabel />
<ProgressBar value={75} max={75} tone="gold" label="MAXED" />
```

Props: `value` / `max` drive the fill, `tone` (`green | gold`), `height` (px), `showLabel` (auto %), or `label` to override the trailing text. The fill animates over `--dur-travel` with a moving sheen.
