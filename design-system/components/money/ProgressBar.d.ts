import * as React from 'react';

export interface ProgressBarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Current value */
  value?: number;
  /** Max value (value/max → fill %) */
  max?: number;
  /** Track height in px */
  height?: number;
  /** Fill colour */
  tone?: 'green' | 'gold';
  /** Show a trailing % label */
  showLabel?: boolean;
  /** Override the trailing label (e.g. "$420 to go") */
  label?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * Money progress fill with glowing leading edge + animated travel.
 */
export function ProgressBar(props: ProgressBarProps): JSX.Element;
