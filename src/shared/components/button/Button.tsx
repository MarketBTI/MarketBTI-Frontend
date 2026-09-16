'use client';

import clsx from 'clsx';
import { buttonRecipe, iconWrapper } from './Button.css';
import React from 'react';

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
      onClick={onClick}
      disabled={disabled}
      className={clsx(buttonRecipe({ variant, size }), className)}
    >
      {icon && (
        <span aria-hidden='true' className={iconWrapper}>
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
