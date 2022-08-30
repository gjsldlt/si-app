export const SidebarCallerType = function (newState: boolean): boolean {
    return false;
};

export interface RouteItem {
    roles: any;
    name: string,
    displayName: string,
    route: string,
    icon: JSX.Element //OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface LoginDetails {
    email: string,
    password: string
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


export interface UserType {
    _id: string,
    firstName: string,
    lastName: string,
    email: string,
    password?: string,
    userId?: string
}

export interface EmployeeType extends UserType {
    createdAt: string,
}

export interface ManagerType extends UserType {
    createdAt: string,
}

export interface Metadata {
    _id: string
    name: string
    description: string
}