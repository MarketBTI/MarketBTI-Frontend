import { atomWithReset } from 'jotai/utils';

export const analyzeIdAtom = atomWithReset<string | null>(null);
export const analysisCompletedToastAtom = atomWithReset(false);
