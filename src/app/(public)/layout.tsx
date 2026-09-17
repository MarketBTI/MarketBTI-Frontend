import type { ReactNode } from 'react';
import Header from '@/shared/layout/Header';
import Sidebar from '@/shared/layout/Sidebar';
import styles from './layout.module.css';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <Sidebar />
      <Header />
      <main className={styles.content}>{children}</main>
    </>
  );
};

export default PublicLayout;
