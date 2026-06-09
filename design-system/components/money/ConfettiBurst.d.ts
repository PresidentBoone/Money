import * as React from 'react';

export interface ConfettiBurstProps {
  /** Change this key (counter, milestone name) to trigger a burst */
  fire?: number | string;
  /** Hype banner text */
  message?: string;
  /** Total animation duration in ms */
  duration?: number;
  /** Confetti colour palette */
  colors?: string[];
}

/**
 * Fullscreen money-confetti explosion + a brief hype banner. Mount once near the
 * app root; bump `fire` whenever a milestone unlocks.
 */
export function ConfettiBurst(props: ConfettiBurstProps): JSX.Element;
