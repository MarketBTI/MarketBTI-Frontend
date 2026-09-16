'use client';

import { useRef, useState } from 'react';
import clsx from 'clsx';
import { Search, X } from 'lucide-react';
import * as styles from './Input.css';

interface InputProps {
  value?: string;
  onChange?: (value: string) => void;
  placeholder: string;
  className?: string;
  type?: 'text' | 'password' | 'email' | 'number';
}

const Input = ({ value, onChange, className, type = 'text', ...props }: InputProps) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [internalValue, setInternalValue] = useState('');
  const currentValue = value ?? internalValue;

  const updateValue = (nextValue: string) => {
    if (value === undefined) setInternalValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <div className={clsx(styles.wrapper, className)}>
      <Search size={20} aria-hidden='true' className={styles.icon} />
      <input
        {...props}
        ref={inputRef}
        type={type}
        className={styles.input}
        value={currentValue}
        onChange={(e) => updateValue(e.target.value)}
      />
      <button
        type='button'
        className={styles.clearButton}
        aria-label='입력 내용 지우기'
        onClick={() => {
          updateValue('');
          inputRef.current?.focus();
        }}
      >
        <X size={16} aria-hidden='true' />
      </button>
    </div>
  );
};

export default Input;
