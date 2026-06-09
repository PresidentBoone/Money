import * as React from 'react';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  /** Button label / content */
  children?: React.ReactNode;
  /** Visual style. `primary` = money green glow, `cash` = brand gold, `secondary` = outline, `ghost` = bare */
  variant?: 'primary' | 'cash' | 'secondary' | 'ghost';
  /** Control size */
  size?: 'sm' | 'md' | 'lg';
  /** Disabled state (dims + blocks interaction) */
  disabled?: boolean;
  /** Optional leading icon node */
  iconLeft?: React.ReactNode;
  /** Optional trailing icon node */
  iconRight?: React.ReactNode;
  style?: React.CSSProperties;
}

/**
 * The primary action control. Loud and confident; primary lifts + glows green on hover.
 * @startingPoint section="Core" subtitle="Buttons — primary, cash, secondary, ghost" viewport="700x150"
 */
export function Button(props: ButtonProps): JSX.Element;
