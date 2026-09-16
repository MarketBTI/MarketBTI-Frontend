'use client';

import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { Check, CircleAlert, X } from 'lucide-react';
import * as styles from './Toast.css';

interface ToastProps {
  message: string;
  variant: 'success' | 'error';
  onClose: () => void;
}

const Toast = ({ message, variant, onClose }: ToastProps) => {
  useEffect(() => {
    const timer = window.setTimeout(onClose, 3000);
    return () => window.clearTimeout(timer);
  }, [onClose]);

  if (typeof document === 'undefined') return null;

  const Icon = variant === 'success' ? Check : CircleAlert;

  return createPortal(
    <div className={styles.toast({ variant })}>
      <Icon size={24} className={styles.icon} aria-hidden='true' />
      <span className={styles.message} role={variant === 'error' ? 'alert' : 'status'}>
        {message}
      </span>
      <button
        type='button'
        className={styles.closeButton}
        aria-label='토스트 닫기'
        onClick={onClose}
      >
        <X size={24} aria-hidden='true' />
      </button>
    </div>,
    document.body,
  );
};

export default Toast;
