import type { Ref } from 'react';

interface VolatilityAlertProps {
  ref: Ref<HTMLDivElement>;
  month: number;
  day: number;
}

const VolatilityAlert = ({ ref, month, day }: VolatilityAlertProps) => (
  <div
    ref={ref}
    className='pointer-events-none invisible absolute z-10'
    aria-label={month + '월 ' + day + '일 변동성 경보'}
  >
    <span className='absolute -left-3 -top-3 flex size-6 items-center justify-center rounded-full bg-semantic-100/70'>
      <span className='size-2 rounded-full border border-semantic-600 bg-white' />
    </span>
    <span className='absolute left-(--label-left) top-(--label-top) flex p-2 items-center justify-center whitespace-nowrap rounded-lg bg-semantic-100 typo-small-1 text-semantic-700'>
      변동성 경보
    </span>
  </div>
);

export default VolatilityAlert;
