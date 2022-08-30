import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export const SidebarCallerType = function (newState: boolean): boolean {
    return false;
};

export type RouteItem = {
    roles: any;
    name: string,
    displayName: string,
    route: string,
    icon: JSX.Element //OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface UserDataType {
    role: string;
    firstName: string,
    lastName: string,
    email: string,
    userId: string,
    token: string,
    managerId: string,
    employeeId: string,
    roles: string,
}

export type ManagerType = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    userId: string,
}

export type EmployeeType = {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    createdAt: string,
    userId: string,
}

export type UserType = {
    _id?: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    userId?: string
}

export interface Metadata {
    _id: string
    name: string
    description: string
}