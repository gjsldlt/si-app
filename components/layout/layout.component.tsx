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

import { Box, Container } from '@mui/material';

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
    <Box sx={{ p: 0, display: 'flex' }}>
      <SidebarComponent />
      <Container
        sx={{ pt: '64px', display: 'flex', flexDirection: 'column' }}
        maxWidth={false}
        disableGutters
      >
        {children}
      </Container>
    </Box>
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
