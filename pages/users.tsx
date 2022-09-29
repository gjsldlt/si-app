import Link from 'next/link';
import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import UserList from '../components/userList/userList.component';
import SkillManager from '../components/skillManager/skillManager.component';
import EmployeeDetail from '../components/employeeDetail/employeeDetail.component';
import ManagerWidget from '../components/managerWidget/managerWidget.component';
import { EmployeeType, UserType } from '../types/MasterTypes.types';

function Users() {
  const [activeManager, setActiveManager] = useState<UserType>();
  const [activeEmployee, setActiveEmployee] = useState<EmployeeType>();

  const tailwindClasses = {
    customBanner: 'customBanner h-full w-full flex items-center justify-start p-[2rem]',
    content: 'content flex',
    header: 'header text-2xl text-white z-[5]',
    box1: 'box1 w-1/3 pl-[25px] pr-[12.5px] py-[25px]',
    box2: 'box2 w-2/3 pl-[12.5px] pr-[25px] py-[25px]',
    subtitle: 'subtitle italic text-sm text-[gray]',
    statsBox: 'statsBox flex flex-grow w-[unset] flex-col items-stretch',
    managerStats: 'managerStats flex h-[30%] justify-center items-center',
    employeeStats: 'employeeStats flex flex-grow justify-center items-center',
  }

  const selectManager = (manager: UserType) => {
    setActiveManager(manager);
    setActiveEmployee(undefined);
  };

  return (
    <>
      <div className={tailwindClasses.content}>
        <div className={tailwindClasses.box1}>
          {/* Manager List */}
          {/* <ManagerWidget activeManager={activeManager} height='10vh' /> */}
          <UserList
            role="managers"
            activeUser={activeManager}
            onClickItem={(user) => selectManager(user as UserType)}
            enableRowActions={true} />
        </div>
        <div className={tailwindClasses.box2}>
          {/* Employee List */}
          <UserList
            role={activeManager ? 'employeesof' : 'employees'}
            activeUser={activeEmployee}
            onClickItem={(user) => setActiveEmployee(user as EmployeeType)}
            parentUser={activeManager}
            enableRowActions={true} />
        </div>
        {/* {
                    activeEmployee && <div className={tailwindClasses.box}>
                        <SkillManager employee={activeEmployee!} />
                    </div>
                } */}
        {/* <div className={`${tailwindClasses.box} flex-grow`}>
                    <div className={tailwindClasses.statsBox}>
                        {
                            activeManager !== undefined || activeEmployee !== undefined ?
                                <>
                                    {
                                        activeManager !== undefined &&
                                        <div className={tailwindClasses.managerStats}>
                                            <span className={tailwindClasses.subtitle}>Call Manager Stats of selected manager</span>
                                        </div>
                                    }
                                    <div className={tailwindClasses.employeeStats}>
                                        {activeEmployee !== undefined ?
                                            <>
                                                <EmployeeDetail employee={activeEmployee} />
                                            </>
                                            :
                                            <span className={tailwindClasses.subtitle}>Select an Employee to see their details</span>}
                                    </div>
                                </>
                                :
                                <div className={tailwindClasses.employeeStats}>
                                    <span className={tailwindClasses.subtitle}>Select a Manager or Employee to see their details</span>
                                </div>
                        }
                    </div>
                </div> */}
      </div>
    </>
  );
}

export default Users;