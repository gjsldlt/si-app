import Link from 'next/link';
import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import UserList from '../components/userList/userList.component';
import ManagerList from '../components/managerList/managerList.component';
import EmployeeList from '../components/employeeList/employeeList.component';
import { UserType } from '../types/MasterTypes.types';

function Users() {
    const [activeManager, setActiveManager] = useState<UserType>()
    const [activeEmployee, setActiveEmployee] = useState(undefined)

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'flex relative mx-1 md:mx-0 md:pl-[1rem] md:mr-4 pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow items-stretch',
        header: 'text-2xl text-white z-[5]',
        box: 'h-full md:h-[unset] md:w-[30vw] flex flex-grow',
        subtitle: 'italic text-sm text-[gray]',
        statsBox: 'flex flex-grow flex-col items-stretch',
        managerStats: 'flex h-[30%] justify-center items-center',
        employeeStats: 'flex flex-grow justify-center items-center',
    }

    const selectManager = (manager: UserType) => {
        setActiveManager(manager);
        setActiveEmployee(undefined);
    }

    return (
        <>
            <PageBanner height="15vh" content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>User List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <div className={tailwindClasses.box}>
                    {/* Manager List */}
                    <UserList
                        role="managers"
                        activeUser={activeManager}
                        onClick={selectManager}
                        enableRowActions={true} />
                </div>
                <div className={tailwindClasses.box}>
                    {/* Employee List */}
                    <UserList
                        role={activeManager ? 'employeesof' : 'employees'}
                        activeUser={activeEmployee}
                        onClick={setActiveEmployee}
                        parentUser={activeManager}
                        enableRowActions={true} />
                </div>
                <div className={tailwindClasses.box}>
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
                                            <span className={tailwindClasses.subtitle}>Call Employee Stats of selected employee</span>
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
                </div>
            </div>
        </>
    );
}

export default Users;
