'use client';

import { useEffect } from 'react';
import { useAtom, useSetAtom } from 'jotai';
import {
  debouncedSearchValueAtom,
  searchValueAtom,
} from '@/features/search/atoms/searchAtoms';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

const SearchSection = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const setDebouncedSearchValue = useSetAtom(debouncedSearchValueAtom);

  useEffect(() => {
    const timeoutId = window.setTimeout(() => {
      setDebouncedSearchValue(searchValue.trim());
    }, 300);

    return () => window.clearTimeout(timeoutId);
  }, [searchValue, setDebouncedSearchValue]);

  return (
    <section className='mx-auto max-w-264 w-full flex items-center gap-3'>
      <Input
        value={searchValue}
        onChange={setSearchValue}
        placeholder='시·구·군 및 업종을 입력해주세요.'
      />
      <Button label='검색' className='w-20' />
    </section>
  );
};

export default SearchSection;
