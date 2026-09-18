'use client';

import { useState, type ReactNode } from 'react';

import Header from '@/shared/layout/Header';
import Sidebar from '@/shared/layout/Sidebar';

const PublicLayout = ({ children }: { children: ReactNode }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className='[--sidebar-width:280px] [--sidebar-transition:250ms_ease-in-out] data-collapsed:[--sidebar-width:76px] motion-reduce:[--sidebar-transition:0ms]'
      data-collapsed={isCollapsed || undefined}
    >
      <Sidebar isCollapsed={isCollapsed} onToggle={() => setIsCollapsed((previous) => !previous)} />

      <Header />

      <main className='min-h-screen ml-(--sidebar-width) pt-[60px] bg-neutral-100 [transition:margin-left_var(--sidebar-transition)]'>
        {children}
      </main>
    </div>
  );
};

export default PublicLayout;
