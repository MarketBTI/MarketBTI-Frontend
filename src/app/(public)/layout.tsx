'use client';

import { useState, type ReactNode } from 'react';

import Header from '@/shared/layout/Header';
import Sidebar from '@/shared/layout/Sidebar';
import styles from './layout.module.css';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className={styles.layout} data-collapsed={isCollapsed || undefined}>
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed((previous) => !previous)} />

      <Header />

      <main className={styles.content}>{children}</main>
    </div>
  );
};

export default PublicLayout;
