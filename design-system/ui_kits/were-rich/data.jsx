// We're Rich — milestone data + hype copy. Internal. Unhinged by design.
const WR_MILESTONES = [
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

// Fake-but-believable recent Stripe payments (newest first).
const WR_PAYMENTS = [
  { amount: 49, source: 'acme.co', ago: '2 min ago' },
  { amount: 199, source: 'globex.io', ago: '41 min ago' },
  { amount: 29, source: 'hooli.com', ago: '1 hr ago' },
  { amount: 499, source: 'initech.dev', ago: '3 hr ago' },
  { amount: 29, source: 'piedpiper.com', ago: '5 hr ago' },
];

const WR_STARTING_PROFIT = 1840;

Object.assign(window, { WR_MILESTONES, WR_PAYMENTS, WR_STARTING_PROFIT });
