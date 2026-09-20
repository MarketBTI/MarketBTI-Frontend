import { atom } from 'jotai';
import { parseSearch } from '../utils/parseSearch';

export const searchValueAtom = atom('');
const submittedValueAtom = atom('');
export const selectedDistrictAtom = atom('');
export const selectedIndustryAtom = atom('');

export const submittedSearchValueAtom = atom(
  (get) => get(submittedValueAtom),
  (_get, set, value: string) => {
    set(submittedValueAtom, value.trim());
    const result = parseSearch(value);
    set(selectedDistrictAtom, result.kind === 'valid' ? result.conditions.district : '');
    set(selectedIndustryAtom, result.kind === 'valid' ? result.conditions.industry : '');
  },
);
export const searchResultAtom = atom((get) => parseSearch(get(submittedValueAtom)));
