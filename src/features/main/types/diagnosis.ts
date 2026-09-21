import type { CommonResponse } from '@/shared/types/api';

// region
export type SidoRegion = {
  sido_name: string;
};

export type SigunguRegion = {
  region_code: string;
  sido_name: string;
  sigungu_name: string;
};

export type ResponseFindRegions = CommonResponse<SidoRegion[] | SigunguRegion[]>;

// industry
export type Industry = {
  industry_code: string;
  industry_display_name: string;
};

export type ResponseIndustries = CommonResponse<Industry[]>;

// diagnoses
export type RequestDiagnosis = {
  region_code: string;
  industry_code: string;
  operating_priority: number;
  target_customer_age_code: number;
  target_monthly_sales_range: string;
};

export type ResponseDiagnosis = CommonResponse<{
  analyzeId: string;
  pollingIntervalMs: number;
  status: string;
}>;
