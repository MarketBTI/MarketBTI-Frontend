import { atom } from 'jotai';

export const searchValueAtom = atom('');
export const submittedSearchValueAtom = atom('');
export const selectedDistrictAtom = atom('');
export const selectedIndustryAtom = atom('');

export const submitSearchAtom = atom(null, (_get, set, value: string) => {
  set(submittedSearchValueAtom, value.trim());
  set(selectedDistrictAtom, '');
  set(selectedIndustryAtom, '');
});
