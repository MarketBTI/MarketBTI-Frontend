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
      <ul className='flex items-center gap-4 max-w-264 w-full mx-auto max-lg:grid max-lg:grid-cols-2 max-lg:items-stretch max-sm:grid-cols-1'>
        {typeAxes.map(({ code, values, description }) => (
          <li
            key={code}
            className='rounded-xl border border-primary-400 bg-primary-100 p-3 flex-1 min-w-0'
          >
            <div className='flex items-center justify-between mb-3'>
              <h2 className='typo-title-1 whitespace-nowrap text-primary-900'>{code}</h2>
              <div className='flex items-center gap-1 text-neutral-800'>
                <Chip label={values[0]} />
                <span aria-hidden='true'>·</span>
                <Chip label={values[1]} />
              </div>
            </div>

            <p className='typo-caption-2 text-neutral-800'>{description}</p>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default TypeAxesSection;
