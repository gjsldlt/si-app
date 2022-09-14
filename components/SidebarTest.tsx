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

type Anchor = 'top' | 'left' | 'bottom' | 'right';

export default function SidebarTest() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

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
    <Box
      sx={{ width: state[anchor] ? 250 : 50, transition: 'all 0.3s ease' }}
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon sx={{ color: 'white' }} />
                ) : (
                  <MailIcon sx={{ color: 'white' }} />
                )}
              </ListItemIcon>
              <div className={`${state[anchor] ? 'block' : 'hidden'} `}>
               {text}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {['All mail', 'Trash', 'Spam'].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                {index % 2 === 0 ? (
                  <InboxIcon sx={{ color: 'white' }} />
                ) : (
                  <MailIcon sx={{ color: 'white' }} />
                )}
              </ListItemIcon>
              <div className={`${state[anchor] ? 'block' : 'hidden'} `}>
                {text}
              </div>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  return (
    <div>
      {(['left'] as const).map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <Drawer
            variant='permanent'
            PaperProps={{ sx: { backgroundColor: 'black', color: 'white' } }}
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
