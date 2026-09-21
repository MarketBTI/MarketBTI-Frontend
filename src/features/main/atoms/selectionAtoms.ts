import { atomWithReset } from 'jotai/utils';

export const selectedRegionAtom = atomWithReset<string | null>(null);
export const selectedDistrictAtom = atomWithReset<string | null>(null);
export const selectedIndustryAtom = atomWithReset<string | null>(null);
export const operatingPriorityAtom = atomWithReset(1);
export const targetCustomerAgeAtom = atomWithReset('20대 미만');
export const targetMonthlySalesAtom = atomWithReset('500만 원 미만');
