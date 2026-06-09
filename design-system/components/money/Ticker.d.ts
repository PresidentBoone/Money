import * as React from 'react';

export interface TickerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Formatted amount, e.g. "+$49.00" */
  amount: React.ReactNode;
  /** Payment source, e.g. "acme.co" */
  source?: string;
  /** Relative time, e.g. "2 min ago" */
  ago?: string;
  /** Show the pulsing LIVE dot + label */
  live?: boolean;
  style?: React.CSSProperties;
}

/**
 * "Last payment received" live readout — mono, green amount, pulsing LIVE dot.
 */
export function Ticker(props: TickerProps): JSX.Element;
