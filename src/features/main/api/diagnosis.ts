import { axiosInstance } from '@/app/api/api';
import type {
  RequestDiagnosis,
  ResponseDiagnosis,
  ResponseDiagnosisResult,
  ResponseDiagnosisStatus,
  ResponseFindRegions,
  ResponseIndustries,
} from '@/features/main/types/diagnosis';

export const getFindRegions = async (sidoName?: string): Promise<ResponseFindRegions> => {
  const { data } = await axiosInstance.get<ResponseFindRegions>('/regions', {
    params: sidoName ? { sido_name: sidoName } : undefined,
  });

  return data;
};

export const getFindIndustries = async (regionCode: string): Promise<ResponseIndustries> => {
  const { data } = await axiosInstance.get<ResponseIndustries>('/industries', {
    params: { region_code: regionCode },
  });

  return data;
};

export const postDiagnoses = async (body: RequestDiagnosis): Promise<ResponseDiagnosis> => {
  const { data } = await axiosInstance.post<ResponseDiagnosis>('/diagnoses', body);

  return data;
};

export const getDiagnosesStatus = async (analyze_id: string): Promise<ResponseDiagnosisStatus> => {
  const { data } = await axiosInstance.get<ResponseDiagnosisStatus>(
    `/diagnoses/${analyze_id}/status`,
  );

  return data;
};

export const getDiagnosesResult = async (analyze_id: string): Promise<ResponseDiagnosisResult> => {
  const { data } = await axiosInstance.get<ResponseDiagnosisResult>(
    `/diagnoses/${analyze_id}/result`,
  );

  return data;
};
