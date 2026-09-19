'use client';

import clsx from 'clsx';
import { useAtomValue } from 'jotai';
import { BookmarkCheck } from 'lucide-react';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '../atoms/selectionAtoms';

const steps = [
  { title: '조건 선택', description: '지역과 업종을 선택합니다.' },
  { title: '상권 분석', description: '소비 데이터를 분석합니다.' },
  { title: '진단 결과', description: '상권 유형을 확인합니다.' },
];

interface IndicatorSectionProps {
  currentStep: number;
}

const IndicatorSection = ({ currentStep }: IndicatorSectionProps) => {
  const selectedRegion = useAtomValue(selectedRegionAtom);
  const selectedDistrict = useAtomValue(selectedDistrictAtom);
  const selectedIndustry = useAtomValue(selectedIndustryAtom);

  const conditions = [
    { label: '지역', value: selectedRegion },
    { label: '시·구·군', value: selectedDistrict },
    { label: '업종', value: selectedIndustry },
  ];

  return (
    <section className='w-50 space-y-4'>
      <ol className='flex h-98 w-50 flex-col rounded-xl bg-neutral-100 border border-neutral-200 px-6 py-5 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]'>
        {steps.map((step, index) => (
          <li
            className={clsx(
              'relative flex gap-2',
              index < steps.length - 1 ? 'flex-1' : 'shrink-0',
            )}
            key={step.title}
            aria-current={index + 1 === currentStep ? 'step' : undefined}
          >
            {index < steps.length - 1 && (
              <span
                className='absolute top-6 bottom-0 left-2.75 w-0.5 bg-neutral-400'
                aria-hidden='true'
              >
                <span
                  className={clsx(
                    'block w-full bg-primary-800',
                    currentStep > index + 1
                      ? 'h-full'
                      : currentStep === index + 1
                        ? 'h-1/2'
                        : 'h-0',
                  )}
                />
              </span>
            )}
            <span
              className={clsx(
                'relative flex size-6 shrink-0 items-center justify-center rounded-full typo-body-2 text-white',
                index + 1 <= currentStep ? 'bg-primary-800' : 'bg-neutral-400',
              )}
            >
              {index + 1}
            </span>
            <div className='pt-0.5'>
              <p
                className={clsx(
                  'm-0 typo-body-2',
                  index + 1 === currentStep ? 'text-primary-900' : 'text-neutral-700',
                )}
              >
                {step.title}
              </p>
              <p
                className={clsx(
                  'mt-1 typo-caption-3',
                  index + 1 === currentStep ? 'text-neutral-800' : 'text-neutral-600',
                )}
              >
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>

      <article
        className='rounded-xl bg-primary-100 p-4 space-y-2.5 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] border border-primary-200'
        aria-labelledby='selected-conditions-title'
      >
        <h2
          id='selected-conditions-title'
          className='flex items-center gap-1 typo-body-2 text-neutral-900'
        >
          <BookmarkCheck size={20} className='shrink-0 text-primary-800' aria-hidden='true' />
          현재 선택한 조건
        </h2>

        <div className='flex flex-col gap-2.5'>
          {conditions.map(({ label, value }) => (
            <div
              key={label}
              className='min-h-15 rounded-lg bg-white border border-primary-400 px-3 py-2'
            >
              <p className='typo-caption-1 text-neutral-900'>{label}</p>
              <p
                className={clsx(
                  'mt-1 typo-body-2',
                  value === null ? 'text-neutral-600' : 'text-primary-900',
                )}
              >
                {value ?? '선택 전'}
              </p>
            </div>
          ))}
        </div>
      </article>
    </section>
  );
};

export default IndicatorSection;
