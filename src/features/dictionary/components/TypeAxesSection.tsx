import Chip from '@/shared/components/chip/Chip';
import TitleHeader from '@/shared/layouts/TitleHeader';
import { typeAxes } from '../constants/typeAxes';

const TypeAxesSection = () => {
  return (
    <section className='flex flex-col gap-10 rounded-xl bg-white p-8 max-lg:gap-6 max-lg:p-4 max-sm:p-3'>
      <TitleHeader
        title='4가지 판단 축'
        subtitle='각 축의 두 값을 조합해 16개 상권 유형을 결정합니다.'
      />
      <ul className='mx-auto flex w-full max-w-264 items-stretch gap-5 max-lg:grid max-lg:grid-cols-2 max-lg:gap-4 max-sm:grid-cols-1'>
        {typeAxes.map(({ code, values, description }) => (
          <li
            key={code}
            className='flex min-h-36 min-w-0 flex-1 flex-col rounded-2xl border border-primary-400 bg-primary-100 p-5 max-xl:p-4'
          >
            <div className='mb-5 flex items-center justify-between gap-2'>
              <h2 className='whitespace-nowrap typo-headline-1 text-primary-900'>{code}</h2>
              <div className='flex items-center gap-1 text-neutral-800'>
                <Chip label={values[0]} />
                <span aria-hidden='true'>·</span>
                <Chip label={values[1]} />
              </div>
            </div>

            <p className='mt-auto typo-body-2 text-neutral-800'>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TypeAxesSection;
