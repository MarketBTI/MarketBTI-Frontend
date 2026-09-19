import Button from '@/shared/components/button/Button';
import clsx from 'clsx';
import { useId } from 'react';

interface SelectionGroupProps {
  step: number;
  title: string;
  options: readonly string[];
  selected: string | null;
  onSelect: (value: string) => void;
}

const SelectionGroup = ({ step, title, options, selected, onSelect }: SelectionGroupProps) => {
  const titleId = useId();

  return (
    <div
      aria-labelledby={titleId}
      className={clsx(
        'flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white shadow-[0_4px_12px_0_rgba(0,0,0,0.15)] px-5 py-6',
        step === 1 ? 'h-60' : 'h-49',
      )}
    >
      <article className='flex shrink-0 items-center gap-2'>
        <span
          aria-hidden='true'
          className='flex size-6 shrink-0 items-center justify-center rounded-full bg-primary-800 typo-subtitle-2 text-white'
        >
          {step}
        </span>
        <h2 id={titleId} className='m-0 typo-subtitle-2 text-black'>
          {title}
        </h2>
      </article>

      <article
        className={clsx(
          'grid min-h-0 flex-1 gap-3 overflow-y-auto overscroll-contain thin-scrollbar py-1',
          step === 1 ? 'grid-cols-5' : 'grid-cols-6',
        )}
      >
        {options.map((item) => (
          <Button
            key={item}
            label={item}
            selected={selected === item}
            onClick={() => onSelect(item)}
            variant='selection'
            size='md'
            className='w-full min-w-0'
          />
        ))}
      </article>
    </div>
  );
};

export default SelectionGroup;
