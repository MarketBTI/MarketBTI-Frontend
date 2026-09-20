import { getMockMarketStats } from '../mocks/marketStats';

interface MarketStatsCardProps {
  region: string;
  district: string;
  industry: string;
}

const MarketStatsCard = ({ region, district, industry }: MarketStatsCardProps) => {
  const stats = getMockMarketStats(region, district, industry);
  return (
    <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
      <p className='typo-body-1'>
        {region} {district} {industry}
      </p>
      <div className='grid grid-cols-3 rounded-lg bg-neutral-100 py-3 text-center'>
        <div className='flex flex-col gap-1'>
          <p className='text-neutral-800 typo-small-1'>영업 점포</p>
          <p className='text-primary-900 typo-body-1'>{stats.operating}개</p>
        </div>
        <div className='flex flex-col gap-1 border-x border-neutral-500'>
          <p className='text-neutral-800 typo-small-1'>최근 6개월 폐업</p>
          <p className='text-primary-900 typo-body-1'>{stats.closed}개</p>
        </div>
        <div className='flex flex-col gap-1'>
          <p className='text-neutral-800 typo-small-1'>폐업률</p>
          <p className='text-semantic-700 typo-body-1'>{stats.closureRate}%</p>
        </div>
      </div>
    </div>
  );
};

export default MarketStatsCard;
