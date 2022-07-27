import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export let SidebarCallerType = function (newState: Boolean): Boolean { return false };

export type RouteItem = {
    name: string,
    displayName: string,
    route: string,
    icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>
}