'use client';

import { useMutation } from '@tanstack/react-query';
import { useAtom, useAtomValue, useSetAtom } from 'jotai';
import SelectionGroup from './SelectionGroup';
import PreferredOperationsSection from './PreferredOperationsSection';
import {
  operatingPriorityAtom,
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
  targetCustomerAgeAtom,
  targetMonthlySalesAtom,
} from '@/features/main/atoms/selectionAtoms';
import { postDiagnoses } from '@/features/main/api/diagnosis';
import { analyzeIdAtom } from '@/features/main/atoms/analysisAtoms';
import { VillageIcon } from '@/assets';
import Button from '@/shared/components/button/Button';
import ErrorState from '@/shared/components/feedback/ErrorState';
import LoadingSpinner from '@/shared/components/feedback/LoadingSpinner';
import { useRouter } from 'next/navigation';
import {
  customerAgeCodes,
  monthlySalesRanges,
} from '@/features/main/constants/selectionOptions';
import {
  useIndustriesQuery,
  useSidoRegionsQuery,
  useSigunguRegionsQuery,
} from '@/features/main/hooks';

const SelectionSection = () => {
  const router = useRouter();
  const setAnalyzeId = useSetAtom(analyzeIdAtom);

  const [selectedRegion, setSelectedRegion] = useAtom(selectedRegionAtom);
  const [selectedDistrict, setSelectedDistrict] = useAtom(selectedDistrictAtom);
  const [selectedIndustry, setSelectedIndustry] = useAtom(selectedIndustryAtom);
  const operatingPriority = useAtomValue(operatingPriorityAtom);
  const targetCustomerAge = useAtomValue(targetCustomerAgeAtom);
  const targetMonthlySales = useAtomValue(targetMonthlySalesAtom);

  const {
    data: regions = [],
    isPending: isRegionsPending,
    isError: isRegionsError,
    refetch: refetchRegions,
  } = useSidoRegionsQuery();

  const regionOptions = regions.map(({ sido_name }) => sido_name);

  const {
    data: districts = [],
    isPending: isDistrictsPending,
    isError: isDistrictsError,
    refetch: refetchDistricts,
  } = useSigunguRegionsQuery(selectedRegion);

  const districtOptions = districts.map(({ sigungu_name }) => sigungu_name);

  const selectedRegionCode = districts.find(
    ({ sigungu_name }) => sigungu_name === selectedDistrict,
  )?.region_code;

  const {
    data: industries = [],
    isPending: isIndustriesPending,
    isError: isIndustriesError,
    refetch: refetchIndustries,
  } = useIndustriesQuery(selectedRegionCode);

  const industryOptions = industries.map(({ industry_display_name }) => industry_display_name);

  const selectedIndustryCode = industries.find(
    ({ industry_display_name }) => industry_display_name === selectedIndustry,
  )?.industry_code;

  const { mutate: diagnose, isPending: isDiagnosisPending } = useMutation({
    mutationFn: postDiagnoses,
    onSuccess: ({ result }) => {
      setAnalyzeId(result.analyzeId);
      router.push('/?step=2');
    },
  });

  const startDiagnosis = () => {
    if (!selectedRegionCode || !selectedIndustryCode) return;

    diagnose({
      region_code: selectedRegionCode,
      industry_code: selectedIndustryCode,
      operating_priority: operatingPriority,
      target_customer_age_code: customerAgeCodes[targetCustomerAge],
      target_monthly_sales_range: monthlySalesRanges[targetMonthlySales],
    });
  };

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
    <section className='relative w-207 max-lg:w-full'>
      <VillageIcon
        className='pointer-events-none absolute right-2 bottom-full max-lg:hidden'
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
            status={
              isIndustriesPending ? (
                <LoadingSpinner label='업종 목록을 불러오는 중입니다.' />
              ) : isIndustriesError ? (
                <ErrorState
                  message='업종 목록을 불러오지 못했습니다.'
                  onRetry={() => void refetchIndustries()}
                />
              ) : undefined
            }
          />
        )}
      </div>

      {<PreferredOperationsSection />}
      <div className='mt-10 flex justify-center'>
        <Button
          label={isDiagnosisPending ? '위험 진단 요청 중...' : '위험 진단 시작하기'}
          size='lg'
          className='w-120 max-sm:w-full'
          onClick={startDiagnosis}
          disabled={!selectedRegionCode || !selectedIndustryCode || isDiagnosisPending}
        />
      </div>
    </section>
  );
};

export default SelectionSection;
