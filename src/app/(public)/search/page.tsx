import DistrictSection from '@/features/search/components/DistrictSection';
import SearchSection from '@/features/search/components/SearchSection';
import TitleHeader from '@/shared/layouts/TitleHeader';

const RistSearchPage = () => {
  return (
    <div className='flex min-h-[calc(100dvh-100px)] flex-col gap-10 overflow-x-auto rounded-xl bg-white p-8'>
      <TitleHeader
        title={
          <>
            <span className='text-primary-900'>지역</span>과
            <span className='text-primary-900'> 업종</span>을 검색해보세요.
          </>
        }
        subtitle='지역과 업종 기준으로 최근 6개월 현황을 확인할 수 있어요.'
      />

      <SearchSection />
      <DistrictSection />
    </div>
  );
};

export default RistSearchPage;
