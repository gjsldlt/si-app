import { SvgIconTypeMap } from "@mui/material";
import { OverridableComponent } from "@mui/material/OverridableComponent";

export let SidebarCallerType = function (newState: Boolean): Boolean {
    return false;
};

export interface RouteItem {
    roles: any;
    name: string,
    displayName: string,
    route: string,
    icon: JSX.Element //OverridableComponent<SvgIconTypeMap<{}, "svg">>
}

export interface AccountType extends UserType {
    role: string;
    token: String,
    roles: [String],
}

export interface ManagerType {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password: String,
    createdAt: String,
    userId: String,
}

// export interface EmployeeType  {
//     _id: String,
//     firstName: String,
//     lastName: String,
//     email: String,
//     password: String,
//     createdAt: String,
//     userId: String,
// }

export interface CapabilityType {
    _id: String;
    name: String;
    description: String;
};


export interface SkillType {
    _id: string
    name: string
    description: string
}

export interface UserType {
    _id?: String,
    firstName: String,
    lastName: String,
    email: String,
    password?: String,
    userId?: String,
    managerId?: String,
    employeeI?: String,
}

export interface Metadata {
    _id: string
    name: string
    description: string
}

export interface EmployeeType {
    _id: String,
    firstName: String,
    lastName: String,
    email: String,
    password?: String,
    manager: {
        _id: String,
        userId: String,
        firstName: String,
        lastName: String,
        email: String,
    },
    capability?: {
        _id: String,
        name: String,
        id: String,
        description: String,
    }
    primarySkill?: {
        _id: String,
        name: String,
        id: String,
        description: String,
    }
    secondarySkill?: {
        _id: String,
        name: String,
        id: String,
        description: String,
    }
    skills?: [{
        name: String,
        rate: String,
        yearsExperience: String,
        skill: {
            _id: String,
            name: String,
            id: String,
            description: String,
        }
    }]
}