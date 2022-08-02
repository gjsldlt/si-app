export let SidebarCallerType = function (newState: Boolean): Boolean { return false };

export type RouteItem = {
    name: string,
    displayName: string,
    route: string,
    icon: any
}

export type UserDataType = {
    firstName: String,
    lastName: String,
    email: String,
    userId: String,
    token: String,
    managerId: String,
    employeeId: String,
    role: String,
}