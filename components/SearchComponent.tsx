import React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import CustomizedHook from './CustomizedHook';
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { InboxIcon } from '@heroicons/react/solid';

const skills = [
  { title: 'Angular', id: 0 },
  { title: 'React', id: 1 },
  { title: 'Gatsby', id: 2 },
];

const SearchComponent = () => {
  return (
    <>
      <CustomizedHook skills={skills} />
      <List>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon className='w-8 h-8' />
            </ListItemIcon>
            <ListItemText primary='Inbox' />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding>
          <ListItemButton>
            <ListItemIcon>
              <InboxIcon className='w-8 h-8' />
            </ListItemIcon>
            <ListItemText primary='Drafts' />
          </ListItemButton>
        </ListItem>
      </List>
    </>
  );
};

export default SearchComponent;
