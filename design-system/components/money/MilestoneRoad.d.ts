import * as React from 'react';

export interface RoadMilestone {
  emoji?: React.ReactNode;
  name: string;
  amount: number;
}

export interface MilestoneRoadProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Ordered milestone stops */
  milestones: RoadMilestone[];
  /** Current total profit — drives fill + avatar position */
  current?: number;
  /** Avatar image src (still or GIF) */
  avatarSrc?: string;
  /** Road height in px */
  height?: number;
  style?: React.CSSProperties;
}

/**
 * The horizontal progress road: evenly-spaced milestone stops, dashed gold center line,
 * green travelled-fill, and the co-founder avatar riding it as profit grows.
 * @startingPoint section="Money" subtitle="The milestone road with riding avatar" viewport="1200x260"
 */
export function MilestoneRoad(props: MilestoneRoadProps): JSX.Element;
