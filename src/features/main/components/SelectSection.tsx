'use client';

import { useState } from 'react';
import styles from '../styles/SelectSection.module.css';
import { districtsByRegion, industryOptions, regionOptions } from '../data/selectionOptions';
import SelectionGroup from './SelectionGroup';

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
    <div className={styles.select_section}>
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
  );
};

export default SelectSection;
