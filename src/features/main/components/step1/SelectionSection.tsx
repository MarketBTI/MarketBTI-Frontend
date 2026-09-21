'use client';

import { useAtom } from 'jotai';
import SelectionGroup from './SelectionGroup';
import PreferredOperationsSection from './PreferredOperationsSection';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '@/features/main/atoms/selectionAtoms';
import { industryOptions } from '@/features/main/mocks/selectionOptions';
import { VillageIcon } from '@/assets';
import Button from '@/shared/components/button/Button';
import ErrorState from '@/shared/components/feedback/ErrorState';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { getFindRegions } from '@/features/main/api/diagnosis';

const SelectionSection = () => {
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useAtom(selectedRegionAtom);
  const [selectedDistrict, setSelectedDistrict] = useAtom(selectedDistrictAtom);
  const [selectedIndustry, setSelectedIndustry] = useAtom(selectedIndustryAtom);

  const {
    data: regionsResponse,
    isPending: isRegionsPending,
    isError: isRegionsError,
    refetch: refetchRegions,
  } = useQuery({
    queryKey: ['regions', 'sido'],
    queryFn: () => getFindRegions(),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const regionOptions = regionsResponse?.result.map(({ sido_name }) => sido_name) ?? [];

  const {
    data: districtsResponse,
    isPending: isDistrictsPending,
    isError: isDistrictsError,
    refetch: refetchDistricts,
  } = useQuery({
    queryKey: ['regions', 'sigungu', selectedRegion],
    queryFn: () => getFindRegions(selectedRegion ?? undefined),
    enabled: Boolean(selectedRegion),
    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 10,
  });

  const districtOptions =
    districtsResponse?.result.flatMap((region) =>
      'sigungu_name' in region ? [region.sigungu_name] : [],
    ) ?? [];

  const selectRegion = (region: string) => {
    if (region === selectedRegion) return;
    setSelectedRegion(region);
    setSelectedDistrict(null);
    setSelectedIndustry(null);
  };

  const selectDistrict = (district: string) => {
    if (district === selectedDistrict) return;
    setSelectedDistrict(district);
    setSelectedIndustry(null);
  };

  return (
    <section className='relative w-207'>
      <VillageIcon
        className='pointer-events-none absolute right-2 bottom-full'
        aria-hidden='true'
        focusable='false'
      />

      <div className='space-y-5'>
        <SelectionGroup
          step={1}
          title='지역 선택'
          options={regionOptions}
          selected={selectedRegion}
          onSelect={selectRegion}
          status={
            isRegionsPending ? (
              <LoadingSpinner label='지역 목록을 불러오는 중입니다.' />
            ) : isRegionsError ? (
              <ErrorState
                message='지역 목록을 불러오지 못했습니다.'
                onRetry={() => void refetchRegions()}
              />
            ) : undefined
          }
        />
        {selectedRegion && (
          <SelectionGroup
            key={selectedRegion}
            step={2}
            title='시·구·군 선택'
            options={districtOptions}
            selected={selectedDistrict}
            onSelect={selectDistrict}
            status={
              isDistrictsPending ? (
                <LoadingSpinner label='시·구·군 목록을 불러오는 중입니다.' />
              ) : isDistrictsError ? (
                <ErrorState
                  message='시·구·군 목록을 불러오지 못했습니다.'
                  onRetry={() => void refetchDistricts()}
                />
              ) : undefined
            }
          />
        )}
        {selectedRegion && selectedDistrict && (
          <SelectionGroup
            key={`${selectedRegion}-${selectedDistrict}`}
            step={3}
            title='업종 선택'
            options={industryOptions}
            selected={selectedIndustry}
            onSelect={setSelectedIndustry}
          />
        )}
      </div>

      {<PreferredOperationsSection />}
      <div className='mt-10 flex justify-center'>
        <Button
          label='위험 진단 시작하기'
          size='lg'
          className='w-120'
          onClick={() => router.push('/?step=2')}
          disabled={!selectedRegion || !selectedDistrict || !selectedIndustry}
        />
      </div>
    </section>
  );
};

export default SelectionSection;
