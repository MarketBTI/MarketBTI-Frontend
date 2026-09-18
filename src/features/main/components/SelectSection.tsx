'use client';

import { useState } from 'react';
import { VillageIcon } from '@/assets';
import styles from '../styles/SelectSection.module.css';
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
    <div className={styles.selection_layout}>
      <div className={styles.select_section}>
        <VillageIcon className={styles.village} aria-hidden='true' focusable='false' />
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
        className={styles.start_button}
        disabled={!selectedRegion || !selectedDistrict || !selectedIndustry}
      />
    </div>
  );
};

export default SelectSection;
