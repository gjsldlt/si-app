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
      <div className='sm:ml-20 sm:mr-4'>{children}</div>
    </div>
  );
}

type LayoutProps = {
  children: any;
};
