import { CircleAlert } from 'lucide-react';
import Button from '@/shared/components/button/Button';

type ErrorStateProps = {
  message?: string;
  onRetry?: () => void;
};

const ErrorState = ({ message = '정보를 불러오지 못했습니다.', onRetry }: ErrorStateProps) => (
  <div
    className='flex flex-col items-center justify-center gap-3 px-4 py-3 text-semantic-700'
    role='alert'
  >
    <div className='flex items-center gap-2'>
      <CircleAlert size={20} className='shrink-0' aria-hidden='true' />
      <span className='typo-body-2'>{message}</span>
    </div>

    {onRetry && (
      <Button label='다시 시도' size='sm' variant='outline' onClick={onRetry} className='w-30' />
    )}
  </div>
);

export default ErrorState;
