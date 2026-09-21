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

export type ResponseDiagnosisStatus = CommonResponse<{
  analyzeId: string;
  status: string;
}>;

export type DiagnosisAxisName = 'growth' | 'customer' | 'spend' | 'stability';

export type DiagnosisAxis = {
  axis: DiagnosisAxisName;
  code: string;
  description: string;
  threshold: number;
  value: number;
};

export type DiagnosisConsumptionFlow = {
  amount: number;
  changeAmount: number | null;
  changeRate: number | null;
  yearMonth: string;
};

export type DiagnosisMarket = {
  customer_axis: string;
  growth_axis: string;
  growth_score: number;
  industry_code: string;
  industry_display_name: string;
  market_bti: string;
  region_code: string;
  sido_name: string;
  sigungu_name: string;
  spend_axis: string;
  stability_axis: string;
  type_name: string;
  volatility_score: number;
};

export type DiagnosisVolatilityDirection = 'INCREASE' | 'DECREASE' | 'UNCHANGED';

export type DiagnosisVolatility = {
  changeAmount: number;
  changeRate: number;
  direction: DiagnosisVolatilityDirection;
  warningMonth: string;
};

export type DiagnosisResult = {
  analyzeId: string;
  axes: DiagnosisAxis[];
  consumptionFlow: DiagnosisConsumptionFlow[];
  interpretation: string;
  interpretation_method: string;
  market: DiagnosisMarket;
  risk_signals: string[];
  score?: number;
  volatility: DiagnosisVolatility;
};

export type ResponseDiagnosisResult = CommonResponse<DiagnosisResult | null>;
