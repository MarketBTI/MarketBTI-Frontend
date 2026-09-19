'use client';

import clsx from 'clsx';
import React from 'react';
import * as styles from './Button.css';

const iconSizes = {
  sm: 16,
  md: 18,
  lg: 20,
} as const;

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  disabled?: boolean;
  selected?: boolean;
  className?: string;
  icon?: React.ReactNode;
  variant?: 'primary' | 'outline' | 'selection';
  size?: 'sm' | 'md' | 'lg';
}

const Button = ({
  type = 'button',
  onClick,
  label,
  disabled = false,
  selected,
  className,
  icon,
  variant = 'primary',
  size = 'md',
}: ButtonProps) => {
  const iconSize = iconSizes[size];

  return (
    <button
      type={type}
      aria-label={label}
      aria-pressed={selected}
      onClick={onClick}
      disabled={disabled}
      className={clsx(styles.buttonRecipe({ variant, size }), className)}
    >
      {icon && (
        <span aria-hidden='true' className={styles.iconWrapper}>
          {React.isValidElement(icon)
            ? React.cloneElement(icon as React.ReactElement<{ size?: number }>, {
                size: iconSize,
              })
            : icon}
        </span>
      )}
      {label}
    </button>
  );
};

export default Button;
