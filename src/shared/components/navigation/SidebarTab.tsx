'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import * as styles from './SidebarTab.css';

interface SidebarTabProps {
  label: string;
  icon: ReactNode;
  href: string;
  isCollapsed?: boolean;
}

const SidebarTab = ({ label, icon, href, isCollapsed = false }: SidebarTabProps) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={styles.sidebarTab}
      data-active={isActive || undefined}
      data-collapsed={isCollapsed || undefined}
      aria-label={label}
      title={isCollapsed ? label : undefined}
      aria-current={isActive ? 'page' : undefined}
    >
      <span className={styles.icon} aria-hidden='true'>
        {icon}
      </span>
      {!isCollapsed && <span>{label}</span>}
    </Link>
  );
};

export default SidebarTab;
