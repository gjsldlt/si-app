import { useEffect, useState } from 'react';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import IconButton from '@mui/material/IconButton';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import styles from './managerList.module.scss';
import LoaderComponent from '../loader/loader.component';
import { getAllManagers } from '../../services/user.service';
import {
  getEmployees,
  getEmployeesOfManager,
  deleteUser,
  registerManager,
  registerEmployee,
  updateManager,
} from '../../services/user.service';
import {
  UserType,
  ManagerType,
  Metadata,
  EmployeeType,
} from '../../types/MasterTypes.types';
import { getMetadata } from '../../services/metadata.service';
import UserForm from './userForm.component';
import { USER_ROLES } from '../../helpers/constants.helper';
import PopupComponent from '../PopupComponent';
import ButtonComponent from '../ButtonComponent';
import { CircularProgress, TextField } from '@mui/material';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormHelperText from '@mui/material/FormHelperText';
import Checkbox from '@mui/material/Checkbox';
import InputLabel from '@mui/material/InputLabel';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
export default function UserList({
  role,
  activeUser,
  parentUser,
  onClickItem,
  enableRowActions,
}: PageProps) {
  const tailwindClasses = {
    container:
      'container relative flex flex-grow flex-col bg-white min-h-[660px] md:min-h-100 items-stretch rounded-[10px] justify-between',
    toolbar: 'toolbar flex flex-row grow-0 basis-[content] items-center',
    title: 'title flex-1 font-bold text-sm m-[15px]',
    addButton:
      'addbutton h-iconbutton w-iconbutton flex items-center justify-center p-0 m-[15px]',
    list: 'list grow-0 flex flex-col overflow-auto basis-[90%]',
    lineItem:
      'lineitem transition-all duration-500 rounded-[10px] mx-[10px] my-[5px] py-[10px] px-[12px] flex flex-row bg-[#FAF9F9]',
    lineItemActive: 'active bg-sidebar bg-[#0E2040] text-white',
    lineDetails:
      'name flex flex-col justify-start justify-center flex-grow cursor-pointer',
    lineActions: 'lineActions flex flex-row justify-center items-center',
    lineButton:
      'lineButton h-[20px] w-[20px] cursor-pointer hover:text-current',
    email: 'email block w-full text-xs italic text-[#9999A1]',
    name: 'name p-0 m-0 font-bold text-sm',
    addCloseIcon:
      'addCloseIcon w-[30px] h-[30px] text-white p-[5px] bg-[#0E2040] rounded-[10px]',
    editDeleteIcon:
      'editDeleteIcon w-[30px] h-[30px] p-[7px] text-[#1C1B1F] bg-white rounded-[25px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]',
    filter: 'absolute ml-[-250px] p-[25px] w-[350px] rounded-md z-10 bg-white',
    formItemFourth: '',
  };
  const [userToEdit, setUserToEdit] = useState<UserType>();
  const [userList, setUserList] = useState<UserType[]>([]);
  const [loadState, setLoadState] = useState<boolean>(true);
  const [addState, setAddState] = useState<boolean>(false);
  const [userToDelete, setUserToDelete] = useState<UserType | undefined>();
  const [popUp, setPopup] = useState<boolean>(false);
  const [managerRegistered, setManagerRegistered] = useState<boolean>(false);
  const [userToBeRegistered, setUserToRegister] = useState<
    UserType | undefined
  >();
  const [firstName, setFirstName] = useState<string>(
    userToEdit ? userToEdit.firstName : ''
  );
  const [lastName, setLastName] = useState<string>(
    userToEdit ? userToEdit.lastName : ''
  );
  const [email, setEmail] = useState<string>(
    userToEdit ? userToEdit.email : ''
  );
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [managerId, setManagerId] = useState<string>('');
  const [managerList, setManagerList] = useState<ManagerType[]>([]);
  const [capabilityList, setCapabilityList] = useState<Metadata[]>([]);
  const [skillList, setSkillList] = useState<Metadata[]>([]);
  const [activeSkill, setActiveSkill] = useState<{
    skill?: Metadata;
    rate: string;
    yearsExperience: string;
    description: string;
  }>({
    skill: undefined,
    rate: '',
    yearsExperience: '',
    description: '',
  });

  // state hook to show succesfull  message
  const [success, setSuccess] = useState<boolean>(false);
  // state hook to show loader on popup
  const [popupLoading, setPopupLoading] = useState<boolean>(false);
  const [toFilter, setToFilter] = useState<boolean>(false);
  const [toSearch, setToSearch] = useState<boolean>(false);
  const [employeeData, setEmployeeData] = useState<EmployeeType>();
  const [selectedCapability, setSelectedCapability] = useState<String[]>([]);
  const [selectedPrimarySkill, setSelectedPrimarySkill] = useState<String[]>(
    []
  );
  const [selectedSecondarySkill, setSelectedSecondarySkill] = useState<
    String[]
  >([]);

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
    setPopupLoading(true);

    if (userToDelete) {
      let result = await deleteUser(userToDelete.userId!);
      await renderData();
    }
    handleClose();
    setSuccess(true);
    setLoadState(false);
  };

  const registerUser = async (
    newUser: UserType,
    managerId?: string,
    employee?: EmployeeType
  ) => {
    setLoadState(true);
    if (role === USER_ROLES.MANAGERS) {
      console.log('register new manager', newUser);
      await registerManager(newUser);
      await renderData();
      setAddState(false);
      setUserToRegister(newUser);
      setManagerRegistered(true);
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
        userToEdit ? (userToEdit?.userId ? userToEdit?.userId : '') : '',
        updatedUser
      );
      if (response.error) {
        window.alert(
          'Something went wrong. Please contact administrator of tool.'
        );
      }
    } else {
      console.log('Submit to update -- employee');
    }
    setAddState(false);
    setUserToEdit(undefined);
    setLoadState(false);
  };

  const search = async () => {
    if (toSearch === false) {
      setToSearch(true);
    } else {
      setToSearch(false);
    }
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
                  activeLine ? tailwindClasses.lineItemActive : ''
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
                    <ButtonComponent
                      style='icon'
                      icon={
                        <CreateIcon
                          className={tailwindClasses.editDeleteIcon}
                        />
                      }
                      text={['Edit']}
                      handleClick={[() => editUser(item)]}
                    />
                    <ButtonComponent
                      style='icon'
                      icon={
                        <DeleteIcon
                          className={tailwindClasses.editDeleteIcon}
                        />
                      }
                      text={['Remove']}
                      handleClick={[() => handleOpen(item)]}
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
      return `Updating: ${userToEdit?.firstName}  ${userToEdit?.lastName}`;
    }
  };

  const handleChangeCapability = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedCapability(typeof value === 'string' ? value.split(',') : value);
  };

  const handleChangePrimarySkill = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedPrimarySkill(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const handleChangeSecondarySkill = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = e.target.value;
    setSelectedSecondarySkill(
      typeof value === 'string' ? value.split(',') : value
    );
  };

  const filter = async () => {
    if (toFilter === false) {
      setToFilter(true);
    } else {
      setToFilter(false);
    }
  };

  const renderManagerListForNewEmployee = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setSkillList(await getMetadata('skill'));
    setCapabilityList(await getMetadata('capability'));
    setLoadState(false);
  };

  const renderEmployeeData = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setEmployeeData(
      await getEmployeeByUserId(
        userToEdit ? (userToEdit?._id ? userToEdit?._id : '') : ''
      )
    );
    setSkillList(await getMetadata('skill'));
    setCapabilityList(await getMetadata('capability'));
    console.log(employeeData);
    setLoadState(false);
  };

  useEffect(() => {
    renderData();
  }, [role, parentUser, addState]);

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
    <div className={tailwindClasses.container}>
      <div>
        <PopupComponent
          title={`${
            !popupLoading ? 'Are you sure you want to delete this user?:' : ''
          }`}
          entry={`${
            !popupLoading
              ? `${userToDelete?.firstName} ${userToDelete?.lastName}`
              : ''
          }`}
          open={popUp}
        >
          <div className='flex justify-center mt-2'>
            {!popupLoading ? (
              <ButtonComponent
                text={['yes', 'no']}
                handleClick={[deleteUserHandler, handleClose]}
                variant='outlined'
              />
            ) : (
              <CircularProgress />
            )}
          </div>
        </PopupComponent>
        <PopupComponent
          title={`Successfully deleted user:`}
          entry={`${userToDelete?.firstName} ${userToDelete?.lastName}`}
          open={success}
        >
          <div className='flex justify-center mt-2'>
            <ButtonComponent
              text={['confirm']}
              handleClick={[() => setSuccess(false)]}
              variant='outlined'
            />
          </div>
        </PopupComponent>
        <PopupComponent
          title={`${userToBeRegistered?.firstName} ${
            userToBeRegistered?.lastName
          } is now registered as ${
            role === 'managers' ? 'manager' : 'employee'
          }.`}
          open={managerRegistered}
        >
          <div className='flex justify-center mt-2'>
            <ButtonComponent
              text={['confirm']}
              handleClick={[() => setManagerRegistered(false)]}
              variant='outlined'
            />
          </div>
        </PopupComponent>
        {loadState ? <LoaderComponent /> : null}
        <div className={tailwindClasses.toolbar}>
          <p className={tailwindClasses.title}>{boxTitle()}</p>
          {addState ? (
            ''
          ) : (
            <div>
              {toSearch && (
                <>
                  <TextField
                    id='standard-basic'
                    label='Search'
                    variant='standard'
                  />
                </>
              )}
              <IconButton onClick={search}>
                <SearchIcon />
              </IconButton>
              <IconButton onClick={filter}>
                <TuneIcon />
              </IconButton>
              {toFilter ? (
                <div className={tailwindClasses.filter}>
                  <div>
                    <Box>
                      <FormControl className='flex flex-row'>
                        <div className='w-full'>
                          <FormLabel>Filter</FormLabel>
                          <FormGroup>
                            <FormControlLabel
                              control={<Checkbox />}
                              label='First Name'
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label='Last Name'
                            />
                            <FormControlLabel
                              control={<Checkbox />}
                              label='Email'
                            />
                          </FormGroup>
                        </div>
                        <div className='w-full'>
                          {role === USER_ROLES.EMPLOYEES ||
                          role === USER_ROLES.EMPLOYEESOF ? (
                            <div>
                              <div className={tailwindClasses.formItemFourth}>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='grid-capability-name'>
                                    Capability
                                  </InputLabel>
                                  <Select
                                    required
                                    labelId='grid-capability-name'
                                    id='grid-capability-name'
                                    name='capability'
                                    value={selectedCapability}
                                    label='Capability'
                                    onChange={handleChangeCapability}
                                    multiple
                                  >
                                    {capabilityList.map((item, index) => (
                                      <MenuItem
                                        key={`capability-option-${index}`}
                                        value={item._id!}
                                      >
                                        {`${item.name}`}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className={tailwindClasses.formItemFourth}>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='grid-primarySkill-name'>
                                    Primary Skill
                                  </InputLabel>
                                  <Select
                                    labelId='grid-primarySkill-name'
                                    id='grid-primarySkill-name'
                                    name='primarySkill'
                                    value={selectedPrimarySkill}
                                    label='Primary Skill'
                                    onChange={handleChangePrimarySkill}
                                    multiple
                                  >
                                    {skillList.map((item, index) => (
                                      <MenuItem
                                        key={`skill-option-${index}`}
                                        value={item._id!}
                                      >
                                        {`${item.name}`}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                              <div className={tailwindClasses.formItemFourth}>
                                <FormControl fullWidth>
                                  <InputLabel htmlFor='grid-secondarySkill-name'>
                                    Secondary Skill
                                  </InputLabel>
                                  <Select
                                    labelId='grid-secondarySkill-name'
                                    id='grid-secondarySkill-name'
                                    name='secondarySkill'
                                    value={selectedSecondarySkill}
                                    label='Secondary Skill'
                                    onChange={handleChangeSecondarySkill}
                                    multiple
                                  >
                                    {skillList.map((item, index) => (
                                      <MenuItem
                                        key={`skill-option-${index}`}
                                        value={item._id!}
                                      >
                                        {`${item.name}`}
                                      </MenuItem>
                                    ))}
                                  </Select>
                                </FormControl>
                              </div>
                            </div>
                          ) : null}
                        </div>
                      </FormControl>
                    </Box>
                  </div>
                </div>
              ) : null}
            </div>
          )}

          <button className={tailwindClasses.addButton} onClick={addNewUser}>
            {addState ? (
              <XIcon className={tailwindClasses.addCloseIcon} />
            ) : (
              <PlusIcon className={tailwindClasses.addCloseIcon} />
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
      <div className='flex justify-center my-[25px]'>
        <Stack spacing={2}>
          <Pagination count={10} color='secondary' />
        </Stack>
      </div>
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
    console.log('done nothing.');
  },
  enableRowActions: false,
  parentUser: undefined,
};
