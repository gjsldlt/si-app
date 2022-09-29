import React, { useEffect, useState } from "react";
import { PlusIcon, XIcon, PencilIcon } from "@heroicons/react/solid";

import LoaderComponent from "../loader/loader.component";
import SkillManager from "../skillManager/skillManager.component";
import {
  UserType,
  ManagerType,
  MetadataType,
  ActiveSkillType,
  EmployeeType,
} from "../../types/MasterTypes.types";
import { USER_ROLES } from "../../helpers/constants.helper";
import {
  getAllManagers,
  getEmployeeByUserId,
} from "../../services/user.service";
import { getMetadata } from "../../services/metadata.service";
import Employee from "../../pages/manager/[employee]";
import ButtonComponent from "../ButtonComponent";
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import InputAdornment from "@mui/material/InputAdornment";

export default function UserList({
  userToEdit,
  updateUser,
  registerUser,
  parentUser,
  setLoadState,
  role,
}: PageProps) {
  const [firstName, setFirstName] = useState<string>(
    userToEdit ? userToEdit.firstName : ""
  );
  const [lastName, setLastName] = useState<string>(
    userToEdit ? userToEdit.lastName : ""
  );
  const [email, setEmail] = useState<string>(
    userToEdit ? userToEdit.email : ""
  );
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [managerId, setManagerId] = useState<string>("");
  const [managerList, setManagerList] = useState<ManagerType[]>([]);
  const [employeeData, setEmployeeData] = useState<EmployeeType>();
  const [skillList, setSkillList] = useState<MetadataType[]>([]);
  const [activeSkillList, setActiveSkillList] = useState<ActiveSkillType[]>([]);
  const [activeSkill, setActiveSkill] = useState<ActiveSkillType>({
    skill: undefined,
    rate: undefined,
    yearsExperience: undefined,
    description: "",
  });
  const [capabilityList, setCapabilityList] = useState<MetadataType[]>([]);
  const tailwindClasses = {
    form: "flex flex-1 flex-grow justify-start items-start flex-wrap w-full content-start overflow-auto pb-2",
    formItemHalf: "formItemThird w-1/2 px-3 pt-1 md:pt-1 grow-0 my-[5px]",
    formItemThird: "formItemThird w-1/3 px-3 pt-1 md:pt-1 grow-0 my-[5px]",
    formItemFourth: "formItemFourth w-1/4 px-3 pt-1 md:pt-1 grow-0 my-[5px]",
    formItem: "formItem w-full px-3 pt-1 grow-0 my-[5px]",
    skillsContainer: "flex-grow",
    formChipContainer: "flex flex-row",
    chips: "chips overflow-auto",
    chip: "chip",
    chipForm: "chipForm flex flex-col items-stretch",
    chipFormRow: "flex flex-col pt-3",
    inputLabel: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1",
    input: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    formButton: "bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded",
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    if (userToEdit) {
      //  submit to update pemp
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      updateUser(newUser, managerId);
    } else {
      // submit to create
      if (password !== confirmPassword) {
        alert("Password does not match! Try again.")
      } else {
        const newUser = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          password: password,
        };
        registerUser(newUser, managerId, employeeData);
      }
    }
  };

  const onInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "email":
        setEmail(e.target.value);
        break;
      case "password":
        setPassword(e.target.value);
        break;
      case "confirmPassword":
        setConfirmPassword(e.target.value);
        break;
      default:
        break;
    }
    if (role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF) {
      let tempEmp = employeeData;
      switch (e.target.name) {
        case "firstName":
          tempEmp?.firstName != e.target.value;
          break;
        case "lastName":
          tempEmp?.lastName != e.target.value;
          break;
        case "email":
          tempEmp?.email != e.target.value;
          break;
        case "password":
          tempEmp?.password != e.target.value;
          break;
        case "confirmPassword":
          setConfirmPassword(e.target.value);
          break;
        case "managerId":
          let manager = managerList.find((item) => item._id === e.target.value);
          setManagerId(e.target.value);
          tempEmp?.manager != manager;
          break;
        case "primarySkill":
          const primarySkill = skillList.find(
            (item) => item._id === e.target.value
          );
          tempEmp?.primarySkill != primarySkill;
          break;
        case "secondarySkill":
          const secondarySkill = skillList.find(
            (item) => item._id === e.target.value
          );
          tempEmp?.secondarySkill != secondarySkill;
          break;
        case "capability":
          const capability = capabilityList.find(
            (item) => item._id === e.target.value
          );
          tempEmp?.capability != capability;
          break;
      }
      setEmployeeData(tempEmp);
    }
  };

  const onManagerSelect = (id: string) => {
    console.log(id);
  };

  const renderManagerListForNewEmployee = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setSkillList(await getMetadata("skill"));
    setCapabilityList(await getMetadata("capability"));
    setLoadState(false);
  };

  const renderEmployeeData = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setEmployeeData(
      await getEmployeeByUserId(
        userToEdit ? (userToEdit?._id ? userToEdit?._id : "") : ""
      )
    );
    setSkillList(await getMetadata("skill"));
    setCapabilityList(await getMetadata("capability"));
    console.log(employeeData);
    setLoadState(false);
  };

  const onActiveSkillAdd = () => {
    console.log(activeSkill);
  };

  const onActiveSkillInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log(e.target.name, e.target.value);
    const tempSkill = activeSkill;
    switch (e.target.name) {
      case "skill":
        tempSkill.skill = skillList.find((itm) => itm._id === e.target.value);
        break;
      case "rate":
        tempSkill.rate = e.target.value;
        break;
      case "yearsExperience":
        tempSkill.yearsExperience = e.target.value;
        break;
      case "description":
        tempSkill.description = e.target.value;
        break;
      default:
        break;
    }
    setActiveSkill(tempSkill);
  };

  const renderEmployeeFormFields = () => {
    // console.log(employeeData)
    let manager = null;
    if (userToEdit)
      manager = managerList.find(
        (item) => item._id === employeeData?.manager._id
      );
    else {
      manager = {
        _id: parentUser ? parentUser._id : managerId,
      };
    }

    return (
      <>
        <div className={tailwindClasses.formItemHalf}>
          <FormControl fullWidth>
            <InputLabel htmlFor="grid-managerId-name">Manager</InputLabel>
            <Select
              disabled={Boolean(parentUser)}
              required
              labelId="grid-managerId-name"
              id="grid-managerId-name"
              name="managerId"
              value={manager ? manager?._id : ""}
              label="Manager"
              onChange={onInputChange}
            >
              {managerList.map((item, index) => (
                <MenuItem key={`manager-option-${index}`} value={item._id!}>
                  {`${item.firstName} ${item.lastName}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={tailwindClasses.formItemHalf}>
          <FormControl fullWidth>
            <InputLabel htmlFor="grid-capability-name">Capability</InputLabel>
            <Select
              required
              labelId="grid-capability-name"
              id="grid-capability-name"
              name="capability"
              value={employeeData ? employeeData?.capability?._id : ""}
              label="Capability"
              onChange={onInputChange}
            >
              {capabilityList.map((item, index) => (
                <MenuItem key={`capability-option-${index}`} value={item._id!}>
                  {`${item.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        {/* <div className={tailwindClasses.formItemFourth}>
          <FormControl fullWidth>
            <InputLabel htmlFor="grid-primarySkill-name">Primary Skill</InputLabel>
            <Select
              labelId="grid-primarySkill-name"
              id="grid-primarySkill-name"
              name="primarySkill"
              value={employeeData ? employeeData?.primarySkill?._id : ""}
              label="Primary Skill"
              onChange={onInputChange}
            >
              {skillList.map((item, index) => (
                <MenuItem key={`skill-option-${index}`} value={item._id!}>
                  {`${item.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={tailwindClasses.formItemFourth}>
          <FormControl fullWidth>
            <InputLabel htmlFor="grid-secondarySkill-name">Secondary Skill</InputLabel>
            <Select
              labelId="grid-secondarySkill-name"
              id="grid-secondarySkill-name"
              name="secondarySkill"
              value={employeeData ? employeeData?.secondarySkill?._id : ""}
              label="Secondary Skill"
              onChange={onInputChange}
            >
              {skillList.map((item, index) => (
                <MenuItem key={`skill-option-${index}`} value={item._id!}>
                  {`${item.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div> */}
        <SkillManager employee={employeeData} setEmployee={setEmployeeData} setActiveSkills={setActiveSkillList} activeSkills={activeSkillList} />
      </>
    );
  };

  useEffect(() => {
    if (role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF) {
      if (userToEdit) {
        renderEmployeeData();
      } else {
        renderManagerListForNewEmployee();
      }
    }
  }, [role, parentUser, activeSkill]);

  return (
    <form className={tailwindClasses.form} onSubmit={onSubmitForm}>
      <div className={role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF
        ? tailwindClasses.formItemThird
        : tailwindClasses.formItemHalf}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <TextField
            required
            name="firstName"
            onChange={onInputChange}
            fullWidth
            value={firstName}
            id="grid-first-name"
            type="text"
            variant="outlined"
            label="First Name"
          />
        </Box>
      </div>
      <div className={role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF
        ? tailwindClasses.formItemThird
        : tailwindClasses.formItemHalf}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <TextField
            required
            name="lastName"
            onChange={onInputChange}
            fullWidth
            value={lastName}
            id="grid-last-name"
            type="text"
            variant="outlined"
            label="Last Name"
          />
        </Box>
      </div>
      <div className={role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF
        ? tailwindClasses.formItemThird
        : tailwindClasses.formItem}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%'
          }}
        >
          <TextField
            required
            name="email"
            onChange={onInputChange}
            fullWidth
            value={email}
            id="grid-email-name"
            type="email"
            variant="outlined"
            label="Email"
          />
        </Box>
      </div>
      {role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF
        ? renderEmployeeFormFields()
        : null}
      {userToEdit === undefined && (
        <>
          <div className={tailwindClasses.formItemHalf}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              <TextField
                required
                name="password"
                onChange={onInputChange}
                fullWidth
                value={password}
                id="grid-password-name"
                type="password"
                variant="outlined"
                label="Password"
              />
            </Box>
          </div>
          <div className={tailwindClasses.formItemHalf}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              <TextField
                required
                name="confirmPassword"
                onChange={onInputChange}
                fullWidth
                value={confirmPassword}
                id="grid-confirmPassword-name"
                type="password"
                variant="outlined"
                label="Confirm Password"
              />
            </Box>
          </div>
        </>
      )}
      <div className={`${tailwindClasses.formItem} mt-1 flex justify-end`}>
        <ButtonComponent
          type="submit"
          text={userToEdit === undefined ? ["Create"] : ["Update"]}
          variant="outlined"
        />
      </div>
    </form>
  );
}

type PageProps = {
  userToEdit?: UserType;
  registerUser: (
    newUser: UserType,
    managerId?: string,
    employee?: EmployeeType
  ) => void;
  parentUser?: UserType;
  setLoadState: (newState: boolean) => void;
  role?: string;
  updateUser: (updatedUser: UserType, managerId?: string) => void;
};