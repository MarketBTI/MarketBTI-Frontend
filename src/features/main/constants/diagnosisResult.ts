import type { StaticImageData } from 'next/image';
import DBFS from '@/assets/image/DBFS.webp';
import DBFV from '@/assets/image/DBFV.webp';
import DBPS from '@/assets/image/DBPS.webp';
import DBPV from '@/assets/image/DBPV.webp';
import DCFS from '@/assets/image/DCFS.webp';
import DCFV from '@/assets/image/DCFV.webp';
import DCPS from '@/assets/image/DCPS.webp';
import DCPV from '@/assets/image/DCPV.webp';
import GBFS from '@/assets/image/GBFS.webp';
import GBFV from '@/assets/image/GBFV.webp';
import GBPS from '@/assets/image/GBPS.webp';
import GBPV from '@/assets/image/GBPV.webp';
import GCFS from '@/assets/image/GCFS.webp';
import GCFV from '@/assets/image/GCFV.webp';
import GCPS from '@/assets/image/GCPS.webp';
import GCPV from '@/assets/image/GCPV.webp';
import type { DiagnosisAxisName } from '@/features/main/types/diagnosis';

export const marketBtiCharacters: Record<string, StaticImageData> = {
  DBFS,
  DBFV,
  DBPS,
  DBPV,
  DCFS,
  DCFV,
  DCPS,
  DCPV,
  GBFS,
  GBFV,
  GBPS,
  GBPV,
  GCFS,
  GCFV,
  GCPS,
  GCPV,
};

export const axisOptions: Record<
  DiagnosisAxisName,
  Record<string, { label: string; oppositeCode: string; oppositeLabel: string }>
> = {
  growth: {
    G: { label: '성장형', oppositeCode: 'D', oppositeLabel: '쇠퇴형' },
    D: { label: '쇠퇴형', oppositeCode: 'G', oppositeLabel: '성장형' },
  },
  customer: {
    C: { label: '편중형', oppositeCode: 'B', oppositeLabel: '균형형' },
    B: { label: '균형형', oppositeCode: 'C', oppositeLabel: '편중형' },
  },
  spend: {
    F: { label: '빈도형', oppositeCode: 'P', oppositeLabel: '객단가형' },
    P: { label: '객단가형', oppositeCode: 'F', oppositeLabel: '빈도형' },
  },
  stability: {
    V: { label: '변동형', oppositeCode: 'S', oppositeLabel: '안정형' },
    S: { label: '안정형', oppositeCode: 'V', oppositeLabel: '변동형' },
  },
};

const higherValueCodes = new Set(['G', 'C', 'F', 'V']);

export const getSelectedAxisPercent = (code: string, value: number, threshold: number) => {
  if (threshold === 0) return 50;

  const higherValuePercent = Math.min(100, Math.max(0, (value / threshold) * 50));
  const selectedPercent = higherValueCodes.has(code)
    ? higherValuePercent
    : 100 - higherValuePercent;

  return Math.round(Math.max(50, selectedPercent));
};
