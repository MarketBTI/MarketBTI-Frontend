import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';

const ResultSection = () => {
  return (
    <section className='w-207 space-y-4'>
      <AnalysisCompletedToast />
      <TypeResult />
      <ConsumeGraph />
    </section>
  );
};

export default ResultSection;
