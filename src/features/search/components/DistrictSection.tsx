'use client';

import { useAtom, useAtomValue } from 'jotai';
import { BuildingComplex, MapPin } from 'lucide-react';
import { SearchBackgroundIcon, SearchErrorBackgroundIcon } from '@/assets';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  submittedSearchValueAtom,
} from '@/features/search/atoms/searchAtoms';
import {
  useAllSigunguRegionsQueries,
  useIndustriesQuery,
  useSidoRegionsQuery,
  useSigunguRegionsQuery,
} from '@/features/main/hooks';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import KakaoMap from './KakaoMap';
import SearchOptionList from './SearchOptionList';

const normalize = (value: string) => value.replace(/\s+/g, '');

const getRegionAliases = (region: string) => {
  const shortName = region.replace(/특별자치도|특별자치시|특별시|광역시|도$/u, '');
  return [...new Set([region, shortName, `${shortName}시`])].sort(
    (a, b) => normalize(b).length - normalize(a).length,
  );
};

const DistrictSection = () => {
  const submittedValue = useAtomValue(submittedSearchValueAtom);
  const [selectedDistrict, setSelectedDistrict] = useAtom(selectedDistrictAtom);
  const [selectedIndustry, setSelectedIndustry] = useAtom(selectedIndustryAtom);
  const normalizedSearch = normalize(submittedValue);

  const { data: regions = [], isPending: isRegionsPending } = useSidoRegionsQuery();
  const directRegionMatch = regions
    .flatMap(({ sido_name }) =>
      getRegionAliases(sido_name).map((alias) => ({ region: sido_name, alias })),
    )
    .filter(({ alias }) => normalizedSearch.startsWith(normalize(alias)))
    .toSorted((a, b) => normalize(b.alias).length - normalize(a.alias).length)[0];

  const shouldSearchAllDistricts = Boolean(
    normalizedSearch && !isRegionsPending && !directRegionMatch,
  );
  const {
    data: allDistricts,
    isPending: isAllDistrictsPending,
    isError: isAllDistrictsError,
  } = useAllSigunguRegionsQueries(
    regions.map(({ sido_name }) => sido_name),
    shouldSearchAllDistricts,
  );
  const {
    data: directRegionDistricts = [],
    isPending: isDirectDistrictsPending,
    isError: isDirectDistrictsError,
  } = useSigunguRegionsQuery(directRegionMatch?.region ?? null);

  const searchAfterRegion = directRegionMatch
    ? normalizedSearch.slice(normalize(directRegionMatch.alias).length)
    : normalizedSearch;
  const directDistrict = directRegionDistricts
    .filter(({ sigungu_name }) => searchAfterRegion.startsWith(normalize(sigungu_name)))
    .toSorted((a, b) => normalize(b.sigungu_name).length - normalize(a.sigungu_name).length)[0];
  const isSelfGoverningRegion =
    directRegionDistricts.length === 1 &&
    directRegionDistricts[0].sigungu_name === directRegionMatch?.region;
  const districtOnlyMatches = shouldSearchAllDistricts
    ? allDistricts.filter(({ sigungu_name }) =>
        normalizedSearch.startsWith(normalize(sigungu_name)),
      )
    : [];
  const districtOnlyMatch = districtOnlyMatches.length === 1 ? districtOnlyMatches[0] : undefined;

  const region = directRegionMatch?.region ?? districtOnlyMatch?.sido_name ?? '';
  const parsedDistrict =
    directDistrict?.sigungu_name ??
    districtOnlyMatch?.sigungu_name ??
    (isSelfGoverningRegion ? directRegionMatch?.region : '') ??
    '';
  const district = selectedDistrict || parsedDistrict;
  const regionDistricts = directRegionMatch
    ? directRegionDistricts
    : allDistricts.filter(({ sido_name }) => sido_name === region);
  const districtData = regionDistricts.find(({ sigungu_name }) => sigungu_name === district);

  const searchAfterLocation = directRegionMatch
    ? directDistrict
      ? searchAfterRegion.slice(normalize(directDistrict.sigungu_name).length)
      : searchAfterRegion
    : districtOnlyMatch
      ? normalizedSearch.slice(normalize(districtOnlyMatch.sigungu_name).length)
      : '';
  const {
    data: industries = [],
    isPending: isIndustriesPending,
    isError: isIndustriesError,
  } = useIndustriesQuery(districtData?.region_code);
  const parsedIndustry = industries.find(
    ({ industry_display_name }) => normalize(industry_display_name) === searchAfterLocation,
  )?.industry_display_name;
  const industry = selectedIndustry || parsedIndustry || '';
  const industryData = industries.find(
    ({ industry_display_name }) => industry_display_name === industry,
  );

  const isLocationPending =
    isRegionsPending ||
    isAllDistrictsPending ||
    (Boolean(directRegionMatch) && isDirectDistrictsPending);
  const isLocationError = isAllDistrictsError || isDirectDistrictsError;
  const isAmbiguous = !directRegionMatch && districtOnlyMatches.length > 1;
  const isInvalid =
    Boolean(normalizedSearch) &&
    !isLocationPending &&
    (!region ||
      isLocationError ||
      (Boolean(district) &&
        Boolean(searchAfterLocation) &&
        !isIndustriesPending &&
        (!parsedIndustry || isIndustriesError)));

  if (!normalizedSearch || isLocationPending || isInvalid || isAmbiguous) {
    return (
      <section
        className='mx-auto flex w-full max-w-264 flex-1 flex-col items-center justify-center gap-8'
        aria-live='polite'
      >
        {isLocationPending ? (
          <LoadingSpinner label='검색 조건을 확인하는 중입니다.' />
        ) : !normalizedSearch ? (
          <SearchBackgroundIcon aria-hidden='true' />
        ) : (
          <SearchErrorBackgroundIcon aria-hidden='true' />
        )}
        {!isLocationPending && (
          <p className='text-center text-neutral-900 typo-title-3'>
            {!normalizedSearch
              ? '검색할 조건을 입력해주세요'
              : isAmbiguous
                ? '같은 이름의 지역이 여러 곳 있습니다. 상위 지역명을 함께 입력해주세요. (예: 서울특별시 강남구)'
                : '관련 정보가 없습니다. 지역과 업종을 다시 정확히 검색해주세요.'}
          </p>
        )}
      </section>
    );
  }

  const address = district && district !== region ? `${region} ${district}` : region;
  const districtOptions = [...new Set(regionDistricts.map(({ sigungu_name }) => sigungu_name))];
  const industryOptions = industries.map(({ industry_display_name }) => industry_display_name);
  const hasDistrict = Boolean(district);
  const marketStats =
    districtData && industryData
      ? {
          region,
          district,
          industry,
          regionCode: districtData.region_code,
          industryCode: industryData.industry_code,
        }
      : undefined;

  return (
    <section className='mx-auto flex w-full max-w-264 flex-1 flex-col'>
      <div className='grid flex-1 grid-cols-1 gap-5 lg:grid-cols-[340px_minmax(0,1fr)]'>
        <section className='flex h-fit w-full flex-col gap-4 rounded-xl border border-neutral-400 bg-white p-4'>
          <h1 className='text-black typo-title-2'>검색 결과</h1>
          <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
            <p className='typo-body-1'>검색 범위</p>
            <div className='flex items-center gap-1 text-neutral-900'>
              <MapPin size={20} className='shrink-0' />
              <span className='typo-body-2'>
                {[region, district !== region ? district : ''].filter(Boolean).join(' · ')}
              </span>
            </div>
          </div>
          {industry && (
            <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
              <p className='typo-body-1'>관련 업종</p>
              <div className='flex items-center gap-2 text-neutral-900'>
                <BuildingComplex size={20} className='shrink-0' />
                <span className='typo-body-2'>{industry}</span>
              </div>
            </div>
          )}
          {!district && districtOptions.length > 0 && (
            <SearchOptionList
              title='관련 지역'
              options={districtOptions}
              value={district}
              onSelect={(value) => {
                setSelectedDistrict(value);
                setSelectedIndustry('');
              }}
            />
          )}
          {district && !isIndustriesPending && (
            <SearchOptionList
              title='관련 업종'
              options={industryOptions}
              value={industry}
              onSelect={setSelectedIndustry}
              industry
            />
          )}
        </section>
        <KakaoMap
          key={address}
          address={address}
          showBoundary={hasDistrict}
          marketStats={marketStats}
        />
      </div>
    </section>
  );
};

export default DistrictSection;
