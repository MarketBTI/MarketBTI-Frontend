'use client';

import { LogoIcon, SidebarMascotIcon1, SidebarMascotIcon2, SidebarMascotIcon3 } from '@/assets';
import styles from './Sidebar.module.css';
import { BookOpen, ChartNoAxesColumnIncreasing, MapPin, PanelLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarTab from '../components/navigation/SidebarTab';

const Sidebar = () => {
  const pathname = usePathname();
  const MascotIcon =
    pathname === '/dictionary'
      ? SidebarMascotIcon2
      : pathname === '/search'
        ? SidebarMascotIcon3
        : SidebarMascotIcon1;

  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo_container}>
        <LogoIcon />
        <button type='button' className={styles.menu_button} aria-label='Toggle Sidebar'>
          <PanelLeft size={24} />
        </button>
      </div>

      <nav className={styles.navigation} aria-label='주요 메뉴'>
        <SidebarTab label='상권 진단' icon={<ChartNoAxesColumnIncreasing size={20} />} href='/' />
        <SidebarTab label='유형 사전' icon={<BookOpen size={20} />} href='/dictionary' />
        <SidebarTab label='상권 탐색' icon={<MapPin size={20} />} href='/search' />
      </nav>

      <div className={styles.footer}>
        <MascotIcon className={styles.mascot} aria-hidden='true' />
      </div>
    </aside>
  );
};

export default Sidebar;
