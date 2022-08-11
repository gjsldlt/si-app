import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export let SidebarCallerType = function (newState: Boolean): Boolean {
  return false;
};

export type RouteItem = {
  roles: any;
  name: string;
  displayName: string;
  route: string;
  icon: OverridableComponent<SvgIconTypeMap<{}, "svg">>;
};

export type UserDataType = {
  role: string;
  firstName: String;
  lastName: String;
  email: String;
  userId: String;
  token: String;
  managerId: String;
  employeeId: String;
  roles: [String];
};

export type ManagerType = {
  _id: String;
  firstName: String;
  lastName: String;
  email: String;
  password: String;
  createdAt: String;
  userId: String;
};

export type CapabilityType = {
  _id: String;

  name: String;
  description: String;
};
