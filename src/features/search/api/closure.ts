import { axiosInstance } from '@/app/api/api';
import { ResponseClosureRate } from '../types/closure';

export const getMarkerClosureRate = async (
  region_code: string,
  industry_code: string,
): Promise<ResponseClosureRate> => {
  const { data } = await axiosInstance.get<ResponseClosureRate>(
    `/markets/${region_code}/${industry_code}/closure-stats`,
  );

  return data;
};
