import { FC, useState, useEffect, useCallback } from 'react';

// import MetadataForm from './metadataForm.component';
// import AddBoxIcon from '@mui/icons-material/AddBox';
// import CancelIcon from '@mui/icons-material/Cancel';
// import { Box } from '@mui/material';

// import { getMetadata, getPgMetadata } from '../../services/metadata.service';
import { UserListUpdatedComponentProps } from '../../types/MasterPageComponent.type';
import { getAllManagers } from '../../services/user.service';
import {
  getEmployees,
  getEmployeesOfManager,
  deleteUser,
  registerManager,
  registerEmployee,
  updateManager,
  getEmployeeByUserId
} from "../../services/user.service";
import {
  UserType,
  ManagerType,
  MetadataType,
  EmployeeType,
} from "../../types/MasterTypes.types";
// import { UserType } from '../../types/MasterTypes.types';
// import { deleteMetadata } from '../../services/metadata.service';

// import LoaderComponent from '../loader/loader.component';
// import PopupComponent from '../PopupComponent';
// import ButtonComponent from '../ButtonComponent';
// import CardComponent from '../CardComponent';
// import ListComponent from '../ListComponent';

// import { CircularProgress } from "@mui/material";
const UserListUpdatedComponent: FC<UserListUpdatedComponentProps> = ({
  onUserDataClick,
  enableRowActions,
  activeUserData,
}: UserListUpdatedComponentProps) => {
  //state hook to capture api response to MetadataType array
  const [UserDataList, setUserdataList] = useState<UserType[]>([]);



  const renderData = useCallback(async () => {
    setUserdataList(await getAllManagers())
  }, []);

  useEffect(() => {
    renderData();
  }, [renderData]);

  
  return(
    <>
      {UserDataList}
    </>
  )


}

export default UserListUpdatedComponent;