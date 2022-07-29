import { useRouter } from 'next/router'
import { BeakerIcon } from '@heroicons/react/solid'

function Employee() {
    const router = useRouter();
    console.log(router.query);

    const tailwindClasses = {
        content:'m-5',
        header:'text-2xl'
    }

    return (
        <div className={tailwindClasses.content}>
            <h2 className={tailwindClasses.header}>Employee Home</h2>
            <p>
                Employee Name: {router.query.employee}
                <BeakerIcon className="h-45 w-45 font-xs text-blue-500" />
            </p>
        </div>);
}

export default Employee;