import Link from 'next/link';
import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import UserList from '../components/userList/userList.component';
import ManagerList from '../components/managerList/managerList.component';
import EmployeeList from '../components/employeeList/employeeList.component';
import { UserType } from '../types/MasterTypes.types';

function Users() {
    const [activeManager, setActiveManager] = useState(undefined)
    const [activeEmployee, setActiveEmployee] = useState(undefined)

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'flex relative mx-1 md:mx-0 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow',
        header: 'text-2xl text-white z-[5]',
        box: 'h-full md:h-[unset] flex flex-grow md:grow-0'
    }

    return (
        <>
            <PageBanner height="15vh" content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>User List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <div className={tailwindClasses.box}>
                    {/* Manager List */}
                    <UserList role="managers" activeUser={activeManager} onClick={setActiveManager} enableRowActions={true} />
                </div>
                <div className={tailwindClasses.box}>
                    {/* Employee List */}
                    <UserList role={activeManager ? 'employeesof' : 'employees'} parentUser={activeManager} enableRowActions={true} />
                </div>
            </div>
        </>
    );
}

export default Users;
