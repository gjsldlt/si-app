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
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import { styled } from '@mui/system';
import {
  ChevronLeftIcon,
  DatabaseIcon,
  HomeIcon,
  MenuIcon,
  UserGroupIcon,
} from '@heroicons/react/solid';
import { useRouter } from 'next/router';
import { IconButton } from '@mui/material';

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
    if (window.innerWidth < 900) {
      setSmall(true);
    } else {
      setSmall(false);
    }
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
      <div className='flex p-3 items-center justify-center'>
        <img
          src='/assets/images/deloitte-logo.png'
          alt='DCPDC Logo'
          className={`${state[anchor] ? 'block' : 'hidden'} w-44`}
        />

        <IconButton
          onClick={toggleDrawer(anchor, false)}
          className={`${state[anchor] ? 'block' : 'hidden'} absolute right-0`}
        >
          <ChevronLeftIcon className='text-white w-6 h-6' />
        </IconButton>

        <IconButton
          onClick={toggleDrawer(anchor, true)}
          className={state[anchor] ? 'hidden' : 'block'}
        >
          <MenuIcon className='text-white w-6 h-6' />
        </IconButton>
      </div>
      <Divider />
      <List className='flex flex-col items-center justify-center'>
        {menuList.map((item, index) => (
          <ListItem
            key={index}
            disablePadding
            className='hover:bg-gray transition-all duration-150'
            onClick={toggleDrawer(anchor, false)}
            onKeyDown={toggleDrawer(anchor, false)}
          >
            <ListItemButton
              className={`${router.pathname === item.link && '!bg-main'}`}
              onClick={() => router.push(item.link)}
            >
              <ListItemIcon
                className={`${
                  router.pathname === item.link ? 'text-black' : 'text-white'
                }  w-6 h-6`}
              >
                {item.icon}
              </ListItemIcon>
              {/* <div className={`${state[anchor] ? 'block' : 'hidden'} `}>
               {text}
              </div> */}
              <ListItemText
                primary={item.name}
                className={`whitespace-nowrap ${
                  router.pathname === item.link ? 'text-black' : 'text-white'
                } ${
                  state[anchor] ? 'opacity-100' : 'opacity-0'
                } transition-all duration-150`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      {/* <List>
        {['All', 'Trash', 'Spam'].map((text, index) => (
          <ListItem
            key={text}
            disablePadding
            className='hover:bg-gray transition-all duration-150'
          >
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon sx={{ color: 'white' }} />
                ) : (
                  <MailIcon sx={{ color: 'white' }} />
                )}
              </ListItemIcon>
              <ListItemText
                primary={text}
                className={`whitespace-nowrap ${
                  state[anchor] ? 'opacity-100' : 'opacity-0'
                } transition-all duration-150`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List> */}
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            onClick={toggleDrawer(anchor, true)}
            sx={{ marginTop: '25px', zIndex: 3, marginLeft: '50px' }}
          >
            {anchor}
          </Button>
          <Drawer
            variant={smallDevice ? 'temporary' : 'permanent'}
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
    </div>
  );
}
