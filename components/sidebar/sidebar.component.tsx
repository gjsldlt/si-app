import styles from './sidebar.module.scss';
import { useRouter } from 'next/router';

import { RouteItem } from '../../types/MasterTypes.types';
import { accessUserInSession, clearUserSession } from "../../services/user.service";
import { useEffect, useState } from 'react';

export default function Sidebar({ onRouteClick, routes, show }: SidebarProps) {
  let authorizedUser = accessUserInSession();
  const router = useRouter();
  const tailwindClasses = {
    sidebar: 'twind-sidebar transition-all duration-500 shadow-lg fixed right-0 min-h-full sm:fixed sm:left-0 z-[100] bg-sidebar text-grey1 overflow-hidden shadow-2xl flex-col',
    sidebarMax: 'w-sidebar-width',
    sidebarMin: 'w-sidebar-min translate-x-full sm:translate-x-0',
    menuItem: 'transition-all duration-500 box-border flex items-center overflow-hidden break-words h-45 cursor-pointer hover:text-current',
    menuActive: 'text-current',
    name: 'transition-all duration-500 break-normal whitespace-nowrap overflow-hidden flex-1 ',
    nameMin: '-translate-x-full opacity-0 ml-0',
    nameMax: 'translate-x-0 ml-5',
    icon: 'transition-all duration-500 flex items-center justify-center w-sidebar-min',
    iconMin: 'h-45',
    iconMax: 'h-auto',
    activeStateBar: 'transition-all duration-500 h-active-border-state w-active-border-state border-active-border-state bg-current',
  }
  const [sidebarMenuItems, setSidebarMenuItems] = useState<React.ReactNode[]>([])

  const checkIfActive = (currRoute: string) => {
    console.log('checkIfActive')
    if (router.pathname === '/')
      return router.pathname.includes(currRoute);
    else
      return currRoute !== '/' && router.pathname.includes(currRoute);
  }

  const mobileLogout = () => {
    clearUserSession();
    router.push('/login')
  }

  useEffect(() => {
    let newMenuItems: React.ReactNode[] = [];
    newMenuItems = routes.filter(routeItem => routeItem.roles.includes(authorizedUser?.role)).map((routeItem, routeIndex) => (
      <div key={`route-sidebar-index-${routeIndex}`} className={`${tailwindClasses.menuItem} ${checkIfActive(routeItem.route) && tailwindClasses.menuActive}`} onClick={() => onRouteClick(routeItem)}>
        <div className={`${checkIfActive(routeItem.route) && tailwindClasses.activeStateBar}`} />
        <div className={`${tailwindClasses.name} ${show ? tailwindClasses.nameMax : tailwindClasses.nameMin}`}>{routeItem.displayName}</div>
        <div className={`${tailwindClasses.icon} ${show ? tailwindClasses.iconMax : tailwindClasses.iconMin}`}>{routeItem.icon}</div>
      </div>
    ));
    newMenuItems.push(<div className='filler flex-grow md:hidden' />)
    newMenuItems.push(<div key={`route-sidebar-index-mobile-logout`} className={`md:hidden self-end justify-self-end ${tailwindClasses.menuItem}`} onClick={mobileLogout}>
      <div className={`${tailwindClasses.name} ${show ? tailwindClasses.nameMax : tailwindClasses.nameMin}`}>Log Out</div>
      <div className={`${tailwindClasses.icon} ${show ? tailwindClasses.iconMax : tailwindClasses.iconMin}`}>
        <svg xmlns="http://www.w3.org/2000/svg" className="hero-icons color-grey1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
        </svg>
      </div>
    </div>)
    setSidebarMenuItems(newMenuItems);
  }, [router.pathname]);

  return (
    <div className={`${tailwindClasses.sidebar} ${show ? tailwindClasses.sidebarMax : tailwindClasses.sidebarMin}`}>
      {sidebarMenuItems}
    </div>
  )
}


type SidebarProps = {
  onRouteClick: (routeItem: RouteItem) => void,
  routes: Array<RouteItem>,
  show: boolean,
}
