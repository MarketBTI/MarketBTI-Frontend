'use client';

import { LogoIcon } from '@/assets';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <LogoIcon />
    </aside>
  );
};

export default Sidebar;
