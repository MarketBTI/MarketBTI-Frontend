'use client';

import { useRouter } from 'next/navigation';
import { useResetAtom } from 'jotai/utils';
import {
  selectedRegionAtom,
  selectedDistrictAtom,
  selectedIndustryAtom,
} from '@/features/main/atoms/selectionAtoms';
import { analysisCompletedToastAtom } from '@/features/main/atoms/analysisAtoms';

const useRestartDiagnosis = () => {
  const router = useRouter();
  const resetSelectedRegion = useResetAtom(selectedRegionAtom);
  const resetSelectedDistrict = useResetAtom(selectedDistrictAtom);
  const resetSelectedIndustry = useResetAtom(selectedIndustryAtom);
  const resetAnalysisCompletedToast = useResetAtom(analysisCompletedToastAtom);

  const handleRestart = () => {
    resetSelectedRegion();
    resetSelectedDistrict();
    resetSelectedIndustry();
    resetAnalysisCompletedToast();
    router.replace('/?step=1');
  };

  return handleRestart;
};

export default useRestartDiagnosis;
