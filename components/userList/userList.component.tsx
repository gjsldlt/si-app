import { useEffect, useState } from 'react';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

import styles from './managerList.module.scss';
import LoaderComponent from '../loader/loader.component';
import { getAllManagers } from '../../services/user.service';
import { getEmployees, getEmployeesOfManager, deleteUser, registerManager, registerEmployee } from '../../services/user.service';
import { UserType } from '../../types/MasterTypes.types';
import UserForm from "./userForm.component";
import { USER_ROLES } from '../../helpers/constants.helper';

export default function UserList({ role, activeUser, parentUser, onClick, enableRowActions }: PageProps) {
  const tailwindClasses = {
    container: 'container relative flex flex-grow flex-col bg-white p-1 min-h-[200px] md:min-h-100 border-[1px] shadow-lg',
    toolbar: 'toolbar flex flex-row',
    title: 'title flex-1',
    addButton: 'addbutton h-iconbutton w-iconbutton flex items-center justify-center p-0',
    list: 'list flex-grow flex flex-col overflow-auto max-h-[300px] md:max-h-unset',
    lineItem: 'lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row',
    lineItemActive: 'active bg-sidebar text-white',
    lineDetails: 'name flex flex-col justify-start justify-center flex-grow cursor-pointer',
    lineActions: 'lineActions flex flex-row justify-center items-center',
    lineButton: 'lineButton h-[20px] w-[20px] cursor-pointer hover:text-current',
    email: 'block w-full text-xs',
    name: 'p-0 m-0',
  }
  const [userToEdit, setUserToEdit] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [loadState, setLoadState] = useState<Boolean>(true);
  const [addState, setAddState] = useState<Boolean>(false);

  const renderData = async () => {
    if (!addState) {
      setAddState(false);
      setLoadState(true);
      switch (role) {
        case 'employees':
          setUserList(await getEmployees());
          break;
        case 'employeesof':
          setUserList(await getEmployeesOfManager(parentUser?._id || ''));
          break;
        case 'managers':
          setUserList(await getAllManagers());
          break;
        case USER_ROLES.ALL:
        default:
          break;
      }
      setLoadState(false);
    }
  }

  const addNewUser = () => {
    setUserToEdit(undefined);
    setAddState(!addState);
  }

  const clickUserRow = (user: UserType) => {
    if (enableRowActions) {
      if (activeUser?._id === user._id) {
        onClick(undefined);
      } else {
        onClick(user);
      }
    }
  }

  const editUser = (user: UserType) => {
    setAddState(true);
    setUserToEdit(user);
  }

  const deleteUserHandler = async (user: UserType) => {
    setLoadState(true);
    if (window.confirm(`Are you sure you want to delete ${user.firstName} ${user.lastName}?`)) {
      let result = await deleteUser(user.userId!);
      await renderData();
      if (!result.success) {
        window.alert(result.message);
      }
    }
    setLoadState(false);
  }

  const registerUser = async (newUser: UserType, managerId?: String) => {
    setLoadState(true);
    if (role === USER_ROLES.MANAGERS) {
      console.log('register new manager', newUser)
      await registerManager(newUser);
      await renderData();
      setAddState(false);
      window.alert(`${newUser.firstName} ${newUser.lastName} is now registered as a Manager.`)
    } else {
      //registerEmployee
      console.log(`register new employee of ${managerId}`, newUser)
      await registerEmployee(newUser, managerId!);
      await renderData();
      setAddState(false);
    }
    setLoadState(false);
  }

  const updateUser = async (updatedUser: UserType, managerId?: String) => {
    setLoadState(true);
    if (role === USER_ROLES.MANAGERS) {

     }
    else { 
      
    }
  }

  const renderList = () => {
    return <div className={tailwindClasses.list}>
      {
        !loadState && userList.map((item, index) => {
          let activeLine = activeUser?._id === item._id;
          return <div key={`manager-line-item-${index}`} className={`${tailwindClasses.lineItem} ${activeLine ? tailwindClasses.lineItemActive : ''}`}>
            <div className={tailwindClasses.lineDetails} onClick={() => clickUserRow(item)}>
              <p className={tailwindClasses.name}>
                <span>{item.firstName}</span>&nbsp;
                <span>{item.lastName}</span>
              </p>
              <span className={tailwindClasses.email}>{item.email}</span>
            </div>
            {
              enableRowActions ? (
                <div className={tailwindClasses.lineActions}>
                  <PencilIcon className={tailwindClasses.lineButton} onClick={() => { editUser(item) }} />
                  <TrashIcon className={tailwindClasses.lineButton} onClick={() => { deleteUserHandler(item) }} />
                </div>
              ) : null
            }
          </div>
        })
      }
    </div>
  }

  const boxTitle = () => {
    if (addState && userToEdit === undefined) {
      switch (role) {
        case USER_ROLES.EMPLOYEES:
          return 'New Employee';
        case USER_ROLES.EMPLOYEESOF:
          return `New Employee of ${parentUser?.firstName} ${parentUser?.lastName}`;
        case USER_ROLES.MANAGERS:
          return 'New Manager';
        case USER_ROLES.ALL:
        default:
          return 'New User';
      }
    } else if (!addState && userToEdit === undefined) {
      switch (role) {
        case USER_ROLES.EMPLOYEES:
          return 'Employees';
        case USER_ROLES.EMPLOYEESOF:
          return `Employees of ${parentUser?.firstName} ${parentUser?.lastName}`;
        case USER_ROLES.MANAGERS:
          return 'Managers';
        case USER_ROLES.ALL:
        default:
          return 'Users';
      }
    } else {
      return `Updating: ${userToEdit?.firstName}  ${userToEdit?.lastName}`
    }
  }

  useEffect(() => {
    renderData();
  }, [role, parentUser, addState])

  return (
    <div className={tailwindClasses.container}>
      {
        loadState ? <LoaderComponent /> : null
      }
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>{boxTitle()}</p>
        <button className={tailwindClasses.addButton} onClick={addNewUser}>
          {
            addState ? <XIcon className="h-5 w-5 text-gray" /> : <PlusIcon className="h-5 w-5 text-gray" />
          }
        </button>
      </div>
      {
        addState ? <UserForm
          role={role}
          userToEdit={userToEdit}
          setLoadState={setLoadState}
          parentUser={parentUser || undefined}
          registerUser={registerUser}
          updateUser={updateUser}
        /> : renderList()
      }
    </div>
  )
}

type PageProps = {
  activeUser: UserType,
  onClick: Function,
  enableRowActions: Boolean
  role?: String,
  parentUser?: UserType,
}
UserList.defaultProps = {
  role: USER_ROLES.ALL,
  activeUser: null,
  onClick: () => { console.log('done nothing.') },
  enableRowActions: false,
  parentUser: undefined
}