import TypeResult from './TypeResult';
import AnalysisCompletedToast from './AnalysisCompletedToast';
import ConsumeGraph from './ConsumeGraph';
import RiskSignal from './RiskSignal';
import Button from '@/shared/components/button/Button';
import { Download, RotateCw } from 'lucide-react';

const ResultSection = () => {
  return (
    <section className='w-207'>
      <AnalysisCompletedToast />
      <TypeResult />
      <div className='flex items-stretch gap-4 mt-4 mb-10'>
        <ConsumeGraph />
        <RiskSignal />
      </div>

      <div className='grid grid-cols-2 gap-3'>
        <Button label='다시 진단하기' icon={<RotateCw />} size='lg' variant='outline' />
        <Button label='PDF로 다운받기' icon={<Download />} size='lg' />
      </div>
    </section>
  );
};

export default ResultSection;
