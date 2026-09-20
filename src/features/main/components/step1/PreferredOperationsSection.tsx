import { useAtom } from 'jotai';
import clsx from 'clsx';
import {
  operatingPriorityAtom,
  targetCustomerAgeAtom,
  targetMonthlySalesAtom,
} from '@/features/main/atoms/selectionAtoms';
import {
  customerAgeOptions,
  monthlySalesOptions,
} from '@/features/main/constants/selectionOptions';
import Button from '@/shared/components/button/Button';
import PreferenceCard from './PreferenceCard';

const PreferredOperationsSection = () => {
  const [operatingPriority, setOperatingPriority] = useAtom(operatingPriorityAtom);
  const [targetCustomerAge, setTargetCustomerAge] = useAtom(targetCustomerAgeAtom);
  const [targetMonthlySales, setTargetMonthlySales] = useAtom(targetMonthlySalesAtom);

  return (
    <section className='mt-5 flex flex-col gap-4 rounded-xl border border-primary-200 bg-primary-100 px-5 py-6 shadow-[0_4px_12px_0_rgba(0,0,0,0.15)]'>
      <h2 className='typo-title-2 text-neutral-900'>선호 운영 기준</h2>

      <PreferenceCard step={1} title='운영 우선 순위'>
        <div className='flex items-center gap-4 px-4'>
          <span className='shrink-0 rounded-lg bg-neutral-100 px-3 py-4 typo-body-2 text-neutral-900'>
            안정형
          </span>
          <div
            role='radiogroup'
            aria-label='운영 우선 순위'
            className='relative flex flex-1 justify-between'
          >
            <span
              aria-hidden='true'
              className='absolute top-1.5 right-2.5 left-2.5 h-1.5 bg-neutral-300'
            />
            <span
              aria-hidden='true'
              className='absolute top-1.5 left-2.5 h-1.5 bg-primary-600'
              style={{ width: `calc((100% - 20px) * ${(operatingPriority - 1) / 4})` }}
            />
            {[1, 2, 3, 4, 5].map((priority) => {
              const isSelected = priority === operatingPriority;
              const isActive = priority <= operatingPriority;

              return (
                <button
                  key={priority}
                  type='button'
                  role='radio'
                  aria-checked={isSelected}
                  aria-label={`${priority}단계`}
                  onClick={() => setOperatingPriority(priority)}
                  className='relative z-10 flex flex-col items-center gap-1.5'
                >
                  <span
                    className={clsx(
                      'size-5 rounded-full border-4 bg-white',
                      isSelected
                        ? 'border-primary-700 ring-1 ring-primary-700 ring-offset-2'
                        : isActive
                          ? 'border-primary-600'
                          : 'border-neutral-300',
                    )}
                  />
                  <span
                    className={clsx(
                      'typo-caption-2',
                      isActive ? 'text-primary-800' : 'text-neutral-700',
                    )}
                  >
                    {priority}
                  </span>
                </button>
              );
            })}
          </div>
          <span className='shrink-0 rounded-lg bg-neutral-100 px-3 py-4 typo-body-2 text-neutral-900'>
            성장형
          </span>
        </div>
      </PreferenceCard>

      <PreferenceCard
        step={2}
        title='희망 고객 연령'
        description='주로 어떤 연령대 고객을 타깃으로 하고 싶나요?'
      >
        <div className='grid grid-cols-6 gap-3'>
          {customerAgeOptions.map((age) => (
            <Button
              key={age}
              label={age}
              selected={targetCustomerAge === age}
              onClick={() => setTargetCustomerAge(age)}
              variant='selection'
              className='w-full'
            />
          ))}
        </div>
      </PreferenceCard>

      <PreferenceCard
        step={3}
        title='목표 월 매출'
        description='매장의 월 평균 목표 매출을 선택해 주세요.'
      >
        <div className='grid grid-cols-3 gap-3'>
          {monthlySalesOptions.map((sales) => (
            <Button
              key={sales}
              label={sales}
              selected={targetMonthlySales === sales}
              onClick={() => setTargetMonthlySales(sales)}
              variant='selection'
              className='w-full'
            />
          ))}
        </div>
      </PreferenceCard>
    </section>
  );
};

export default PreferredOperationsSection;
