'use client';

import { useAtom, useSetAtom } from 'jotai';
import { searchValueAtom, submitSearchAtom } from '@/features/search/atoms/searchAtoms';
import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

const SearchSection = () => {
  const [searchValue, setSearchValue] = useAtom(searchValueAtom);
  const submitSearch = useSetAtom(submitSearchAtom);

  return (
    <form
      className='mx-auto flex w-full max-w-264 items-center gap-3 max-sm:flex-col'
      onSubmit={(event) => {
        event.preventDefault();
        submitSearch(searchValue);
      }}
    >
      <Input
        value={searchValue}
        onChange={setSearchValue}
        placeholder='시·구·군 및 업종명을 정확히 입력해주세요.'
      />
      <Button type='submit' label='검색' className='w-20 max-sm:w-full' />
    </form>
  );
};

export default SearchSection;
