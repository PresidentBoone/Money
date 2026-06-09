import * as React from 'react';

export interface StatBlockProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Eyebrow label above the number */
  label?: React.ReactNode;
  /** Pre-formatted value string, e.g. "$14,820" */
  value: React.ReactNode;
  /** Optional delta line, e.g. "+$49 today" */
  delta?: React.ReactNode;
  /** `hero` glows; use for the total-profit figure */
  size?: 'hero' | 'lg' | 'md';
  tone?: 'green' | 'gold' | 'plain';
  align?: 'left' | 'center';
  style?: React.CSSProperties;
}

/**
 * Big money figure with eyebrow label + optional delta. `hero` size is the total-profit headline.
 */
export function StatBlock(props: StatBlockProps): JSX.Element;
