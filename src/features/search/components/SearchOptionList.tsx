'use client';

import { BuildingComplex, MapPin } from 'lucide-react';
import Button from '@/shared/components/button/Button';

interface SearchOptionListProps {
  title: string;
  options: readonly string[];
  value: string;
  onSelect: (value: string) => void;
  industry?: boolean;
}

const SearchOptionList = ({
  title,
  options,
  value,
  onSelect,
  industry = false,
}: SearchOptionListProps) => (
  <div className='flex flex-col gap-3 rounded-xl border border-neutral-400 bg-white p-4'>
    <p className='typo-body-1'>{title}</p>
    <div className='thin-scrollbar flex max-h-54 flex-col gap-3 overflow-y-auto pr-2 pb-1'>
      {options.map((option) => (
        <Button
          key={option}
          label={option}
          icon={industry ? <BuildingComplex /> : <MapPin />}
          variant='outline'
          selected={value === option}
          onClick={() => onSelect(option)}
          className='shrink-0 justify-start! aria-pressed:bg-primary-200! aria-pressed:border-primary-600! aria-pressed:text-primary-900!'
        />
      ))}
    </div>
  </div>
);

export default SearchOptionList;
