import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

import HeaderBar from '../headerBar/headerBar.component';
import Sidebar from '../sidebar/sidebar.component';
import styles from './layout.module.scss';

import AppRoutes from '../../helpers/routes.helper';
import { RouteItem } from '../../types/MasterTypes.types';
import { accessUserInSession } from '../../services/user.service';
import SidebarComponent from '../sidebarComponent';
import { Grid } from '@mui/material';
import SidebarTest from '../SidebarTest';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();
  const [sidebarShow, setSidebarShow] = useState(false);
  const [breadcrumb, setBreadcrumb] = useState(['home']);

  const tailwindClasses = {
    layout: 'layout-container flex',
    body: 'body relative md:ml-sidebar-min w-full h-screen',
    content:
      'content relative flex flex-col items-stretch h-screen basis-[90%]',
  };

  function goToRoute(routeItem: RouteItem) {
    router.push(routeItem.route);
  }

  console.log('layout render ');
  return (
    <div>
      <SidebarComponent />
      {/* <SidebarTest/> */}
      <div className="md:pl-[65px] absolute h-[100vh] pt-[64px] w-[100vw] top-0 flex flex-col">{children}</div>
    </div>
    // <div className={tailwindClasses.layout}>
    //   <HeaderBar
    //     breadcrumb={breadcrumb}
    //     onMenuClick={() => setSidebarShow(!sidebarShow)}
    //     show={sidebarShow}
    //   />
    //   <div className={tailwindClasses.body}>
    //     {/* <Sidebar onRouteClick={goToRoute} routes={AppRoutes} show={sidebarShow} /> */}
    //     <SidebarComponent />
    //     <div className={`${tailwindClasses.content}`}>{children}</div>
    //   </div>
    // </div>
  );
}

type LayoutProps = {
  children: any;
};
