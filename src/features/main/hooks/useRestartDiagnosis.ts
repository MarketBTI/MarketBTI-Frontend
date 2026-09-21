'use client';

import { useRouter } from 'next/navigation';
import { useResetAtom } from 'jotai/utils';
import {
  operatingPriorityAtom,
  selectedRegionAtom,
  selectedDistrictAtom,
  selectedIndustryAtom,
  targetCustomerAgeAtom,
  targetMonthlySalesAtom,
} from '@/features/main/atoms/selectionAtoms';
import { analyzeIdAtom, analysisCompletedToastAtom } from '@/features/main/atoms/analysisAtoms';

const useRestartDiagnosis = () => {
  const router = useRouter();
  const resetSelectedRegion = useResetAtom(selectedRegionAtom);
  const resetSelectedDistrict = useResetAtom(selectedDistrictAtom);
  const resetSelectedIndustry = useResetAtom(selectedIndustryAtom);
  const resetOperatingPriority = useResetAtom(operatingPriorityAtom);
  const resetTargetCustomerAge = useResetAtom(targetCustomerAgeAtom);
  const resetTargetMonthlySales = useResetAtom(targetMonthlySalesAtom);
  const resetAnalyzeId = useResetAtom(analyzeIdAtom);
  const resetAnalysisCompletedToast = useResetAtom(analysisCompletedToastAtom);

  const handleRestart = () => {
    resetSelectedRegion();
    resetSelectedDistrict();
    resetSelectedIndustry();
    resetOperatingPriority();
    resetTargetCustomerAge();
    resetTargetMonthlySales();
    resetAnalyzeId();
    resetAnalysisCompletedToast();
    router.replace('/?step=1');
  };

  return handleRestart;
};

export default useRestartDiagnosis;
