import { useEffect, useState } from 'react';
import { PlusIcon, XIcon } from '@heroicons/react/solid';

import styles from './managerList.module.scss';
import LoaderComponent from '../loader/loader.component';
import { getAllManagers } from '../../services/user.service';
import { ManagerType } from '../../types/MasterTypes.types';
import ManagerForm from "./managerForm.component";

export default function ManagerList({ }: PageProps) {
  const tailwindClasses = {
    container: 'relative flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg',
    toolbar: 'flex flex-row',
    title: 'flex-1',
    addButton: 'h-iconbutton w-iconbutton flex items-center justify-center p-0',
    list: 'flex flex-col h-[100px]',
    lineItem: '',
  }
  const [managerList, setManagerList] = useState<ManagerType[]>([]);
  const [loadState, setLoadState] = useState<Boolean>(true);
  const [addState, setAddState] = useState<Boolean>(false);

  const renderData = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setLoadState(false);
  }

  const addNewManager = () => {
    setAddState(!addState);
  }

  const renderList = () => {
    return <div className={tailwindClasses.list}>
      {
        !loadState && managerList.map((item, index) => (
          <div key={`manager-line-item-${index}`} className={tailwindClasses.lineItem}>
            {item.firstName}
            {item.lastName}
          </div>
        ))
      }
    </div>
  }

  useEffect(() => {
    renderData();
  }, [])

  return (
    <div className={tailwindClasses.container}>
      {
        loadState ? <LoaderComponent /> : null
      }
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Managers</p>
        <button className={tailwindClasses.addButton} onClick={addNewManager}>
          {
            addState ? <XIcon className="h-5 w-5 text-blue-500" /> : <PlusIcon className="h-5 w-5 text-blue-500" />
          }
        </button>
      </div>
      {addState ? <ManagerForm /> : renderList()}
    </div>
  )
}

type PageProps = {
}