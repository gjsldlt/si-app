import styles from './sidebar.module.scss';
import { useRouter } from 'next/router';
import { LogoutIcon } from '@heroicons/react/solid'

import { RouteItem } from '../../types/MasterTypes.types';
import { accessUserInSession, clearUserSession } from "../../services/user.service";
import { useEffect, useState } from 'react';

export default function Sidebar({ onRouteClick, routes, show }: SidebarProps) {
  const authorizedUser = accessUserInSession();
  const router = useRouter();
  const tailwindClasses = {
    sidebar: 'tailwind-sidebar transition-all pt-header-height duration-500 shadow-lg fixed right-0 min-h-full fixed md:left-[0] z-[100] md:h-screen bg-sidebar text-grey1 overflow-hidden shadow-2xl flex-col',
    sidebarMax: 'w-sidebar-width',
    sidebarMin: 'w-sidebar-min md:translate-x-0 translate-x-full',
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
    newMenuItems.push(<div key={`route-sidebar-filler`} className='filler flex-grow md:hidden' />)
    newMenuItems.push(<div key={`route-sidebar-index-mobile-logout`} className={`md:hidden self-end justify-self-end ${tailwindClasses.menuItem}`} onClick={mobileLogout}>
      <div className={`${tailwindClasses.name} ${show ? tailwindClasses.nameMax : tailwindClasses.nameMin}`}>Log Out</div>
      <div className={`${tailwindClasses.icon} ${show ? tailwindClasses.iconMax : tailwindClasses.iconMin}`}>
        <LogoutIcon className="hero-icons color-grey1" />
      </div>
    </div>)
    setSidebarMenuItems(newMenuItems);
  }, [router.pathname, show]);

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
