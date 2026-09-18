import TitleHeader from '@/shared/layout/TitleHeader';
import SelectSection from '@/features/main/components/SelectSection';

const RiskAssessmentPage = () => {
  return (
    <div className='flex min-h-[calc(100dvh-60px)] p-5'>
      <div className='@container flex-1 min-w-0 rounded-xl bg-white p-8'>
        <TitleHeader />
        <SelectSection />
      </div>
    </div>
  );
};

export default RiskAssessmentPage;
