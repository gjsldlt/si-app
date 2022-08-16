import Link from 'next/link';

import PageBanner from '../components/pageBanner/pageBanner.component';

function Users() {

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'mt-[110px] pl-[1rem]',
        header: 'text-2xl text-white z-[5] '
    }

    return (
        <>
            <PageBanner height={200} content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>User List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                test
            </div>
        </>
    );
}

export default Users;