import Link from 'next/link';

import PageBanner from '../components/pageBanner/pageBanner.component';
import ManagerList from '../components/managerList/managerList.component';

function Users() {

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'mt-[95px] mx-1 md:mx-0 md:pl-[1rem] pt-1 md:pt-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] min-h-[85vh]',
        header: 'text-2xl text-white z-[5] ',
        box: ''
    }

    return (
        <>
            <PageBanner height="15vh" content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>User List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <div className={tailwindClasses.box}>
                    <ManagerList />
                </div>
                <div className={tailwindClasses.box}>
                    <ManagerList />
                </div>
            </div>
        </>
    );
}

export default Users;