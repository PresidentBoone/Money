Base dark surface container. Optional glow border signals an unlocked / highlighted state.

```jsx
<Card>Standard surface</Card>
<Card glow="green" interactive>Unlocked milestone</Card>
<Card glow="gold" padding="var(--space-6)">Premium</Card>
```

Props: `glow` (`none | green | gold`), `padding` (CSS value), `interactive` (lifts on hover). Compose stats, milestones, and panels inside it.
