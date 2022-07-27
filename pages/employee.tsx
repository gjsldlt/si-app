import Link from 'next/link';
import { useRouter } from 'next/router';

function Employee() {

    const tailwindClasses = {
        content:'m-5',
        header:'text-2xl'
    }

    return (
        <div className={tailwindClasses.content}>
            <h2 className={tailwindClasses.header}>Employee Home</h2>
        </div>);
}

export default Employee;