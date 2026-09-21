'use client';

import { Suspense, useState, type ReactNode } from 'react';
import clsx from 'clsx';
import Header from './Header';
import Sidebar from './Sidebar';

interface PublicLayoutShellProps {
  children: ReactNode;
}

const PublicLayoutShell = ({ children }: PublicLayoutShellProps) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div
      className={clsx(
        'min-h-dvh transition-[padding-left] duration-300 ease-in-out motion-reduce:transition-none max-lg:pl-0',
        isCollapsed ? 'pl-19' : 'pl-70',
      )}
    >
      <Sidebar
        isCollapsed={isCollapsed}
        onToggle={() => setIsCollapsed((collapsed) => !collapsed)}
      />
      <Suspense fallback={null}>
        <Header isCollapsed={isCollapsed} />
      </Suspense>
      <main className='min-h-dvh bg-neutral-100 px-5 pt-20 pb-5 max-lg:px-3 max-lg:pt-18 max-lg:pb-20'>
        {children}
      </main>
    </div>
  );
};

export default PublicLayoutShell;
