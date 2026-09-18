'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import SectionNav from '../components/navigation/SectionNav';

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const isMainPage = pathname !== '/dictionary' && pathname !== '/search';
  const title =
    pathname === '/dictionary' ? '유형사전' : pathname === '/search' ? '상권 탐색' : '상권 진단';
  const subTitle = step === '2' ? '상권 분석' : step === '3' ? '진단 결과' : '지역 · 업종 선택';

  return (
    <header className='fixed top-0 right-0 left-(--sidebar-width,280px) z-10 flex h-15 items-center border-0 border-b border-solid border-[#e5e7eb] bg-white px-4 [transition:left_var(--sidebar-transition,250ms_ease-in-out)]'>
      <SectionNav title={title} subTitle={isMainPage ? subTitle : undefined} subStep={isMainPage} />
    </header>
  );
};

export default Header;
