import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export let SidebarCallerType = function (newState: Boolean): Boolean {
    return false;
};

export type RouteItem = {
    roles: any;
    name: string,
    displayName: string,
    route: string,
    icon: JSX.Element //OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export type UserDataType = {
    role: string;
    firstName: String,
    lastName: String,
    email: String,
    userId: String,
    token: String,
    managerId: String,
    employeeId: String,
    roles: [String],
}

export type ManagerType = {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: String,
    userId: String,
}

export type EmployeeType = {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: String,
    userId: String,
}

export type CapabilityType = {
  _id: String;

  name: String;
  description: String;
};


export type SkillType = {
    _id: string
    name: string
    description: string


export type UserType = {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
}