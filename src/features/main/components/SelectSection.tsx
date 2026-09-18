'use client';

import { useState } from 'react';
import { VillageIcon } from '@/assets';
import { districtsByRegion, industryOptions, regionOptions } from '../data/selectionOptions';
import SelectionGroup from './SelectionGroup';
import IndicatorSection from './IndicatorSection';
import Button from '@/shared/components/button/Button';

const SelectSection = () => {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [selectedDistrict, setSelectedDistrict] = useState<string | null>(null);
  const [selectedIndustry, setSelectedIndustry] = useState<string | null>(null);

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
    <div className='mt-10 grid grid-cols-[minmax(200px,1fr)_minmax(0,828px)_minmax(200px,1fr)] items-start gap-x-6 gap-y-10 @max-[1100px]:mt-25 @max-[1100px]:grid-cols-[minmax(0,828px)] @max-[1100px]:justify-center'>
      <div className='relative col-start-2 flex min-w-0 max-w-207 flex-col gap-5 @max-[1100px]:col-start-1'>
        <VillageIcon
          className='pointer-events-none absolute top-0 right-2 w-[30%] -translate-y-full'
          aria-hidden='true'
          focusable='false'
        />
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
      <IndicatorSection
        selectedRegion={selectedRegion}
        selectedDistrict={selectedDistrict}
        selectedIndustry={selectedIndustry}
      />
      <Button
        label='위험 진단 시작하기'
        size='lg'
        className='col-span-full w-120 max-w-full justify-self-center'
        disabled={!selectedRegion || !selectedDistrict || !selectedIndustry}
      />
    </div>
  );
};

export default SelectSection;
