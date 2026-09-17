'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './SidebarTab.css';

interface SidebarTabProps {
  label: string;
  icon: ReactNode;
  href: string;
}

const SidebarTab = ({ label, icon, href }: SidebarTabProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={styles.sidebarTab}
      data-active={isActive || undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.icon} aria-hidden='true'>
        {icon}
      </span>
      <span>{label}</span>
    </Link>
  );
};

export default SidebarTab;
