import { atomWithReset } from 'jotai/utils';

export const selectedRegionAtom = atomWithReset<string | null>(null);
export const selectedDistrictAtom = atomWithReset<string | null>(null);
export const selectedIndustryAtom = atomWithReset<string | null>(null);
