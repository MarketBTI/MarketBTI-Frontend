'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import SectionNav from '../components/navigation/SectionNav';
import styles from './Header.module.css';

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const step = searchParams.get('step');
  const isMainPage = pathname !== '/dictionary' && pathname !== '/search';
  const title = pathname === '/dictionary' ? '유형사전' : pathname === '/search' ? '상권 탐색' : '상권 진단';
  const subTitle = step === '2' ? '상권 분석' : step === '3' ? '진단 결과' : '지역 · 업종 선택';

  return (
    <header className={styles.header}>
      <SectionNav title={title} subTitle={isMainPage ? subTitle : undefined} subStep={isMainPage} />
    </header>
  );
};

export default Header;
