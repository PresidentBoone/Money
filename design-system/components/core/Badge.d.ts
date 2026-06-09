import * as React from 'react';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  children?: React.ReactNode;
  /** Status tone. `live` auto-adds a pulsing dot. */
  tone?: 'unlocked' | 'locked' | 'live' | 'cash' | 'neutral';
  /** Force-show the leading dot (always on for `live`) */
  dot?: boolean;
  style?: React.CSSProperties;
}

/**
 * Small uppercase status pill — milestone states, live indicators, inline tags.
 */
export function Badge(props: BadgeProps): JSX.Element;
