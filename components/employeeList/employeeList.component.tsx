import { useEffect, useState } from 'react';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';

import styles from './employeeList.module.scss';
import LoaderComponent from '../loader/loader.component';
import { getEmployees, getEmployeesOfManager } from '../../services/user.service';
import { EmployeeType } from '../../types/MasterTypes.types';
import EmployeeForm from "./employeeForm.component";

export default function EmployeeList({ activeManager, activeEmployee, onClick, enableRowActions }: PageProps) {
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

  const [employeeList, setEmployeeList] = useState<EmployeeType[]>([]);
  const [loadState, setLoadState] = useState<Boolean>(true);
  const [addState, setAddState] = useState<Boolean>(false);

  const renderData = async () => {
    setLoadState(true);
    if (activeManager === null) {
      // get all employees
      setEmployeeList(await getEmployees());
    } else {
      // get all employees of specific manager
      setEmployeeList(await getEmployeesOfManager(activeManager));
    }
    setLoadState(false);
  }

  const addNewEmployee = () => {
    setAddState(!addState);
  }

  const clickEmployeeRow = (id: String) => {
    if (enableRowActions) {
      if (activeEmployee === id) {
        onClick(undefined);
      } else {
        onClick(id);
      }
    }
  }

  const renderList = () => {
    return <div className={tailwindClasses.list}>
      {
        !loadState && employeeList.map((item, index) => {
          let activeLine = activeEmployee === item._id;
          return <div key={`employee-line-item-${index}`} className={`${tailwindClasses.lineItem} ${activeLine ? tailwindClasses.lineItemActive : ''}`}>
            <div className={tailwindClasses.lineDetails} onClick={() => clickEmployeeRow(item._id)}>
              <p className={tailwindClasses.name}>
                <span>{item.firstName}</span>
                <span>{item.lastName}</span>
              </p>
              <span className={tailwindClasses.email}>{item.email}</span>
            </div>
            {
              enableRowActions ? (
                <div className={tailwindClasses.lineActions}>
                  <PencilIcon className={tailwindClasses.lineButton} />
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
    console.log(activeManager)
    renderData();
  }, [activeManager])

  return (
    <div className={tailwindClasses.container}>
      {
        loadState ? <LoaderComponent /> : null
      }
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Employees</p>
        <button className={tailwindClasses.addButton} onClick={addNewEmployee}>
          {
            addState ? <XIcon className="h-5 w-5 text-gray" /> : <PlusIcon className="h-5 w-5 text-gray" />
          }
        </button>
      </div>
      {addState ? <EmployeeForm /> : renderList()}
    </div>
  )
}

type PageProps = {
  activeManager: String,
  activeEmployee: String,
  onClick: Function,
  enableRowActions: Boolean
}
EmployeeList.defaultProps = {
  activeManager: null,
  activeEmployee: null,
  onClick: () => { console.log('done nothing.') },
  enableRowActions: false
}