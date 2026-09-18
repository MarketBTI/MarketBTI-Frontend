import { BookmarkCheck } from 'lucide-react';
import clsx from 'clsx';

interface IndicatorSectionProps {
  selectedRegion: string | null;
  selectedDistrict: string | null;
  selectedIndustry: string | null;
}
const steps = [
  { title: '조건 선택', description: '지역과 업종을 선택합니다.' },
  { title: '상권 분석', description: '소비 데이터를 분석합니다.' },
  { title: '진단 결과', description: '상권 유형을 확인합니다.' },
];
const IndicatorSection = ({
  selectedRegion,
  selectedDistrict,
  selectedIndustry,
}: IndicatorSectionProps) => {
  const conditions = [
    { label: '지역', value: selectedRegion },
    { label: '시·구·군', value: selectedDistrict },
    { label: '업종', value: selectedIndustry },
  ];
  return (
    <aside
      className='col-start-3 flex w-50 max-w-full flex-col gap-4 justify-self-end @max-[1100px]:col-start-1 @max-[1100px]:grid @max-[1100px]:w-full @max-[1100px]:grid-cols-2 @max-[480px]:grid-cols-1'
      aria-label='진단 진행 상황'
    >
      <ol className='m-0 rounded-lg bg-neutral-100 px-6 py-4 shadow-[0_4px_8px_rgb(0_0_0/0.15)]'>
        {steps.map((step, index) => (
          <li
            className={clsx(
              'relative flex min-h-35 gap-2 text-neutral-600 last:min-h-15',
              index < steps.length - 1 &&
                'before:absolute before:top-6 before:bottom-0 before:left-2.75 before:w-0.5 before:content-[""]',
              index === 0
                ? 'before:bg-[linear-gradient(var(--color-primary-800)_50%,var(--color-neutral-400)_50%)]'
                : 'before:bg-neutral-400',
            )}
            key={step.title}
            aria-current={index === 0 ? 'step' : undefined}
          >
            <span
              className={clsx(
                'flex size-6 shrink-0 items-center justify-center rounded-full text-white',
                index === 0 ? 'bg-primary-800' : 'bg-neutral-400',
              )}
            >
              {index + 1}
            </span>
            <div>
              <p className={clsx('mt-1 mx-0 mb-1.5 text-body2', index === 0 && 'text-primary-900')}>
                {step.title}
              </p>
              <p className={clsx('m-0 text-caption3', index === 0 && 'text-neutral-800')}>
                {step.description}
              </p>
            </div>
          </li>
        ))}
      </ol>
      <section
        className='m-0 rounded-lg bg-primary-100 p-4 text-neutral-900 shadow-[0_4px_8px_rgb(0_0_0/0.15)]'
        aria-labelledby='selected-conditions-title'
      >
        <h2
          id='selected-conditions-title'
          className='m-0 mb-2.5 flex items-center gap-1 text-body1'
        >
          <BookmarkCheck size={20} className='shrink-0 text-primary-800' aria-hidden='true' />
          현재 선택한 조건
        </h2>
        <dl className='m-0 grid gap-2.5'>
          {conditions.map(({ label, value }) => (
            <div
              className='h-15.5 rounded-md border border-solid border-primary-300 bg-white px-3 py-2 text-caption1'
              key={label}
            >
              <dt>{label}</dt>
              <dd
                className={clsx(
                  'm-0 mt-2 text-base leading-[inherit]',
                  value === null ? 'font-medium text-neutral-700' : 'text-primary-900',
                )}
              >
                {value ?? '선택 전'}
              </dd>
            </div>
          ))}
        </dl>
      </section>
    </aside>
  );
};
export default IndicatorSection;
