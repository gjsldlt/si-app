import { SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';

export let SidebarCallerType = function (newState: boolean): boolean {
  return false;
};

export interface RouteItem {
  roles: any;
  name: string;
  displayName: string;
  route: string;
  icon: JSX.Element; //OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface AccountType extends UserType {
  role: string;
  token: string;
  roles: [string?];
}

export interface ManagerType {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  createdAt: string;
  userId: string;
}

// export interface EmployeeType  {
//     _id: string,
//     firstName: string,
//     lastName: string,
//     email: string,
//     password: string,
//     createdAt: string,
//     userId: string,
// }


export interface UserType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  userId?: string;
  managerId?: string;
  employeeId?: string;
}

export interface MetadataType {
  _id: string;
  name: string;
  description: string;
}

export interface EmployeeType {
  _id?: string;
  firstName: string;
  lastName: string;
  email: string;
  password?: string;
  manager: {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  capability?: {
    _id: string;
    name: string;
    id: string;
    description: string;
  };
  primarySkill?: {
    _id: string;
    name: string;
    id: string;
    description: string;
  };
  secondarySkill?: {
    _id: string;
    name: string;
    id: string;
    description: string;
  };
  skills?: [
    {
      name: string;
      rate: string;
      yearsExperience: string;
      skill: {
        _id: string;
        name: string;
        id: string;
        description: string;
      };
    }
  ];
}
