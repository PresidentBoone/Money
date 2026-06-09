import * as React from 'react';

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
  /** Glow border state — use `green` for unlocked / highlighted */
  glow?: 'none' | 'green' | 'gold';
  /** CSS padding value */
  padding?: string;
  /** Lift on hover */
  interactive?: boolean;
  style?: React.CSSProperties;
}

/**
 * Base dark surface container with optional money-glow border for highlighted states.
 */
export function Card(props: CardProps): JSX.Element;
