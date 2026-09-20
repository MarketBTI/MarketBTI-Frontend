'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Chip from '@/shared/components/chip/Chip';
import TitleHeader from '@/shared/layouts/TitleHeader';
import { marketTypes } from '../constants/typeGrid';

const TypeGridSection = () => {
  const [openCard, setOpenCard] = useState<string | null>(null);

  const toggleCard = (code: string) => {
    setOpenCard((current) => (current === code ? null : code));
  };

  return (
    <section className='flex flex-col gap-10 rounded-xl bg-white p-8'>
      <TitleHeader
        title='16가지 상권 유형'
        subtitle='각 카드를 클릭해서 유형의 상세 정보를 확인해보세요.'
      />

      <div className='grid grid-cols-4 items-center gap-4 max-w-264 w-full mx-auto'>
        {marketTypes.map(({ code, imageSrc }) => (
          <button
            key={code}
            type='button'
            aria-label={`${code} 상세 정보`}
            aria-expanded={openCard === code}
            onClick={() => toggleCard(code)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setOpenCard(null);
              }
            }}
            className='relative flex w-full items-center justify-center rounded-xl border border-neutral-400 bg-white text-black transform-3d perspective-[2000px] cursor-pointer focus-visible:outline-primary-900'
          >
            <span
              aria-hidden='true'
              className={clsx(
                'relative flex w-full flex-col items-center rounded-xl px-3 pt-3 pb-10 origin-left transition-[transform,background-color] duration-500 motion-reduce:transition-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-neutral-400 after:transition-opacity after:duration-0 hover:bg-neutral-100',
                openCard === code
                  ? 'transform-[rotateY(-80deg)] bg-neutral-100 after:opacity-100 after:delay-200'
                  : 'bg-white after:opacity-0 after:delay-200',
              )}
            >
              <span className='w-full flex justify-end'>
                <Chip label={code} />
              </span>
              <Image
                src={imageSrc}
                alt=''
                width={200}
                height={200}
                className='h-auto max-w-full'
                loading={code === 'GBFS' ? 'eager' : 'lazy'}
                unoptimized
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TypeGridSection;
