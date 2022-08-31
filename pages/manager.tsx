import Link from 'next/link';

import PageBanner from '../components/pageBanner/pageBanner.component';

function Manager() {

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'mt-[215px] pl-[2rem]',
        header: 'text-2xl text-white z-[5] '
    }

    return (
        <>
            <PageBanner content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>Manager&apos; Employee List</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <p>
                    <Link href="/manager/juan">Juan De la Cruz</Link>
                    <br />
                    <Link href="/manager/maria">Maria De la Paz</Link>
                </p>
            </div>
        </>
    );
}

export default Manager;