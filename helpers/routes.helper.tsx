import {
  HomeIcon,
  UserGroupIcon,
  DatabaseIcon,
  UsersIcon,
  IdentificationIcon,
} from '@heroicons/react/solid';

export default [
  {
    name: 'home',
    displayName: 'Home',
    roles: ['admin', 'employee', 'manager'],
    route: '/',
    icon: <HomeIcon className='hero-icons color-grey1' />,
  },

  // admin routes
  {
    name: 'allusers',
    displayName: 'All Users',
    roles: ['admin'],
    route: '/users',a
    icon: <UserGroupIcon className='hero-icons color-grey1' />,
  },
  {
    name: 'allmetadata',
    displayName: 'All Metadata',
    roles: ['admin'],
    route: '/metadatas',
    icon: <DatabaseIcon className='hero-icons color-grey1' />,
  },

  // manager routes
  {
    name: 'manager',
    displayName: 'Manager',
    roles: ['manager'],
    route: '/manager',
    icon: <UsersIcon className='hero-icons color-grey1' />,
  },
  {
    name: 'employees',
    displayName: 'Employees',
    roles: ['manager'],
    route: '/employee',
    icon: <IdentificationIcon className='hero-icons color-grey1' />,
  },

  // {
  //   name: 'employees',
  //   displayName: 'Employees',
  //   roles: ['admin'],
  //   route: '/employee',
  //   icon: <GroupsIcon />
  // },
  // {
  //   name: 'skills',
  //   displayName: 'Skills',
  //   roles: ['admin'],
  //   route: '/skills',
  //   icon: <WorkIcon />
  // },
];
