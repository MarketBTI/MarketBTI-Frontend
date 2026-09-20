import TitleHeader from '@/shared/layouts/TitleHeader';

const TypeGridSection = () => {
  return (
    <section className='rounded-xl bg-white p-8'>
      <TitleHeader
        title='16가지 상권 유형'
        subtitle='각 카드를 클릭해서 유형의 상세 정보를 확인해보세요.'
      />
    </section>
  );
};

export default TypeGridSection;
