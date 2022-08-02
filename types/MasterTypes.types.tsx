import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export let SidebarCallerType = function (newState: Boolean): Boolean { return false };

export type RouteItem = {
    name: string,
    displayName: string,
    route: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
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