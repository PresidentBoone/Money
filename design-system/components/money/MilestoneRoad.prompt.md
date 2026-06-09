The horizontal progress road — the hero of We're Rich. Milestone stops, dashed center line, and the avatar riding it.

```jsx
<MilestoneRoad
  current={1240}
  avatarSrc="assets/cofounder-avatar.gif"
  milestones={[
    { emoji: '🍔', name: "McDonald's", amount: 75 },
    { emoji: '💻', name: 'Claude Max', amount: 500 },
    { emoji: '🤠', name: 'Montana', amount: 3000 },
    { emoji: '🇮🇳', name: 'Hire a Dev', amount: 12000 },
    { emoji: '🏢', name: 'Office', amount: 45000 },
    { emoji: '✈️', name: 'Private Jet', amount: 500000 },
  ]}
/>
```

Stops are spaced evenly (dollar amounts span $75→$500k); the avatar interpolates within each segment by real profit and animates over `--dur-travel`. Reached stops glow green; labels alternate above/below the line.
