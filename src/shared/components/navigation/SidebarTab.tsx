'use client';

import type { ReactNode } from 'react';
import * as styles from './SidebarTab.css';

interface SidebarTabProps {
  type?: 'button' | 'submit' | 'reset';
  onClick?: () => void;
  label: string;
  icon: ReactNode;
  isCollapsed?: boolean;
}

const SidebarTab = ({
  type = 'button',
  onClick,
  label,
  icon,
  isCollapsed = false,
}: SidebarTabProps) => {
  return (
    <button
      type={type}
      aria-label={label}
      onClick={onClick}
      className={styles.sidebarTab}
      data-collapsed={isCollapsed || undefined}
    >
      <span className={styles.icon} aria-hidden='true'>
        {icon}
      </span>
      {!isCollapsed && <span>{label}</span>}
    </button>
  );
};

export default SidebarTab;
