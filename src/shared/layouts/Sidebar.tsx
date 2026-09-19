'use client';

import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import {
  LogoIcon,
  SmallLogoIcon,
  SidebarMascotIcon1,
  SidebarMascotIcon2,
  SidebarMascotIcon3,
} from '@/assets';
import { BookOpen, ChartLine, MapPin, PanelLeft } from 'lucide-react';
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
    <aside
      className={clsx(
        'fixed inset-y-0 left-0 z-20 flex h-dvh flex-col overflow-x-hidden overflow-y-auto border-r border-neutral-300 bg-white transition-[width] duration-300 ease-in-out motion-reduce:transition-none',
        isCollapsed ? 'w-19' : 'w-70',
      )}
    >
      <div
        className={clsx('flex h-15 shrink-0 items-center', isCollapsed ? 'px-2.5' : 'pl-4 pr-2.5')}
      >
        {isCollapsed ? (
          <button
            type='button'
            className='flex shrink-0 items-center justify-center rounded-3xl border-0 py-1 px-2 transition-colors hover:bg-neutral-100 ml-1'
            aria-label='사이드바 펼치기'
            aria-expanded={false}
            aria-controls='sidebar-navigation'
            onClick={onToggle}
          >
            <SmallLogoIcon />
          </button>
        ) : (
          <>
            <div className='flex min-w-0 flex-1 items-center'>
              <LogoIcon />
            </div>
            <button
              type='button'
              className='shrink-0 rounded-3xl border-0 bg-transparent p-1.5 text-neutral-800 transition-colors hover:bg-neutral-100'
              aria-label='사이드바 접기'
              aria-expanded={true}
              aria-controls='sidebar-navigation'
              onClick={onToggle}
            >
              <PanelLeft size={24} />
            </button>
          </>
        )}
      </div>

      <nav id='sidebar-navigation' aria-label='주요 메뉴' className='flex flex-col gap-3 px-4 mt-4'>
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

      <div
        className={clsx(
          'mt-auto shrink-0 flex items-center justify-center pb-4 transition-opacity duration-200 ease-in-out motion-reduce:transition-none',
          isCollapsed ? 'pointer-events-none opacity-0' : 'opacity-100',
        )}
        aria-hidden={isCollapsed}
      >
        <MascotIcon />
      </div>
    </aside>
  );
};

export default Sidebar;
