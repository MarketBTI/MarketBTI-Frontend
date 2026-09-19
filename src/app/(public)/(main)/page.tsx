import TitleHeader from '@/shared/layouts/TitleHeader';

const page = () => {
  return (
    <div className='min-h-[calc(100dvh-100px)] rounded-xl bg-white p-8 space-y-10'>
      <TitleHeader
        title={
          <>
            희망 <span className='text-primary-900'>지역</span>과
            <span className='text-primary-900'> 업종</span>을 선택하세요.
          </>
        }
        subtitle='선택한 조건으로 상권 유형을 진단합니다.'
      />
    </div>
  );
};

export default page;
