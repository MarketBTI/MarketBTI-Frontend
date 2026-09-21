'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';
import RiskSignal from './RiskSignal';
import Button from '@/shared/components/button/Button';
import Toast from '@/shared/components/toast/Toast';
import { Download, RotateCw } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { analyzeIdAtom } from '@/features/main/atoms/analysisAtoms';
import {
  useDiagnosisResultQuery,
  useRestartDiagnosis,
  useResultImageDownload,
} from '@/features/main/hooks';

const ResultSection = () => {
  const router = useRouter();
  const analyzeId = useAtomValue(analyzeIdAtom);
  const { data: diagnosisResponse } = useDiagnosisResultQuery(analyzeId);
  const diagnosisResult = diagnosisResponse?.result;

  const handleRestart = useRestartDiagnosis();
  const { resultRef, isDownloading, downloadStatus, closeDownloadToast, handleDownloadImage } =
    useResultImageDownload();

  useEffect(() => {
    if (!analyzeId) router.replace('/?step=1');
  }, [analyzeId, router]);

  if (!analyzeId) return null;

  return (
    <section className='w-207 max-lg:w-full'>
      <AnalysisCompletedToast />
      <div ref={resultRef} className='-m-3 p-3'>
        {diagnosisResult && (
          <>
            <TypeResult
              market={diagnosisResult.market}
              axes={diagnosisResult.axes}
              interpretation={diagnosisResult.interpretation}
            />
            <div className='mt-4 flex items-stretch gap-4 max-md:flex-col'>
              <ConsumeGraph
                data={diagnosisResult.consumptionFlow}
                market={diagnosisResult.market}
                warningMonth={diagnosisResult.volatility.warningMonth}
              />
              <RiskSignal riskSignals={diagnosisResult.risk_signals} />
            </div>
          </>
        )}
      </div>

      <div className='mt-10 grid grid-cols-2 gap-3 max-sm:grid-cols-1'>
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
