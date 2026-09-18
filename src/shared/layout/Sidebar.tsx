'use client';

import {
  LogoIcon,
  SmallLogoIcon,
  SidebarMascotIcon1,
  SidebarMascotIcon2,
  SidebarMascotIcon3,
} from '@/assets';
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
    <aside className='fixed inset-y-0 left-0 z-10 flex w-(--sidebar-width,280px) flex-col overflow-x-clip border-0 border-r border-solid border-[#e5e7eb] bg-white px-4 pb-4 [transition:width_var(--sidebar-transition,250ms_ease-in-out)]'>
      <div className='flex h-15 shrink-0 items-center justify-between [&>svg]:shrink-0'>
        {isCollapsed ? (
          <button
            type='button'
            className='flex size-11 shrink-0 items-center justify-center rounded-lg border-0 bg-transparent p-0 hover:bg-neutral-100 hover:transition-colors hover:duration-150 hover:ease-[ease-in-out] focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary-700 focus-visible:outline-offset-2'
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
              className='flex shrink-0 place-items-center rounded-full border-0 bg-transparent p-2 text-neutral-800 transition-colors duration-150 ease-[ease-in-out] hover:bg-neutral-100 focus-visible:outline-2 focus-visible:outline-solid focus-visible:outline-primary-700 focus-visible:outline-offset-2'
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

      <nav id='sidebar-navigation' className='mt-4 flex flex-col gap-3' aria-label='주요 메뉴'>
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
        <div className='mt-auto flex shrink-0 justify-center pt-6'>
          <MascotIcon aria-hidden='true' />
        </div>
      )}
    </aside>
  );
};
export default Sidebar;
