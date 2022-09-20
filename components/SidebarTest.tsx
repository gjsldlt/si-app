import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import AppBar from '@mui/material/AppBar';
import { styled } from '@mui/system';
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DatabaseIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import LogoutIcon from '@mui/icons-material/Logout';
import { useRouter } from 'next/router';
import {
  Avatar,
  Card,
  CardHeader,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
} from '@mui/material';
import ButtonComponent from './ButtonComponent';
import { AccountCircleOutlined } from '@mui/icons-material';
import { clearUserSession } from '../services/user.service';

type Anchor = 'top' | 'left' | 'bottom' | 'right';

const menuList = [
  { name: 'Home', icon: <HomeIcon />, link: '/' },
  { name: 'Employees', icon: <UserGroupIcon />, link: '/users' },
  { name: 'Metadata', icon: <DatabaseIcon />, link: '/metadatas' },
];

export default function SidebarTest() {
  const router = useRouter();

  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const [smallDevice, setSmall] = React.useState<boolean>(true);

  const updateSidebar = () => {
    if (window.innerWidth < 768) {
      setSmall(true);
    } else {
      setSmall(false);
    }
  };

  const handleLogout = () => {
    clearUserSession();
    router.push('/login');
  };

  React.useEffect(() => {
    updateSidebar();
    window.addEventListener('resize', updateSidebar);
  }, []);

  const toggleDrawer =
    (anchor: Anchor, open: boolean) =>
    (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === 'keydown' &&
        ((event as React.KeyboardEvent).key === 'Tab' ||
          (event as React.KeyboardEvent).key === 'Shift')
      ) {
        return;
      }

      setState({ ...state, [anchor]: open });
    };

  React.useEffect(() => {
    console.log(state);
  }, [state]);

  const list = (anchor: Anchor) => (
    <Box sx={{ width: state[anchor] ? 250 : 55, transition: 'all 0.3s ease' }}>
      <div className='flex p-3 h-20 items-center justify-center'>
        <IconButton
          onClick={toggleDrawer(anchor, false)}
          className={`${
            state['right'] ? 'block' : 'hidden'
          } absolute left-0 group`}
        >
          <ChevronRightIcon className='text-gray group-hover:text-white w-6 h-6' />
        </IconButton>
        <img
          src='/assets/images/deloitte-logo.png'
          alt='DCPDC Logo'
          className={`${!state[anchor] && 'hidden'} w-44`}
        />

        <IconButton
          onClick={toggleDrawer(anchor, false)}
          className={`${
            state['left'] ? 'block' : 'hidden'
          } absolute right-0 group`}
        >
          <ChevronLeftIcon className='text-gray group-hover:text-white w-6 h-6' />
        </IconButton>

        <IconButton
          onClick={toggleDrawer(anchor, true)}
          className={state[anchor] ? 'hidden' : 'block group'}
        >
          <MenuIcon className='text-gray group-hover:text-white w-6 h-6' />
        </IconButton>
      </div>
      <Divider />
      <List className='flex flex-col items-center justify-center'>
        {menuList.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className='hover:bg-[#323335] transition-all duration-150'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <ListItemButton
              className={`${router.pathname === item.link && '!bg-main'} group`}
              onClick={() => router.push(item.link)}
            >
              <ListItemIcon
                className={`${
                  router.pathname === item.link
                    ? 'text-black'
                    : 'text-gray group-hover:text-white'
                }  w-6 h-6`}
              >
                {item.icon}
              </ListItemIcon>
              <ListItemText
                primary={item.name}
                className={`whitespace-nowrap ${
                  router.pathname === item.link
                    ? 'text-black'
                    : 'text-gray group-hover:text-white'
                } ${
                  state[anchor] ? 'opacity-100' : 'opacity-0'
                } transition-all duration-150`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <div className='text-white flex  flex-col w-full absolute bottom-0 mb-16 space-y-5'>
        {state[anchor] && (
          <p className='text-gray uppercase text-xs ml-4'>Profile</p>
        )}
        <Box
          className={`flex flex-row items-center space-x-5 whitespace-nowrap ${
            state[anchor] ? 'ml-4' : 'justify-center'
          }`}
        >
          <Tooltip
            disableHoverListener={state[anchor] ? true : false}
            placement={state[anchor] ? undefined : 'right'}
            title={'Juan Dela Cruz'}
          >
            <Avatar>
              <AccountCircleOutlined />
            </Avatar>
          </Tooltip>
          {state[anchor] && (
            <div>
              <div className='text-sm'>Juan Dela Cruz</div>
              <div className='text-xs text-gray'>Front-End Developer</div>
            </div>
          )}
        </Box>
        <div className={`w-full flex justify-center items-center`}>
          <IconButton className='space-x-2 group' onClick={handleLogout}>
            <LogoutIcon className='text-gray group-hover:text-white' />
            {state[anchor] && (
              <span className='text-gray text-lg group-hover:text-white'>
                Logout
              </span>
            )}
          </IconButton>
        </div>
      </div>
    </Box>
  );

  return (
    <div>
      {(['left', 'right'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Drawer
            variant={
              smallDevice || anchor === 'right' ? 'temporary' : 'permanent'
            }
            PaperProps={{
              sx: {
                backgroundColor: 'black',
                color: 'white',
                overflow: 'hidden',
              },
            }}
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {list(anchor)}
          </Drawer>
          <div
            className={`${
              state[anchor] ? 'absolute z-30 opacity-50' : 'opacity-0'
            } bg-black  w-full h-full top-0 overflow-hidden transition-all duration-500`}
            onClick={toggleDrawer(anchor, false)}
          ></div>
        </React.Fragment>
      ))}
      <AppBar className='relative z-20'>
        <Toolbar>
          <Typography
            variant='h6'
            component='div'
            sx={{
              flexGrow: 1,
            }}
            className='md:pl-16'
          >
            <span
              onClick={() => router.push('/')}
              className='hover:cursor-pointer'
            >
              iFED
            </span>
          </Typography>
          {/* {anchor === 'right' && (
            <Button
              onClick={toggleDrawer(anchor, true)}
              sx={{ marginTop: '25px', zIndex: 3, marginLeft: '50px' }}
            >
              {anchor}
            </Button>
          )} */}
          <div className='block md:hidden'>
            <IconButton onClick={toggleDrawer('right', true)} className='group'>
              <MenuIcon className='text-black group-hover:opacity-50 w-6 h-6' />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      <div className='bg-blue-900 h-[100px] md:h-[180px] pl-10 md:pl-24 uppercase text-4xl flex items-center font-bold text-white'>
        {router.pathname === '/' ? 'HOME' : router.pathname.split('/')}
      </div>
    </div>
  );
}
