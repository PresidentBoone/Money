import * as React from 'react';

export interface MilestoneCardProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Goal emoji, e.g. "🍔" */
  emoji?: React.ReactNode;
  /** Goal name, e.g. "Montana Trip" */
  name: React.ReactNode;
  /** Numeric target, e.g. 3000 */
  amount: number;
  /** Optional pre-formatted target label, e.g. "$3,000" */
  amountLabel?: string;
  /** Dumb funny one-liner */
  subtitle?: React.ReactNode;
  /** Current total profit — drives locked/unlocked + progress */
  current?: number;
  /** Optional ordinal shown in the corner (1-indexed) */
  index?: number;
  style?: React.CSSProperties;
}

/**
 * One unlockable goal card: emoji, name, target, funny subtitle, progress %, locked/unlocked.
 * Auto-unlocks (green glow) once `current >= amount`.
 * @startingPoint section="Money" subtitle="Milestone goal card — locked & unlocked" viewport="700x300"
 */
export function MilestoneCard(props: MilestoneCardProps): JSX.Element;
