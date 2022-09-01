import { useEffect, useState } from "react";
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

import styles from "./managerList.module.scss";
import LoaderComponent from "../loader/loader.component";
import { getAllManagers } from "../../services/user.service";
import {
  getEmployees,
  getEmployeesOfManager,
  deleteUser,
  registerManager,
  registerEmployee,
  updateManager,
} from "../../services/user.service";
import { UserType, EmployeeType } from "../../types/MasterTypes.types";
import UserForm from "./userForm.component";
import { USER_ROLES } from "../../helpers/constants.helper";
import PopupComponent from "../PopupComponent";
import ButtonComponent from "../ButtonComponent";

export default function UserList({
  role,
  activeUser,
  parentUser,
  onClickItem,
  enableRowActions,
}: PageProps) {
  const tailwindClasses = {
    container:
      "container relative flex flex-grow flex-col bg-white p-1 min-h-[200px] md:min-h-100 border-[1px] shadow-lg items-stretch",
    toolbar: "toolbar flex flex-row grow-0 basis-[content]",
    title: "title flex-1",
    addButton:
      "addbutton h-iconbutton w-iconbutton flex items-center justify-center p-0",
    list: "list grow-0 flex flex-col overflow-auto basis-[90%]",
    lineItem:
      "lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row",
    lineItemActive: "active bg-sidebar text-white",
    lineDetails:
      "name flex flex-col justify-start justify-center flex-grow cursor-pointer",
    lineActions: "lineActions flex flex-row justify-center items-center",
    lineButton:
      "lineButton h-[20px] w-[20px] cursor-pointer hover:text-current",
    email: "block w-full text-xs",
    name: "p-0 m-0",
  };
  const [userToEdit, setUserToEdit] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [loadState, setLoadState] = useState<boolean>(true);
  const [addState, setAddState] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserType | undefined>();
  const [popUp, setPopup] = useState<boolean>(false);

  const handleOpen = (user: UserType) => {
    setUserToDelete(user);
    setPopup(true);
  };

  const handleClose = () => setPopup(false);

  const renderData = async () => {
    if (!addState) {
      setAddState(false);
      setLoadState(true);
      switch (role) {
        case "employees":
          setUserList(await getEmployees());
          break;
        case "employeesof":
          setUserList(await getEmployeesOfManager(parentUser?._id || ""));
          break;
        case "managers":
          setUserList(await getAllManagers());
          break;
        case USER_ROLES.ALL:
        default:
          break;
      }
      setLoadState(false);
    }
  };

  const addNewUser = () => {
    setUserToEdit(undefined);
    setAddState(!addState);
  };

  const clickUserRow = (user: UserType) => {
    if (enableRowActions) {
      if (activeUser?._id === user._id) {
        onClickItem(undefined);
      } else {
        onClickItem(user);
      }
    }
  };

  const editUser = (user: UserType) => {
    setAddState(true);
    setUserToEdit(user);
  };

  const deleteUserHandler = async (user: UserType) => {
    setLoadState(true);

    if (userToDelete) {
      let result = await deleteUser(userToDelete.userId!);
      await renderData();
    }
    handleClose();

    setLoadState(false);
  };

  const registerUser = async (
    newUser: UserType,
    managerId?: string,
    employee?: EmployeeType
  ) => {
    setLoadState(true);
    if (role === USER_ROLES.MANAGERS) {
      console.log("register new manager", newUser);
      await registerManager(newUser);
      await renderData();
      setAddState(false);
      window.alert(
        `${newUser.firstName} ${newUser.lastName} is now registered as a Manager.`
      );
    } else {
      console.log(`register new employee of ${managerId}`, newUser, employee);
      await registerEmployee(employee!, managerId!);
      await renderData();
      setAddState(false);
    }
    setLoadState(false);
  };

  const updateUser = async (updatedUser: UserType, managerId?: string) => {
    setLoadState(true);
    if (role === USER_ROLES.MANAGERS) {
      let response = await updateManager(
        userToEdit ? (userToEdit?.userId ? userToEdit?.userId : "") : "",
        updatedUser
      );
      if (response.error) {
        window.alert(
          "Something went wrong. Please contact administrator of tool."
        );
      }
    } else {
      console.log("Submit to update -- employee");
    }
    setAddState(false);
    setUserToEdit(undefined);
    setLoadState(false);
  };

  const renderList = () => {
    return (
      <div className={tailwindClasses.list}>
        {!loadState &&
          userList.map((item, index) => {
            let activeLine = activeUser?._id === item._id;
            return (
              <div
                key={`manager-line-item-${index}`}
                className={`${tailwindClasses.lineItem} ${
                  activeLine ? tailwindClasses.lineItemActive : ""
                }`}
              >
                <div
                  className={tailwindClasses.lineDetails}
                  onClick={() => clickUserRow(item)}
                >
                  <p className={tailwindClasses.name}>
                    <span>{item.firstName}</span>&nbsp;
                    <span>{item.lastName}</span>
                  </p>
                  <span className={tailwindClasses.email}>{item.email}</span>
                </div>
                {enableRowActions ? (
                  <div className={tailwindClasses.lineActions}>
                    <PencilIcon
                      className={tailwindClasses.lineButton}
                      onClick={() => {
                        editUser(item);
                      }}
                    />
                    <TrashIcon
                      className={tailwindClasses.lineButton}
                      onClick={() => {
                        handleOpen(item);
                      }}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
      </div>
    );
  };

  const boxTitle = () => {
    if (addState && userToEdit === undefined) {
      switch (role) {
        case USER_ROLES.EMPLOYEES:
          return "New Employee";
        case USER_ROLES.EMPLOYEESOF:
          return `New Employee of ${parentUser?.firstName} ${parentUser?.lastName}`;
        case USER_ROLES.MANAGERS:
          return "New Manager";
        case USER_ROLES.ALL:
        default:
          return "New User";
      }
    } else if (!addState && userToEdit === undefined) {
      switch (role) {
        case USER_ROLES.EMPLOYEES:
          return "Employees";
        case USER_ROLES.EMPLOYEESOF:
          return `Employees of ${parentUser?.firstName} ${parentUser?.lastName}`;
        case USER_ROLES.MANAGERS:
          return "Managers";
        case USER_ROLES.ALL:
        default:
          return "Users";
      }
    } else {
      return `Updating: ${userToEdit?.firstName}  ${userToEdit?.lastName}`;
    }
  };

  useEffect(() => {
    renderData();
  }, [role, parentUser, addState]);

  return (
    <div className={tailwindClasses.container}>
      <PopupComponent
        title={`Are you sure you want to delete this user?:`}
        entry={`${userToDelete?.firstName} ${userToDelete?.lastName}`}
        open={popUp}
        close={handleClose}
      >
        <div className="flex justify-center">
          <ButtonComponent
            text={["yes", "no"]}
            handleClick={[deleteUserHandler, handleClose]}
            variant="outlined"
          />
        </div>
      </PopupComponent>
      {loadState ? <LoaderComponent /> : null}
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>{boxTitle()}</p>
        <button className={tailwindClasses.addButton} onClick={addNewUser}>
          {addState ? (
            <XIcon className="h-5 w-5 text-gray" />
          ) : (
            <PlusIcon className="h-5 w-5 text-gray" />
          )}
        </button>
      </div>
      {addState ? (
        <UserForm
          role={role}
          userToEdit={userToEdit}
          setLoadState={setLoadState}
          parentUser={parentUser || undefined}
          registerUser={registerUser}
          updateUser={updateUser}
        />
      ) : (
        renderList()
      )}
    </div>
  );
}

type PageProps = {
  activeUser: UserType;
  onClickItem: (
    user: UserType | React.Dispatch<React.SetStateAction<undefined>> | undefined
  ) => void;
  enableRowActions: boolean;
  role?: string;
  parentUser?: UserType;
  registerEmployee?: (emp: EmployeeType, managerId: string) => void;
};
UserList.defaultProps = {
  role: USER_ROLES.ALL,
  activeUser: null,
  onClickItem: (
    user: UserType | React.Dispatch<React.SetStateAction<undefined>> | undefined
  ) => {
    console.log("done nothing.");
  },
  enableRowActions: false,
  parentUser: undefined,
};
