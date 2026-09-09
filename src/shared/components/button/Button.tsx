'use client';

import clsx from 'clsx';
import { buttonRecipe } from './Button.css';

interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label?: string;
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
  return (
    <button
      type={type}
      aria-label={label}
      onClick={onClick}
      disabled={disabled}
      className={clsx(buttonRecipe({ variant, size }), className)}
    >
      {icon && <span>{icon}</span>}
      {label}
    </button>
  );
};

export default Button;
