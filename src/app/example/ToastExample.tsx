'use client';

import { useCallback, useRef, useState } from 'react';
import Button from '@/shared/components/button/Button';
import Toast from '@/shared/components/toast/Toast';
import styles from './page.module.css';

export default function ToastExample() {
  const nextId = useRef(0);
  const [toast, setToast] = useState<{
    id: number;
    variant: 'success' | 'error';
    message: string;
  } | null>(null);
  const closeToast = useCallback(() => setToast(null), []);

  const showToast = (variant: 'success' | 'error') => {
    setToast({
      id: ++nextId.current,
      variant,
      message: variant === 'success' ? '저장되었습니다.' : '저장하지 못했습니다. 다시 시도해 주세요.',
    });
  };

  return (
    <>
      <div className={styles.buttonRow}>
        <Button label='성공 토스트 띄우기' onClick={() => showToast('success')} />
        <Button label='오류 토스트 띄우기' variant='outline' onClick={() => showToast('error')} />
      </div>
      {toast && (
        <Toast key={toast.id} variant={toast.variant} message={toast.message} onClose={closeToast} />
      )}
    </>
  );
}
