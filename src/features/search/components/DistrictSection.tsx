'use client';

import { useAtomValue } from 'jotai';
import { SearchBackgroundIcon } from '@/assets';
import { submittedSearchValueAtom } from '@/features/search/atoms/searchAtoms';
import { BuildingComplex, MapPin } from 'lucide-react';
import Button from '@/shared/components/button/Button';
import KakaoMap from './KakaoMap';

const DistrictSection = () => {
  const submittedSearchValue = useAtomValue(submittedSearchValueAtom);

  return (
    <section className='mx-auto flex w-full max-w-264 flex-1 flex-col'>
      {!submittedSearchValue ? (
        <div className='flex flex-col flex-1 items-center justify-center gap-8'>
          <SearchBackgroundIcon aria-hidden='true' />
          <p className='text-neutral-900 typo-title-2'>검색할 조건을 입력해주세요</p>
        </div>
      ) : (
        <div className='grid flex-1 grid-cols-[340px_minmax(0,1fr)] gap-5'>
          <section className='flex w-full flex-col gap-4 rounded-xl border border-neutral-400 bg-white p-4'>
            <h1 className='text-black typo-title-2'>검색 결과</h1>
            <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
              <p className='typo-body-1'>검색 범위</p>
              <div className='flex items-center gap-1 text-neutral-900'>
                <MapPin size={24} /> <span className='typo-body-1'>서울특별시</span>
              </div>
            </div>

            <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
              <p className='typo-body-1'>관련 지역</p>
              <div className='thin-scrollbar flex max-h-54 flex-col gap-3 overflow-y-auto pr-2 pb-1'>
                <Button
                  label='강남구'
                  icon={<MapPin />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='강동구'
                  icon={<MapPin />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='강북구'
                  icon={<MapPin />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='강서구'
                  icon={<MapPin />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='관악구'
                  icon={<MapPin />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
              </div>
            </div>

            <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
              <p className='typo-body-1'>관련 업종</p>
              <div className='thin-scrollbar flex max-h-54 flex-col gap-3 overflow-y-auto pr-2 pb-1'>
                <Button
                  label='대형 할인점'
                  icon={<BuildingComplex />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='한식'
                  icon={<BuildingComplex />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='한식'
                  icon={<BuildingComplex />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='한식'
                  icon={<BuildingComplex />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
                <Button
                  label='한식'
                  icon={<BuildingComplex />}
                  variant='outline'
                  className='shrink-0 justify-start!'
                />
              </div>
            </div>

            <div className='bg-white border border-neutral-400 rounded-xl p-4 flex flex-col gap-3'>
              <p className='typo-body-1'>서울특별시 강남구 대형할인점</p>

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
          <KakaoMap />
        </div>
      )}
    </section>
  );
};

export default DistrictSection;
