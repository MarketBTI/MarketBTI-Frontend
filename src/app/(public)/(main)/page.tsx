import IndicatorSection from '@/features/main/components/IndicatorSection';
import SelectionSection from '@/features/main/components/step1/SelectionSection';
import DiagnosingSection from '@/features/main/components/step2/DiagnosingSection';
import ResultSection from '@/features/main/components/step3/ResultSection';
import TitleHeader from '@/shared/layouts/TitleHeader';

const MainPage = async ({ searchParams }: PageProps<'/'>) => {
  const { step } = await searchParams;
  const currentStep = step === '2' ? 2 : step === '3' ? 3 : 1;

  return (
    <div className='relative flex min-h-[calc(100dvh-100px)] flex-col gap-10 rounded-xl bg-white p-8'>
      {currentStep === 1 && (
        <TitleHeader
          title={
            <>
              희망 <span className='text-primary-900'>지역</span>과
              <span className='text-primary-900'> 업종</span>을 선택하세요.
            </>
          }
          subtitle='선택한 조건으로 상권 유형을 진단합니다.'
        />
      )}

      {currentStep === 3 && (
        <TitleHeader
          title='상권 진단 결과'
          subtitle='2026년 1월 - 6월 소비데이터 기준 선택한 상권의 분석 결과입니다.'
        />
      )}

      <div className='flex flex-1 justify-center'>
        {currentStep === 1 && <SelectionSection />}
        {currentStep === 2 && <DiagnosingSection />}
        {currentStep === 3 && <ResultSection />}
      </div>

      <IndicatorSection currentStep={currentStep} />
    </div>
  );
};

export default MainPage;
