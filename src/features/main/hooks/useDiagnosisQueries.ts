'use client';

import { useQuery } from '@tanstack/react-query';
import {
  getDiagnosesResult,
  getDiagnosesStatus,
  getFindIndustries,
  getFindRegions,
} from '@/features/main/api/diagnosis';
import type { SidoRegion, SigunguRegion } from '@/features/main/types/diagnosis';

const STALE_TIME = 1000 * 60 * 5;
const GC_TIME = 1000 * 60 * 10;
type Region = SidoRegion | SigunguRegion;

const isSidoRegion = (region: Region): region is SidoRegion => !('sigungu_name' in region);
const isSigunguRegion = (region: Region): region is SigunguRegion => 'sigungu_name' in region;

export const useSidoRegionsQuery = () =>
  useQuery({
    queryKey: ['regions', 'sido'],
    queryFn: () => getFindRegions(),
    select: (response) => {
      const regions: Region[] = response.result;
      return regions.filter(isSidoRegion);
    },
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useSigunguRegionsQuery = (sidoName: string | null) =>
  useQuery({
    queryKey: ['regions', 'sigungu', sidoName],
    queryFn: () => getFindRegions(sidoName ?? undefined),
    select: (response) => {
      const regions: Region[] = response.result;
      return regions.filter(isSigunguRegion);
    },
    enabled: Boolean(sidoName),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useIndustriesQuery = (regionCode?: string) =>
  useQuery({
    queryKey: ['industries', regionCode],
    queryFn: () => getFindIndustries(regionCode ?? ''),
    select: (response) => response.result,
    enabled: Boolean(regionCode),
    staleTime: STALE_TIME,
    gcTime: GC_TIME,
  });

export const useDiagnosisStatusQuery = (analyzeId: string | null) =>
  useQuery({
    queryKey: ['diagnoses', analyzeId, 'status'],
    queryFn: () => getDiagnosesStatus(analyzeId ?? ''),
    enabled: Boolean(analyzeId),
    refetchInterval: ({ state }) =>
      state.data?.result.status === 'Pending' ? 1000 : false,
  });

export const useDiagnosisResultQuery = (analyzeId: string | null) =>
  useQuery({
    queryKey: ['diagnoses', analyzeId, 'result'],
    queryFn: () => getDiagnosesResult(analyzeId ?? ''),
    enabled: Boolean(analyzeId),
  });
