import { CommonResponse } from '@/shared/types/api';

export type ResponseClosureRate = CommonResponse<{
  closedStoreCount: number;
  closureRate: number;
  operatingStoreCount: number;
}>;
