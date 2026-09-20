'use client';

import { useAtomValue } from 'jotai';
import { SearchBackgroundIcon } from '@/assets';
import { debouncedSearchValueAtom } from '@/features/search/atoms/searchAtoms';
import { BuildingComplex, MapPin } from 'lucide-react';
import Button from '@/shared/components/button/Button';

const DistrictSection = () => {
  const setDebouncedSearchValue = useAtomValue(debouncedSearchValueAtom);

  return (
    <section className='mx-auto flex w-full max-w-264 flex-1 flex-col'>
      {!setDebouncedSearchValue.trim() ? (
        <div className='flex flex-1 items-center justify-center'>
          <SearchBackgroundIcon aria-hidden='true' />
        </div>
      ) : (
        <section className='flex flex-col gap-4 bg-white border border-neutral-400 rounded-xl w-85 p-4'>
          <h1 className='text-black typo-title-2'>검색 결과</h1>
          <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
            <p className='typo-body-1'>검색 범위</p>
            <div className='flex items-center gap-1 text-neutral-900'>
              <MapPin size={24} /> <span className='typo-body-1'>서울특별시</span>
            </div>
          </div>

          <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
            <p className='typo-body-1'>관련 지역</p>
            <Button label='강남구' icon={<MapPin />} variant='outline' className='justify-start!' />
            <Button label='강남구' icon={<MapPin />} variant='outline' className='justify-start!' />
          </div>

          <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
            <p className='typo-body-1'>관련 업종</p>
            <Button
              label='대형 할인점'
              icon={<BuildingComplex />}
              variant='outline'
              className='justify-start!'
            />
            <Button
              label='한식'
              icon={<BuildingComplex />}
              variant='outline'
              className='justify-start!'
            />
          </div>

          <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
            <p className='typo-body-1'>강남구 대형할인점</p>

            <div className='flex gap-2 items-center justify-center py-3 bg-neutral-100 rounded-lg'>
              <div className='flex flex-col gap-1 mr-3'>
                <p className='text-neutral-800 typo-small-1 text-center'>영업 점포</p>
                <p className='text-primary-900 typo-body-1'>256개</p>
              </div>

              <div className='flex flex-col gap-1 px-3 border-x-2 border-neutral-500'>
                <p className='text-neutral-800 typo-small-1 text-center'>최근 6개월 폐업</p>
                <p className='text-primary-900 typo-body-1 text-center'>18개</p>
              </div>

              <div className='flex flex-col gap-1'>
                <p className='text-neutral-800 typo-small-1 text-center'>폐업</p>
                <p className='text-semantic-700 typo-body-1 ml-3'>7.0%</p>
              </div>
            </div>
          </div>
        </section>
      )}
    </section>
  );
};

export default DistrictSection;
