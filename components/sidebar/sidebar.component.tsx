import styles from './sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import { RouteItem } from '../../types/MasterTypes.types';

export default function Sidebar({ onRouteClick, routes, show, activeRoute }: SidebarProps) {

  const tailwindClasses = {
    sidebar: 'twind-sidebar transition-all duration-500 shadow-lg fixed right-0 min-h-full sm:fixed sm:left-0 z-[100] bg-sidebar text-grey1 overflow-hidden shadow-2xl',
    sidebarMax: 'w-sidebar-width',
    sidebarMin: 'w-sidebar-min translate-x-full sm:translate-x-0',
    menuItem: 'transition-all duration-500 box-border flex items-center overflow-hidden break-words h-45 cursor-pointer hover:text-current',
    menuActive:'text-current',
    name: 'transition-all duration-500 break-normal whitespace-nowrap overflow-hidden flex-1 ',
    nameMin: '-translate-x-full opacity-0 ml-0',
    nameMax: 'translate-x-0 ml-5',
    icon: 'transition-all duration-500 flex items-center justify-center w-sidebar-min',
    iconMin: 'h-45',
    iconMax: 'h-auto',
    activeStateBar: 'h-active-border-state w-active-border-state border-active-border-state bg-current',

  }

  return (
    <div className={`${tailwindClasses.sidebar} ${show ? tailwindClasses.sidebarMax : tailwindClasses.sidebarMin}`}>
      {
        routes.map((routeItem, routeIndex) => (
          <div key={`route-sidebar-index-${routeIndex}`} className={`${tailwindClasses.menuItem} ${activeRoute===routeItem.route && tailwindClasses.menuActive}`} onClick={() => onRouteClick(routeItem)}>
            <div className={`${activeRoute===routeItem.route && tailwindClasses.activeStateBar}`} />
            <div className={`${tailwindClasses.name} ${show ? tailwindClasses.nameMax : tailwindClasses.nameMin}`}>{routeItem.displayName}</div>
            <div className={`${tailwindClasses.icon} ${show ? tailwindClasses.iconMax : tailwindClasses.iconMin}`}>{routeItem.icon}</div>
          </div>
        ))
      }
      {/* <div className={`${tailwindClasses.menuItem}`} onClick={onMenuClick}>
        <div className={`${tailwindClasses.name} ${show ? tailwindClasses.nameMax : tailwindClasses.nameMin}`}>Menu A</div>
        <div className={`${tailwindClasses.icon} ${show ? tailwindClasses.iconMax : tailwindClasses.iconMin}`}><HomeIcon /></div>
      </div> */}
    </div>
  )
}


type SidebarProps = {
  onRouteClick: (routeItem: RouteItem) => void,
  routes: Array<RouteItem>,
  show: boolean,
  activeRoute: String
}
