'use client';

import { useAtom, useAtomValue } from 'jotai';
import { SearchBackgroundIcon, SearchErrorBackgroundIcon } from '@/assets';
import { searchResultAtom, selectedDistrictAtom, selectedIndustryAtom } from '../atoms/searchAtoms';
import { districtsByRegion, industryOptions } from '@/features/main/mocks/selectionOptions';
import { BuildingComplex, MapPin } from 'lucide-react';
import KakaoMap from './KakaoMap';
import SearchOptionList from './SearchOptionList';
import MarketStatsCard from './MarketStatsCard';

const DistrictSection = () => {
  const result = useAtomValue(searchResultAtom);
  const [district, setDistrict] = useAtom(selectedDistrictAtom);
  const [industry, setIndustry] = useAtom(selectedIndustryAtom);

  if (result.kind !== 'valid') {
    return (
      <section
        className='mx-auto flex w-full max-w-264 flex-1 flex-col items-center justify-center gap-8'
        aria-live='polite'
      >
        {result.kind === 'empty' ? (
          <SearchBackgroundIcon aria-hidden='true' />
        ) : (
          <SearchErrorBackgroundIcon aria-hidden='true' />
        )}
        <p className='text-center text-neutral-900 typo-title-3'>
          {result.kind === 'empty'
            ? '검색할 조건을 입력해주세요'
            : result.kind === 'industry-only'
              ? '지역을 먼저 입력한 후 검색해주세요.'
              : result.kind === 'ambiguous'
                ? '같은 이름의 지역이 여러 곳 있습니다. 상위 지역명을 함께 입력해주세요. (예: 서울특별시 강남구)'
                : '관련 정보가 없습니다. 지역과 업종을 다시 정확히 검색해주세요.'}
        </p>
      </section>
    );
  }

  const { conditions } = result;
  const address = [conditions.region, district].filter(Boolean).join(' ');
  const hasMarketStats = Boolean(district && industry);
  return (
    <section className='mx-auto flex w-full max-w-264 flex-1 flex-col'>
      <div className='grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)]'>
        <section className='flex h-fit w-full flex-col gap-4 rounded-xl border border-neutral-400 bg-white p-4'>
          <h1 className='text-black typo-title-2'>검색 결과</h1>
          <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
            <p className='typo-body-1'>검색 범위</p>
            <div className='flex items-center gap-1 text-neutral-900'>
              <MapPin size={24} className='shrink-0' />
              <span className='typo-body-1'>
                {[conditions.region, conditions.district].filter(Boolean).join(' ')}
              </span>
            </div>
            {conditions.industry && (
              <div className='flex items-center gap-1 text-neutral-900'>
                <BuildingComplex size={24} />
                <span className='typo-body-1'>{conditions.industry}</span>
              </div>
            )}
          </div>
          {!conditions.district && (
            <SearchOptionList
              title='관련 지역'
              options={districtsByRegion[conditions.region]}
              value={district}
              onSelect={(value) => {
                if (value === district) return;
                setDistrict(value);
                setIndustry(conditions.industry);
              }}
            />
          )}
          {district && !conditions.industry && (
            <SearchOptionList
              title='관련 업종'
              options={industryOptions}
              value={industry}
              onSelect={setIndustry}
              industry
            />
          )}
          {hasMarketStats && (
            <MarketStatsCard region={conditions.region} district={district} industry={industry} />
          )}
        </section>
        <KakaoMap key={address} address={address} showBoundary={hasMarketStats} />
      </div>
    </section>
  );
};

export default DistrictSection;
