'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { CompleteCircleIcon, LodingBackgroundIcon, LodingMascotIcon } from '@/assets';
import { motion, useReducedMotion } from 'framer-motion';
import { useAtomValue, useSetAtom } from 'jotai';
import { Circle, LoaderCircle } from 'lucide-react';
import { analyzeIdAtom, analysisCompletedToastAtom } from '@/features/main/atoms/analysisAtoms';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '@/features/main/atoms/selectionAtoms';
import { useDiagnosisStatusQuery } from '@/features/main/hooks';

const analysisTasks = [
  { label: '소비금액·결제건수 추세 분석', completeAt: 34 },
  { label: '고객층 집중도와 소비 방식 분석', completeAt: 67 },
  { label: '변동성 기반 위험 신호 계산', completeAt: 100 },
] as const;

const DiagnosingSection = () => {
  const router = useRouter();
  const setAnalysisCompletedToast = useSetAtom(analysisCompletedToastAtom);
  const shouldReduceMotion = useReducedMotion();

  const selectedRegion = useAtomValue(selectedRegionAtom);
  const selectedDistrict = useAtomValue(selectedDistrictAtom);
  const selectedIndustry = useAtomValue(selectedIndustryAtom);
  const analyzeId = useAtomValue(analyzeIdAtom);

  const { data: diagnosisStatus } = useDiagnosisStatusQuery(analyzeId);

  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (progress >= 99) return;

    const timeoutId = window.setTimeout(() => {
      setProgress((currentProgress) => currentProgress + 1);
    }, 150);

    return () => window.clearTimeout(timeoutId);
  }, [progress]);

  useEffect(() => {
    if (diagnosisStatus?.result.status !== 'Success') return;

    setAnalysisCompletedToast(true);
    router.replace('/?step=3');
  }, [diagnosisStatus, router, setAnalysisCompletedToast]);

  const selectedCondition = [selectedRegion, selectedDistrict, selectedIndustry]
    .filter((value): value is string => value !== null)
    .join(' · ');

  return (
    <section
      className='-mt-20 flex w-full flex-col items-center pb-8 max-lg:mt-0 max-sm:px-1'
      aria-label='상권 위험 진단 중'
    >
      <div className='relative isolate h-80 w-full max-sm:h-64' aria-hidden='true'>
        <div className='absolute top-[68%] left-1/2 z-0 -translate-x-1/2 -translate-y-1/2'>
          <motion.div
            animate={
              shouldReduceMotion
                ? { x: 0, y: 0, opacity: 0.5 }
                : {
                    x: [80, -80],
                    y: [45, -45],
                    opacity: [0, 0.4, 1, 1, 0.4, 0],
                  }
            }
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : {
                    x: { duration: 4, ease: 'linear', repeat: Infinity },
                    y: { duration: 4, ease: 'linear', repeat: Infinity },
                    opacity: {
                      duration: 4,
                      ease: 'easeInOut',
                      repeat: Infinity,
                      times: [0, 0.16, 0.38, 0.68, 0.9, 1],
                    },
                  }
            }
          >
            <LodingBackgroundIcon className='block' />
          </motion.div>
        </div>
        <div className='absolute inset-0 z-10 flex items-center justify-center'>
          <motion.div
            animate={shouldReduceMotion ? { y: 0 } : { y: [0, -12, 0], scaleY: [1, 1.025, 1] }}
            transition={
              shouldReduceMotion
                ? { duration: 0 }
                : { duration: 0.9, ease: 'easeInOut', repeat: Infinity }
            }
          >
            <LodingMascotIcon className='origin-bottom' />
          </motion.div>
        </div>
      </div>

      <div className='w-full max-w-145'>
        <div className='mx-auto w-full max-w-lg'>
          <div
            className='relative pt-5'
            role='progressbar'
            aria-label='상권 분석 진행률'
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
          >
            <span className='absolute top-0 right-1 typo-caption-3 text-neutral-900'>
              {progress}%
            </span>
            <div className='h-2 overflow-hidden rounded-full bg-neutral-500'>
              <motion.div
                className='h-full rounded-full bg-primary-800'
                initial={{ width: '0%' }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: shouldReduceMotion ? 0 : 0.15, ease: 'linear' }}
              />
            </div>
          </div>

          <div className='mt-6 text-center'>
            <h1 className='typo-headline-1 text-black'>상권의 소비 성격을 읽는 중입니다</h1>
            <p className='mt-2 typo-caption-2 text-primary-900'>
              {selectedCondition || '선택한 조건을 확인하고 있습니다.'}
            </p>
          </div>
        </div>

        <ol className='mt-15 flex flex-col gap-4'>
          {analysisTasks.map((task, index) => {
            const isComplete = progress >= task.completeAt;
            const previousCompleteAt = index === 0 ? 0 : analysisTasks[index - 1].completeAt;
            const isActive = !isComplete && progress >= previousCompleteAt;

            return (
              <li
                key={task.label}
                className='flex min-h-13 items-center gap-2 rounded-xl bg-neutral-100 px-4'
              >
                {isComplete ? (
                  <CompleteCircleIcon
                    size={18}
                    className='shrink-0 text-primary-700'
                    aria-hidden='true'
                  />
                ) : isActive ? (
                  <LoaderCircle
                    size={17}
                    className='shrink-0 animate-spin text-primary-700 motion-reduce:animate-none'
                    aria-hidden='true'
                  />
                ) : (
                  <Circle size={17} className='shrink-0 text-neutral-600' aria-hidden='true' />
                )}

                <span
                  className={isActive || isComplete ? 'typo-body-2 text-black' : 'text-neutral-600'}
                >
                  {task.label}
                </span>
                <span
                  className={
                    isComplete ? 'ml-auto text-primary-800 typo-body-2' : 'ml-auto text-neutral-600'
                  }
                >
                  {isComplete ? '완료' : isActive ? '분석중' : '대기'}
                </span>
              </li>
            );
          })}
        </ol>

        <p className='mt-15 animate-pulse text-center typo-body-3 text-neutral-800 motion-reduce:animate-none'>
          잠시만 기다려주세요. 정확한 분석을 위해 데이터를 처리하고 있습니다.
        </p>
      </div>
    </section>
  );
};

export default DiagnosingSection;
