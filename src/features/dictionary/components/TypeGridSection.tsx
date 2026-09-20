import Chip from '@/shared/components/chip/Chip';
import TitleHeader from '@/shared/layouts/TitleHeader';
import { marketTypes } from '../constants/typeGrid';

const TypeGridSection = () => {
  return (
    <section className='flex flex-col gap-10 rounded-xl bg-white p-8'>
      <TitleHeader
        title='16가지 상권 유형'
        subtitle='각 카드를 클릭해서 유형의 상세 정보를 확인해보세요.'
      />

      <div className='grid grid-cols-4 items-center gap-4 max-w-264 w-full mx-auto'>
        {marketTypes.map(({ code, Icon }) => (
          <div
            key={code}
            className='border border-neutral-400 bg-white rounded-xl px-3 pt-3 pb-10 flex flex-col items-center shrink-0 hover:bg-neutral-100 transition cursor-pointer'
          >
            <div className='w-full flex justify-end'>
              <Chip label={code} />
            </div>

            <Icon width={200} height={200} aria-hidden='true' />
          </div>
        ))}
      </div>
    </section>
  );
};

export default TypeGridSection;
