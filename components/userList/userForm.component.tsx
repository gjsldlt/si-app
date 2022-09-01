import React, { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

import LoaderComponent from "../loader/loader.component";
import SkillManager from "../skillManager/skillManager.component";
import {
  UserType,
  ManagerType,
  Metadata,
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
  const [skillList, setSkillList] = useState<Metadata[]>([]);
  const [activeSkillList, setActiveSkillList] = useState<
    {
      skill: Metadata;
      rate: string;
      yearsExperience: string;
      description: string;
    }[]
  >([]);
  const [activeSkill, setActiveSkill] = useState<{
    skill?: Metadata;
    rate: string;
    yearsExperience: string;
    description: string;
  }>({
    skill: undefined,
    rate: "",
    yearsExperience: "",
    description: "",
  });
  const [capabilityList, setCapabilityList] = useState<Metadata[]>([]);
  const tailwindClasses = {
    form: "flex flex-1 flex-grow justify-start items-start flex-wrap w-full content-start overflow-auto pb-2",
    formItemHalf: "w-full md:w-1/2 px-3 pt-1 md:pt-1 grow-0",
    formItem: "w-full px-3 pt-1 grow-0",
    skillsContainer: "flex-grow",
    formChipContainer: "flex flex-row",
    chips: "chips overflow-auto",
    chip: "chip",
    chipForm: "chipForm flex flex-col items-stretch",
    chipFormRow: "flex flex-col pt-3",
    inputLabel:
      "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1",
    input:
      "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    formButton:
      "bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded",
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
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      };
      registerUser(newUser, managerId, employeeData);
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

  // const renderSelectInput = (name: string, value: string, optionList) => {
  //     return <div className={tailwindClasses.formItem}>
  //         <label className={tailwindClasses.inputLabel} htmlFor={name}>
  //             Manager *
  //         </label>
  //         <select
  //             disabled={Boolean(parentUser)}
  //             required
  //             name={name}
  //             onChange={onInputChange}
  //             className={tailwindClasses.input}
  //             value={value}
  //             id={name}>
  //             {optionList}
  //         </select>
  //     </div>
  // }

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
          <label
            className={tailwindClasses.inputLabel}
            htmlFor="grid-managerId-name"
          >
            Manager *
          </label>
          <select
            disabled={Boolean(parentUser)}
            required
            name="managerId"
            onChange={onInputChange}
            className={tailwindClasses.input}
            value={manager ? manager?._id : ""}
            id="grid-managerId-name"
          >
            <option value={""} disabled>
              Select a Manager
            </option>
            {managerList.map((item, index) => (
              <option key={`manager-option-${index}`} value={item._id!}>
                {`${item.firstName} ${item.lastName}`}
              </option>
            ))}
          </select>
        </div>
        <div className={tailwindClasses.formItemHalf}>
          <label
            className={tailwindClasses.inputLabel}
            htmlFor="grid-capability-name"
          >
            Capability *
          </label>
          <select
            required
            name="capability"
            onChange={onInputChange}
            className={tailwindClasses.input}
            value={employeeData ? employeeData?.capability?._id : ""}
            id="grid-capability-name"
          >
            <option value={""}>-</option>
            {capabilityList.map((item, index) => (
              <option key={`capability-option-${index}`} value={item._id!}>
                {`${item.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className={tailwindClasses.formItemHalf}>
          <label
            className={tailwindClasses.inputLabel}
            htmlFor="grid-primarySkill-name"
          >
            Primary Skill
          </label>
          <select
            name="primarySkill"
            onChange={onInputChange}
            className={tailwindClasses.input}
            value={employeeData ? employeeData?.primarySkill?._id : ""}
            id="grid-primarySkill-name"
          >
            <option value={""}>-</option>
            {skillList.map((item, index) => (
              <option key={`skill-option-${index}`} value={item._id!}>
                {`${item.name}`}
              </option>
            ))}
          </select>
        </div>
        <div className={tailwindClasses.formItemHalf}>
          <label
            className={tailwindClasses.inputLabel}
            htmlFor="grid-secondarySkill-name"
          >
            Secondary Skill
          </label>
          <select
            name="secondarySkill"
            onChange={onInputChange}
            className={tailwindClasses.input}
            value={employeeData ? employeeData?.secondarySkill?._id : ""}
            id="grid-secondarySkill-name"
          >
            <option value={""}>-</option>
            {skillList.map((item, index) => (
              <option key={`skill-option-${index}`} value={item._id!}>
                {`${item.name}`}
              </option>
            ))}
          </select>
        </div>
        <SkillManager employee={employeeData} setEmployee={setEmployeeData} />
        {/* <div className={`${tailwindClasses.formItem} ${tailwindClasses.skillsContainer}`}>
                <div className={tailwindClasses.formChipContainer}>
                    <div className={tailwindClasses.chipForm}>
                        <div className={tailwindClasses.chipFormRow}>
                            <span className={tailwindClasses.inputLabel}>
                                Skill
                            </span>
                            <select
                                required
                                name="skills"
                                onChange={onActiveSkillInputChange}
                                className={tailwindClasses.input}
                                value={activeSkill?.skill?._id}
                                id="grid-skills-name">
                                <option value={null}>-</option>
                                {
                                    skillList.map((item, index) => (
                                        <option key={`active-skill-option-${index}`} value={item._id!} >
                                            {`${item.name}`}
                                        </option>
                                    ))
                                }
                            </select>
                        </div>
                        <div className={tailwindClasses.chipFormRow}>
                            <label className={tailwindClasses.inputLabel} htmlFor="grid-first-name">
                                Rate (out of 10)
                            </label>
                            <input
                                required
                                name="rate"
                                onChange={onActiveSkillInputChange}
                                value={activeSkill?.rate}
                                className={tailwindClasses.input}
                                id="grid-first-name"
                                type="number"
                                placeholder="-"
                            />
                        </div>
                        <div className={tailwindClasses.chipFormRow}>
                            <label className={tailwindClasses.inputLabel} htmlFor="grid-first-name">
                                Years Experience
                            </label>
                            <input
                                required
                                name="yearsExperience"
                                onChange={onActiveSkillInputChange}
                                value={activeSkill?.yearsExperience}
                                className={tailwindClasses.input}
                                id="grid-yearsExperience-name"
                                type="number"
                                placeholder="-"
                            />
                        </div>
                        <div className={tailwindClasses.chipFormRow}>
                            <label className={tailwindClasses.inputLabel} htmlFor="grid-first-name">
                                Description
                            </label>
                            <input
                                required
                                name="description"
                                onChange={onActiveSkillInputChange}
                                value={activeSkill?.description}
                                className={tailwindClasses.input}
                                id="grid-description-name"
                                type="text"
                                placeholder="-"
                            />
                        </div>
                        <div className={tailwindClasses.chipFormRow}>
                            <button className={tailwindClasses.formButton} onClick={onActiveSkillAdd} type="button">
                                Add Skill
                            </button>
                        </div>
                    </div>
                    <div className={tailwindClasses.chips}>
                        <span className={tailwindClasses.inputLabel}>
                            Skills
                        </span>
                        <div className={tailwindClasses.chip}>
                        </div>
                    </div>
                </div>
            </div> */}
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
      <div className={tailwindClasses.formItemHalf}>
        <label className={tailwindClasses.inputLabel} htmlFor="grid-first-name">
          First Name *
        </label>
        <input
          required
          name="firstName"
          onChange={onInputChange}
          value={firstName}
          className={tailwindClasses.input}
          id="grid-first-name"
          type="text"
          placeholder="Jane"
        />
      </div>
      <div className={tailwindClasses.formItemHalf}>
        <label className={tailwindClasses.inputLabel} htmlFor="grid-last-name">
          Last Name *
        </label>
        <input
          required
          name="lastName"
          onChange={onInputChange}
          value={lastName}
          className={tailwindClasses.input}
          id="grid-last-name"
          type="text"
          placeholder="Doe"
        />
      </div>
      <div className={tailwindClasses.formItem}>
        <label className={tailwindClasses.inputLabel} htmlFor="grid-email-name">
          Email *
        </label>
        <input
          required
          name="email"
          onChange={onInputChange}
          value={email}
          className={tailwindClasses.input}
          id="grid-email-name"
          type="email"
          placeholder="email@email.com"
        />
      </div>
      {role === USER_ROLES.EMPLOYEES || role === USER_ROLES.EMPLOYEESOF
        ? renderEmployeeFormFields()
        : null}
      {userToEdit === undefined && (
        <>
          <div className={tailwindClasses.formItem}>
            <label
              className={tailwindClasses.inputLabel}
              htmlFor="grid-password-name"
            >
              Password *
            </label>
            <input
              required
              name="password"
              onChange={onInputChange}
              value={password}
              className={tailwindClasses.input}
              id="grid-password-name"
              type="password"
            />
          </div>

          <div className={tailwindClasses.formItem}>
            <label
              className={tailwindClasses.inputLabel}
              htmlFor="grid-confirmPassword-name"
            >
              Confirm Password *
            </label>
            <input
              required
              name="confirmPassword"
              onChange={onInputChange}
              value={confirmPassword}
              className={tailwindClasses.input}
              id="grid-confirmPassword-name"
              type="password"
            />
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
