import clsx from 'clsx';
import { useId } from 'react';
import Button from '@/shared/components/button/Button';

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
    <section
      aria-labelledby={titleId}
      className={clsx(
        'flex max-w-[828px] flex-col gap-3 rounded-lg border border-solid border-neutral-400 px-5 py-6 shadow-[0_4px_12px_0_rgb(0_0_0/0.15)]',
        step === 1 ? 'h-[233px]' : 'h-[190px]',
      )}
    >
      <div className={clsx('text-subtitle2', 'flex shrink-0 items-center gap-2')}>
        <span
          aria-hidden='true'
          className='flex size-6 items-center justify-center rounded-full bg-primary-800 text-white'
        >
          {step}
        </span>
        <h2 id={titleId} className='m-0 text-black [font:inherit]'>
          {title}
        </h2>
      </div>
      <div
        className={clsx(
          'grid min-h-0 flex-1 auto-rows-[44px] content-start gap-3 overflow-y-auto p-0.5 pr-2',
          step === 1 ? 'grid-cols-5' : 'grid-cols-6',
          'thin-scrollbar',
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
            className='min-w-0 px-1! whitespace-normal! [overflow-wrap:anywhere]'
          />
        ))}
      </div>
    </section>
  );
};

export default SelectionGroup;
