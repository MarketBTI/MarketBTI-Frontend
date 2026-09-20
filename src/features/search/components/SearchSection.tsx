import Button from '@/shared/components/button/Button';
import Input from '@/shared/components/input/Input';

const SearchSection = () => {
  return (
    <section className='mx-auto max-w-264 w-full flex items-center gap-3'>
      <Input placeholder='시·구·군 및 업종을 입력해주세요.' />
      <Button label='검색' className='w-20' />
    </section>
  );
};

export default SearchSection;
