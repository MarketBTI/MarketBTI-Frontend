'use client';

import clsx from 'clsx';
import { usePathname, useSearchParams } from 'next/navigation';
import SectionNav from '../components/navigation/SectionNav';

interface HeaderProps {
  isCollapsed: boolean;
}

const Header = ({ isCollapsed }: HeaderProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const isMainPage = pathname !== '/dictionary' && pathname !== '/search';
  const title =
    pathname === '/dictionary' ? '유형사전' : pathname === '/search' ? '상권 탐색' : '상권 진단';
  const subTitle = step === '2' ? '상권 분석' : step === '3' ? '진단 결과' : '지역 · 업종 선택';

  return (
    <header
      className={clsx(
        'fixed top-0 right-0 z-10 flex h-15 items-center border-b border-neutral-300 bg-white px-4 transition-[left] duration-300 ease-in-out motion-reduce:transition-none max-lg:left-0',
        isCollapsed ? 'left-19' : 'left-70',
      )}
    >
      <SectionNav title={title} subTitle={isMainPage ? subTitle : undefined} subStep={isMainPage} />
    </header>
  );
};

export default Header;
