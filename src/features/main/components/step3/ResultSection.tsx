'use client';

import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';
import RiskSignal from './RiskSignal';
import Button from '@/shared/components/button/Button';
import Toast from '@/shared/components/toast/Toast';
import { Download, RotateCw } from 'lucide-react';
import { useRestartDiagnosis, useResultImageDownload } from '@/features/main/hooks';

const ResultSection = () => {
  const handleRestart = useRestartDiagnosis();
  const { resultRef, isDownloading, downloadStatus, closeDownloadToast, handleDownloadImage } =
    useResultImageDownload();

  return (
    <section className='w-207'>
      <AnalysisCompletedToast />
      <div ref={resultRef} className='-m-3 p-3'>
        <TypeResult />
        <div className='flex items-stretch gap-4 mt-4'>
          <ConsumeGraph />
          <RiskSignal />
        </div>
      </div>

      <div className='grid grid-cols-2 gap-3 mt-10'>
        <Button
          label='다시 진단하기'
          icon={<RotateCw />}
          size='lg'
          variant='outline'
          onClick={handleRestart}
          disabled={isDownloading}
        />
        <Button
          label={isDownloading ? '이미지 생성 중...' : '이미지로 다운받기'}
          icon={<Download />}
          size='lg'
          onClick={handleDownloadImage}
          disabled={isDownloading}
        />
      </div>
      {downloadStatus && (
        <Toast
          variant={downloadStatus}
          message={
            downloadStatus === 'success'
              ? '이미지가 다운로드되었습니다.'
              : '이미지 생성에 실패했습니다. 다시 시도해 주세요.'
          }
          onClose={closeDownloadToast}
        />
      )}
    </section>
  );
};

export default ResultSection;
