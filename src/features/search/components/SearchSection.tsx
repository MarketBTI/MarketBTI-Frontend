'use client';

import { useAtom, useSetAtom } from 'jotai';
import {
  searchValueAtom,
  submittedSearchValueAtom,
} from '@/features/search/atoms/searchAtoms';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

const SearchSection = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const setSubmittedSearchValue = useSetAtom(submittedSearchValueAtom);

  return (
    <form
      className='mx-auto flex w-full max-w-264 items-center gap-3'
      onSubmit={(event) => {
        event.preventDefault();
        setSubmittedSearchValue(searchValue.trim());
      }}
    >
      <Input
        value={searchValue}
        onChange={setSearchValue}
        placeholder='시·구·군 및 업종을 입력해주세요.'
      />
      <Button type='submit' label='검색' className='w-20' />
    </form>
  );
};

export default SearchSection;
