import { useEffect, useState } from 'react';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

import styles from './managerList.module.scss';
import LoaderComponent from '../loader/loader.component';
import { getAllManagers } from '../../services/user.service';
import { ManagerType } from '../../types/MasterTypes.types';
import ManagerForm from "./managerForm.component";

export default function ManagerList({ activeManager, onClick, enableRowActions }: PageProps) {
  const tailwindClasses = {
    container: 'container relative flex flex-col bg-white p-1 min-h-[200px] md:h-full md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg',
    toolbar: 'toolbar flex flex-row',
    title: 'title flex-1',
    addButton: 'addbutton h-iconbutton w-iconbutton flex items-center justify-center p-0',
    list: 'list flex flex-col h-[100px]',
    lineItem: 'lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row',
    lineItemActive: 'active bg-sidebar text-white',
    lineDetails: 'name flex flex-col justify-start justify-center flex-grow cursor-pointer',
    lineActions: 'lineActions flex flex-row justify-center items-center',
    lineButton: 'lineButton h-[20px] w-[20px] cursor-pointer hover:text-current',
    email: 'block w-full text-xs',
    name:'p-0 m-0',
  }

  const [managerToEdit, setManagerToEdit] = useState<ManagerType>();
  const [managerList, setManagerList] = useState<ManagerType[]>([]);
  const [loadState, setLoadState] = useState<Boolean>(true);
  const [addState, setAddState] = useState<Boolean>(false);

  const renderData = async () => {
    setLoadState(true);
    setManagerList(await getAllManagers());
    setLoadState(false);
  }

  const addNewManager = () => {
    setManagerToEdit(undefined);
    setAddState(!addState);
  }

  const clickManagerRow = (id: String) => {
    if (enableRowActions) {
      if (activeManager === id) {
        onClick(undefined);
      } else {
        onClick(id);
      }
    }
  }

  const editManager = (manager: ManagerType) => {
    console.log(manager)
    setAddState(true);
    setManagerToEdit(manager);
  }

  const renderList = () => {
    return <div className={tailwindClasses.list}>
      {
        !loadState && managerList.map((item, index) => {
          let activeLine = activeManager === item._id;
          return <div key={`manager-line-item-${index}`} className={`${tailwindClasses.lineItem} ${activeLine ? tailwindClasses.lineItemActive : ''}`}>
            <div className={tailwindClasses.lineDetails} onClick={() => clickManagerRow(item._id)}>
              <p className={tailwindClasses.name}>
                <span>{item.firstName}</span>
                <span>{item.lastName}</span>
              </p>
              <span className={tailwindClasses.email}>{item.email}</span>
            </div>
            {
              enableRowActions ? (
                <div className={tailwindClasses.lineActions}>
                  <PencilIcon className={tailwindClasses.lineButton} onClick={() => { editManager(item) }} />
                  <TrashIcon className={tailwindClasses.lineButton} />
                </div>
              ) : null
            }
          </div>
        })
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
            addState ? <XIcon className="h-5 w-5 text-gray" /> : <PlusIcon className="h-5 w-5 text-gray" />
          }
        </button>
      </div>
      {addState ? <ManagerForm managerToEdit={managerToEdit} /> : renderList()}
    </div>
  )
}

type PageProps = {
  activeManager: String,
  onClick: Function,
  enableRowActions: Boolean
}
ManagerList.defaultProps = {
  activeManager: null,
  onClick: () => { console.log('done nothing.') },
  enableRowActions: false
}