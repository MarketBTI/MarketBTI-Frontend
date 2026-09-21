import type { CommonResponse } from '@/shared/types/api';

export type SidoRegion = {
  sido_name: string;
};

export type SigunguRegion = {
  region_code: string;
  sido_name: string;
  sigungu_name: string;
};

export type ResponseFindRegions = CommonResponse<SidoRegion[] | SigunguRegion[]>;
