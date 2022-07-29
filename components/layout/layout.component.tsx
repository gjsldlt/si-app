import { useState } from 'react';
import { useRouter } from 'next/router'

import HeaderBar from '../headerBar/headerBar.component';
import Sidebar from '../sidebar/sidebar.component';
import styles from './layout.module.scss';

import AppRoutes from '../../helpers/routes.helper';
import { RouteItem } from '../../types/MasterTypes.types';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  let [sidebarShow, setSidebarShow] = useState(false)
  let [breadcrumb, setBreadcrumb] = useState(['home'])

  const tailwindClasses = {
    layout: '',
    body: 'flex flex-row pt-header-height md:pl-45',
  }

  function goToRoute(routeItem: RouteItem) {
    router.push(routeItem.route)
  }

  if (router.pathname === '/login') {
    return <>{children}</>
  } else return (
    <div className={tailwindClasses.layout}>
      <HeaderBar breadcrumb={breadcrumb} onMenuClick={() => setSidebarShow(!sidebarShow)} show={sidebarShow} />
      <div className={tailwindClasses.body}>
        <Sidebar onRouteClick={goToRoute} routes={AppRoutes} show={sidebarShow} activeRoute={router.route} />
        <div className={styles.body}>{children}</div>
      </div>
    </div>
  )
}

type LayoutProps = {
  children: any
}
