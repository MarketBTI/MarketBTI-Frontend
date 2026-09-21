'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';
import RiskSignal from './RiskSignal';
import Button from '@/shared/components/button/Button';
import ErrorState from '@/shared/components/feedback/ErrorState';
import Toast from '@/shared/components/toast/Toast';
import { Download, RotateCw } from 'lucide-react';
import { useAtomValue } from 'jotai';
import { analyzeIdAtom } from '@/features/main/atoms/analysisAtoms';
import { useDiagnosisResultQuery, useResultImageDownload } from '@/features/main/hooks';

const ResultSection = () => {
  const router = useRouter();
  const analyzeId = useAtomValue(analyzeIdAtom);

  const { data: diagnosisResponse } = useDiagnosisResultQuery(analyzeId);

  const diagnosisResult = diagnosisResponse?.result;
  const hasInsufficientData = diagnosisResponse?.result === null;

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
        {hasInsufficientData && (
          <div className='flex min-h-60 items-center justify-center rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]'>
            <ErrorState message='분석할 데이터가 부족합니다. 다른 조건을 선택해 다시 진단해 주세요.' />
          </div>
        )}
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

      {diagnosisResponse && (
        <div
          className={
            hasInsufficientData
              ? 'mt-10 flex justify-center'
              : 'mt-10 grid grid-cols-2 gap-3 max-sm:grid-cols-1'
          }
        >
          <Button
            label='다시 진단하기'
            icon={<RotateCw />}
            size='lg'
            variant='outline'
            onClick={() => router.replace('/?step=1')}
            disabled={isDownloading}
            className={hasInsufficientData ? 'w-120 max-sm:w-full' : undefined}
          />
          {!hasInsufficientData && (
            <Button
              label={isDownloading ? '이미지 생성 중...' : '이미지로 다운받기'}
              icon={<Download />}
              size='lg'
              onClick={handleDownloadImage}
              disabled={isDownloading}
            />
          )}
        </div>
      )}
      {!hasInsufficientData && downloadStatus && (
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
