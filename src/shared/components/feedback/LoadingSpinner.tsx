import { LoaderCircle } from 'lucide-react';

type LoadingSpinnerProps = {
  label?: string;
};

const LoadingSpinner = ({ label = '불러오는 중입니다.' }: LoadingSpinnerProps) => (
  <div className='flex flex-col items-center justify-center gap-2 text-neutral-700' role='status'>
    <LoaderCircle
      size={28}
      className='animate-spin text-primary-700 motion-reduce:animate-none'
      aria-hidden='true'
    />
    <span className='typo-body-2'>{label}</span>
  </div>
);

export default LoadingSpinner;
