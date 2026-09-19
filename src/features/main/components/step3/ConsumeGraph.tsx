'use client';

import { useAtomValue } from 'jotai';
import {
  selectedDistrictAtom,
  selectedIndustryAtom,
  selectedRegionAtom,
} from '@/features/main/atoms/selectionAtoms';

const ConsumeGraph = () => {
  const selectedRegion = useAtomValue(selectedRegionAtom);
  const selectedDistrict = useAtomValue(selectedDistrictAtom);
  const selectedIndustry = useAtomValue(selectedIndustryAtom);

  return (
    <section className='rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] p-4'>
      <h1 className='text-black typo-subtitle-1'>
        {selectedRegion} {selectedDistrict} · {selectedIndustry} 소비 흐름
      </h1>
    </section>
  );
};

export default ConsumeGraph;
