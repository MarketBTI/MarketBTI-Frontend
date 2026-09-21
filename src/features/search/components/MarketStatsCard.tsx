'use client';

import { useQuery } from '@tanstack/react-query';
import { getMarkerClosureRate } from '@/features/search/api/closure';

export interface MarketStatsCardProps {
  region: string;
  district: string;
  industry: string;
  regionCode: string;
  industryCode: string;
}

const MarketStatsCard = ({
  region,
  district,
  industry,
  regionCode,
  industryCode,
}: MarketStatsCardProps) => {
  const { data, isPending, isError } = useQuery({
    queryKey: ['markets', regionCode, industryCode, 'closure-stats'],
    queryFn: () => getMarkerClosureRate(regionCode, industryCode),
  });
  const stats = data?.result;
  const formatCount = (value?: number | null) =>
    isError || value == null ? '-' : `${value.toLocaleString()}개`;
  const closureRate =
    isError || stats?.closureRate == null
      ? '-'
      : `${stats.closureRate.toLocaleString('ko-KR', { maximumFractionDigits: 1 })}%`;
  const hasNoStats =
    !isPending &&
    !isError &&
    stats?.operatingStoreCount == null &&
    stats?.closedStoreCount == null &&
    stats?.closureRate == null;

  return (
    <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
      <p className='typo-body-1'>
        {region} {district} {industry}
      </p>
      {isPending ? (
        <div
          className='flex h-16 items-center justify-center rounded-lg bg-neutral-100'
          role='status'
          aria-label='폐업률 정보 로딩 중'
        >
          <span
            className='size-5 animate-spin rounded-full border-3 border-neutral-600 border-t-primary-700 motion-reduce:animate-none'
            aria-hidden='true'
          />
        </div>
      ) : (
        <div className='grid h-16 grid-cols-[1fr_1.25fr_1fr] rounded-lg bg-neutral-100 text-center'>
          <div className='flex flex-col justify-center gap-1 px-2'>
            <p className='text-neutral-800 typo-small-1'>영업 점포</p>
            <p className='text-primary-900 typo-body-1'>
              {formatCount(stats?.operatingStoreCount)}
            </p>
          </div>
          <div className='flex flex-col justify-center gap-1 border-x-2 border-neutral-500'>
            <p className='text-neutral-800 typo-small-1'>최근 6개월 폐업</p>
            <p className='text-primary-900 typo-body-1'>{formatCount(stats?.closedStoreCount)}</p>
          </div>
          <div className='flex flex-col justify-center gap-1 px-2'>
            <p className='text-neutral-800 typo-small-1'>폐업률</p>
            <p className='text-semantic-700 typo-body-1'>{closureRate}</p>
          </div>
        </div>
      )}
      {hasNoStats && (
        <p className='text-center text-semantic-700 typo-caption-2' role='status'>
          폐업 정보를 표시할 데이터가 부족합니다.
        </p>
      )}
    </div>
  );
};

export default MarketStatsCard;
