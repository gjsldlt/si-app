import Link from 'next/link';
import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import UserList from '../components/userList/userList.component';
import SkillManager from '../components/skillManager/skillManager.component';
import EmployeeDetail from '../components/employeeDetail/employeeDetail.component';
import ManagerWidget from '../components/managerWidget/managerWidget.component';
import { UserType } from '../types/MasterTypes.types';

function Users() {
    const [activeManager, setActiveManager] = useState<UserType>()
    const [activeEmployee, setActiveEmployee] = useState(undefined)

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'flex relative mx-1 mb-1 md:mx-0 md:pl-[1rem] md:mr-4 md:w-full pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:grow-0 items-stretch h-full overflow-hidden',
        header: 'text-2xl text-white z-[5]',
        box: 'flex flex-col gap-1 shrink-0 grow-0 md:basis-[31.25vw] basis-1/2',
        subtitle: 'italic text-sm text-[gray]',
        statsBox: 'flex flex-grow w-[unset] flex-col items-stretch',
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
                    {/* <ManagerWidget activeManager={activeManager} height='10vh' /> */}
                    <UserList
                        role="managers"
                        activeUser={activeManager}
                        onClickItem={selectManager}
                        enableRowActions={true} />
                </div>
                <div className={tailwindClasses.box}>
                    {/* Employee List */}
                    <UserList
                        role={activeManager ? 'employeesof' : 'employees'}
                        activeUser={activeEmployee}
                        onClickItem={setActiveEmployee}
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
