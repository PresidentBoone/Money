import * as React from 'react';

export interface AvatarProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Image src — still or animated GIF of the co-founder */
  src?: string;
  alt?: string;
  /** Diameter in px */
  size?: number;
  /** Show the money-glow ring */
  glow?: boolean;
  /** Ring colour */
  ring?: 'green' | 'gold' | 'none';
  style?: React.CSSProperties;
}

/**
 * Circular co-founder face with the signature glow ring — the avatar that rides the road.
 */
export function Avatar(props: AvatarProps): JSX.Element;
