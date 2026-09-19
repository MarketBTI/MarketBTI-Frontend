import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';
import RiskSignal from './RiskSignal';

const ResultSection = () => {
  return (
    <section className='w-207 space-y-4'>
      <AnalysisCompletedToast />
      <TypeResult />
      <div className='flex items-stretch gap-4'>
        <ConsumeGraph />
        <RiskSignal />
      </div>
    </section>
  );
};

export default ResultSection;
