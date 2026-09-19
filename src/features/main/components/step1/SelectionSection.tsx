'use client';

import { useAtom } from 'jotai';
import SelectionGroup from './SelectionGroup';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '@/features/main/atoms/selectionAtoms';
import {
  districtsByRegion,
  industryOptions,
  regionOptions,
} from '@/features/main/mocks/selectionOptions';
import { VillageIcon } from '@/assets';
import Button from '@/shared/components/button/Button';
import { useRouter } from 'next/navigation';

const SelectionSection = () => {
  const router = useRouter();

  const [selectedRegion, setSelectedRegion] = useAtom(selectedRegionAtom);
  const [selectedDistrict, setSelectedDistrict] = useAtom(selectedDistrictAtom);
  const [selectedIndustry, setSelectedIndustry] = useAtom(selectedIndustryAtom);

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
        />
        {selectedRegion && (
          <SelectionGroup
            key={selectedRegion}
            step={2}
            title='시·구·군 선택'
            options={districtsByRegion[selectedRegion]}
            selected={selectedDistrict}
            onSelect={selectDistrict}
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
