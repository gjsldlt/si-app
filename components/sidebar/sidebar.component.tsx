import styles from './sidebar.module.scss';
import HomeIcon from '@mui/icons-material/Home';
import { RouteItem } from '../../types/MasterTypes.types';

export default function Sidebar({ onRouteClick, routes, show }: SidebarProps) {

  const tailwindClasses = {
    sidebar: 'twind-sidebar transition-all duration-500 shadow-lg fixed right-0 min-h-full sm:fixed sm:left-0 z-[100] bg-white overflow-hidden shadow-lg',
    sidebarMax: 'w-sidebar-width',
    sidebarMin: 'w-45 translate-x-full sm:translate-x-0',
    menuItem: 'transition-all duration-500 box-border flex items-center overflow-hidden break-words h-45 cursor-pointer hover:bg-current',
    name: 'transition-all duration-500 break-normal whitespace-nowrap overflow-hidden flex-1 ml-5',
    nameMin: '-translate-x-full opacity-0 ml-0',
    nameMax: 'translate-x-0',
    icon: 'transition-all duration-500 flex items-center justify-center',
    iconMin: 'w-45 h-45',
    iconMax: 'w-auto h-auto',
  }

  return (
    <div className={`${tailwindClasses.sidebar} ${show ? tailwindClasses.sidebarMax : tailwindClasses.sidebarMin}`}>
      {
        routes.map((routeItem, routeIndex) => (
          <div key={`route-sidebar-index-${routeIndex}`} className={`${tailwindClasses.menuItem}`} onClick={() => onRouteClick(routeItem)}>
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
  show: boolean
}
