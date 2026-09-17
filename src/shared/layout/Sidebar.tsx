'use client';

import {
  LogoIcon,
  SmallLogoIcon,
  SidebarMascotIcon1,
  SidebarMascotIcon2,
  SidebarMascotIcon3,
} from '@/assets';
import styles from './Sidebar.module.css';
import { BookOpen, ChartLine, MapPin, PanelLeft } from 'lucide-react';
import { usePathname } from 'next/navigation';
import SidebarTab from '../components/navigation/SidebarTab';

interface SidebarProps {
  isCollapsed: boolean;
  onToggle: () => void;
}

const Sidebar = ({ isCollapsed, onToggle }: SidebarProps) => {
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
        {isCollapsed ? (
          <button
            type='button'
            className={styles.logo_button}
            onClick={onToggle}
            aria-label='사이드바 펼치기'
            aria-expanded={false}
            aria-controls='sidebar-navigation'
          >
            <SmallLogoIcon aria-hidden='true' />
          </button>
        ) : (
          <>
            <LogoIcon />
            <button
              type='button'
              className={styles.menu_button}
              onClick={onToggle}
              aria-label='사이드바 접기'
              aria-expanded={true}
              aria-controls='sidebar-navigation'
            >
              <PanelLeft size={24} />
            </button>
          </>
        )}
      </div>
      <nav id='sidebar-navigation' className={styles.navigation} aria-label='주요 메뉴'>
        <SidebarTab
          label='상권 진단'
          icon={<ChartLine size={20} />}
          href='/'
          isCollapsed={isCollapsed}
        />
        <SidebarTab
          label='유형 사전'
          icon={<BookOpen size={20} />}
          href='/dictionary'
          isCollapsed={isCollapsed}
        />
        <SidebarTab
          label='상권 탐색'
          icon={<MapPin size={20} />}
          href='/search'
          isCollapsed={isCollapsed}
        />
      </nav>
      {!isCollapsed && (
        <div className={styles.footer}>
          <MascotIcon className={styles.mascot} aria-hidden='true' />
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
