import Link from 'next/link';
import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import ManagerList from '../components/managerList/managerList.component';
import EmployeeList from '../components/employeeList/employeeList.component';

function Users() {
    const [activeManager, setActiveManager] = useState(undefined)
    const [activeEmployee, setActiveEmployee] = useState(undefined)

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'relative md:mt-[95px] mx-1 md:mx-0 md:pl-[1rem] pt-1 md:pt-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] min-h-[85vh] z-[1]',
        header: 'text-2xl text-white z-[5]',
        box: 'h-[81vh] md:h-[unset] flex flex-grow md:grow-0'
    }

    return (
        <>
            <PageBanner height="15vh" content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>User List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <div className={tailwindClasses.box}>
                    <ManagerList activeManager={activeManager} onClick={setActiveManager} enableRowActions={true} />
                </div>
                <div className={tailwindClasses.box}>
                    <EmployeeList activeManager={activeManager} />
                </div>
            </div>
        </>
    );
}

export default Users;
