'use client';

import { useState } from 'react';
import clsx from 'clsx';
import Image from 'next/image';
import Chip from '@/shared/components/chip/Chip';
import TitleHeader from '@/shared/layouts/TitleHeader';
import { marketTypes } from '../constants/typeGrid';

const TypeGridSection = () => {
  const [openType, setOpenType] = useState<string | null>(null);

  const toggleCard = (type: string) => {
    setOpenType((current) => (current === type ? null : type));
  };

  return (
    <section className='flex flex-col gap-10 rounded-xl bg-white p-8 min-h-[calc(100dvh-400px)]'>
      <TitleHeader
        title='16가지 상권 유형'
        subtitle='각 카드를 클릭해서 유형의 상세 정보를 확인해보세요.'
      />

      <div className='grid grid-cols-4 items-center gap-4 max-w-264 w-full mx-auto'>
        {marketTypes.map(({ type, imageSrc, name, description, axes }) => (
          <button
            key={type}
            type='button'
            aria-label={`${type} 상세 정보`}
            aria-expanded={openType === type}
            onClick={() => toggleCard(type)}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                setOpenType(null);
              }
            }}
            className='relative flex w-full items-center justify-center rounded-xl border border-neutral-400 bg-white text-black transform-3d perspective-[2000px] cursor-pointer focus-visible:outline-primary-900'
          >
            <span
              aria-hidden={openType !== type}
              className='absolute inset-0 flex flex-col items-center justify-center gap-1.5 rounded-xl bg-white px-9 py-6'
            >
              <span className='text-[40px] font-bold text-black mt-2'>{type}</span>
              <span className='typo-headline-2 text-primary-900'>{name}</span>
              <span className='max-w-[90%] typo-body-2 text-neutral-900'>{description}</span>
              <span className='grid w-full grid-cols-2 gap-2.5 mt-auto'>
                {axes.map(({ axis, label }) => (
                  <span
                    key={axis}
                    className='rounded-lg bg-primary-200 py-1.5 whitespace-nowrap typo-body-2 text-neutral-900'
                  >
                    <span className='text-primary-900'>{axis}</span> {label}
                  </span>
                ))}
              </span>
            </span>

            <span
              aria-hidden='true'
              className={clsx(
                'relative z-10 flex w-full flex-col items-center rounded-xl px-3 pt-3 pb-10 origin-left transition-[transform,background-color] duration-500 motion-reduce:transition-none after:pointer-events-none after:absolute after:inset-0 after:rounded-[inherit] after:border after:border-neutral-400 after:transition-opacity after:duration-0 hover:bg-neutral-100',
                openType === type
                  ? 'transform-[rotateY(-80deg)] bg-neutral-100 after:opacity-100 after:delay-200'
                  : 'bg-white after:opacity-0 after:delay-200',
              )}
            >
              <span className='w-full flex justify-end'>
                <Chip label={type} />
              </span>
              <Image
                src={imageSrc}
                alt=''
                width={200}
                height={200}
                className='h-auto max-w-full'
                loading={type === 'GBFS' ? 'eager' : 'lazy'}
              />
            </span>
          </button>
        ))}
      </div>
    </section>
  );
};

export default TypeGridSection;
