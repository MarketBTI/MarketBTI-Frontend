import { axiosInstance } from '@/app/api/api';
import type { ResponseFindRegions } from '@/features/main/types/diagnosis';

export const getFindRegions = async (sidoName?: string): Promise<ResponseFindRegions> => {
  const { data } = await axiosInstance.get<ResponseFindRegions>('/regions', {
    params: sidoName ? { sido_name: sidoName } : undefined,
  });

  return data;
};
