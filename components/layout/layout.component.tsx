import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import HeaderBar from '../headerBar/headerBar.component';
import Sidebar from '../sidebar/sidebar.component';
import styles from './layout.module.scss';

import AppRoutes from '../../helpers/routes.helper';
import { RouteItem } from '../../types/MasterTypes.types';
import { accessUserInSession } from '../../services/user.service';

export default function Layout({ children }: LayoutProps) {
  let router = useRouter();
  let [sidebarShow, setSidebarShow] = useState(false)
  let [breadcrumb, setBreadcrumb] = useState(['home'])

  const tailwindClasses = {
    layout: 'layout-container flex',
    body: 'block pt-header-height md:pl-sidebar-min w-full',
    content: '',
  }

  function goToRoute(routeItem: RouteItem) {
    router.push(routeItem.route)
  }


  useEffect(() => {
    let user = accessUserInSession();
    if (user === null && router.pathname !== '/login') {
      console.log(router);
      router.replace('/login');
    }
  }, [router])

  if (router.pathname === '/login') {
    return <>{children}</>
  } else if (router.pathname === '/_error') {
    return <>{children}</>
  } else return (
    <div className={tailwindClasses.layout}>
      <HeaderBar breadcrumb={breadcrumb} onMenuClick={() => setSidebarShow(!sidebarShow)} show={sidebarShow} />
      <div className={tailwindClasses.body}>
        <Sidebar onRouteClick={goToRoute} routes={AppRoutes} show={sidebarShow} activeRoute={router.route} />
        <div className={`${tailwindClasses.content}`}>{children}</div>
      </div>
    </div>
  )
}

type LayoutProps = {
  children: any
}
