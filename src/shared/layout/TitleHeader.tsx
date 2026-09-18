import clsx from 'clsx';

const TitleHeader = () => {
  return (
    <header className='inline-flex flex-col items-start gap-2'>
      <h1 className={clsx('text-headline1', 'm-0 text-black')}>
        희망 <span className='text-primary-900'>지역</span>과
        <span className='text-primary-900'> 업종</span>을 선택하세요.
      </h1>
      <p className='m-0 text-neutral-800'>선택한 조건으로 상권 유형을 진단합니다.</p>
    </header>
  );
};

export default TitleHeader;
