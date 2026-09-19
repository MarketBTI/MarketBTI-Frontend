import SelectionSection from '@/features/main/components/step1/SelectionSection';
import TitleHeader from '@/shared/layouts/TitleHeader';

const page = () => {
  return (
    <div className='flex min-h-[calc(100dvh-100px)] flex-col gap-10 rounded-xl bg-white p-8'>
      <TitleHeader
        title={
          <>
            희망 <span className='text-primary-900'>지역</span>과
            <span className='text-primary-900'> 업종</span>을 선택하세요.
          </>
        }
        subtitle='선택한 조건으로 상권 유형을 진단합니다.'
      />
      <div className='flex flex-1 justify-center'>
        <SelectionSection />
      </div>
    </div>
  );
};

export default page;
