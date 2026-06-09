Fullscreen money-confetti explosion + hype banner — fires when a milestone unlocks.

```jsx
const [burst, setBurst] = React.useState(0);
// on unlock:
setBurst((n) => n + 1);

<ConfettiBurst fire={burst} message="WE'RE EATING" />
```

Mount once near the app root. Bump `fire` (counter or milestone name) to trigger. `message` is the hype line ("WE'RE EATING", "WE ARE SO BACK", "LFG"). Pointer-events are off so it never blocks the UI.
