import { useRouter } from 'next/router'

import PageBanner from '../../../components/pageBanner/pageBanner.component';

function Skill() {
    const router = useRouter()
    const { employee, skill } = router.query

    const tailwindClasses = {
        customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
        content: 'mt-[215px] pl-[2rem]',
        header: 'text-2xl text-white z-[5] '
    }

    return (
        <>
            <PageBanner content={<div className={tailwindClasses.customBanner}>
                <h1 className={tailwindClasses.header}>Manager&apos; View of {employee}&apos; Skill specific to {skill}</h1>
            </div>} />
            <div className={tailwindClasses.content}>
                <p>
                    {employee}
                    {skill}
                </p>
            </div>
        </>
    );
}

export default Skill;