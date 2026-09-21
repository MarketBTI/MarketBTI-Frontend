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
