import { useRouter } from 'next/router'

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
            </p>
        </div>);
}

export default Employee;