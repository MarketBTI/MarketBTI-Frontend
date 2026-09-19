'use client';

import { useCallback, useEffect, useState } from 'react';
import { useAtom } from 'jotai';
import { analysisCompletedToastAtom } from '@/features/main/atoms/analysisAtoms';
import Toast from '@/shared/components/toast/Toast';

const AnalysisCompletedToast = () => {
  const [pending, setPending] = useAtom(analysisCompletedToastAtom);
  const [visible, setVisible] = useState(pending);
  const closeToast = useCallback(() => setVisible(false), []);

  useEffect(() => {
    setPending(false);
  }, [setPending]);

  if (!visible) return null;

  return <Toast variant='success' message='분석이 완료되었습니다.' onClose={closeToast} />;
};

export default AnalysisCompletedToast;
