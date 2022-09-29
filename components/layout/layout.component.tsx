import { useRouter } from 'next/router';
import { RouteItem } from '../../types/MasterTypes.types';
import SidebarComponent from '../sidebarComponent';
import { Box, Grid, Container } from '@mui/material';

export default function Layout({ children }: LayoutProps) {
  const router = useRouter();

  function goToRoute(routeItem: RouteItem) {
    router.push(routeItem.route);
  }

  return (
    <div>
      <SidebarComponent />
<<<<<<< HEAD
      <Container
        sx={{
          pt: {
            xs: '140px',
            sm: '185px',
          },
          display: 'flex',
          flexDirection: 'column',
          maxHeight: '100%',
          overflow: 'auto'
        }}
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
=======
      <div className='sm:ml-20 sm:mr-4'>{children}</div>
    </div>
>>>>>>> c9a67cea519ff251836591134157a0b3f16505c0
  );
}

type LayoutProps = {
  children: any;
};
