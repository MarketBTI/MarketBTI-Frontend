import { CommonResponse } from '@/shared/types/api';

export type ResponseClosureRate = CommonResponse<{
  closedStoreCount: number | null;
  closureRate: number | null;
  operatingStoreCount: number | null;
}>;
