import Link from 'next/link';

function Manager() {

    const tailwindClasses = {
        content:'m-5',
        header:'text-2xl'
    }

    return (
        <div className={tailwindClasses.content}>
            <h2 className={tailwindClasses.header}>Manager Home</h2>
            <p>
                <a href="/manager/juan">Juan De la Cruz</a>
                <br/>
                <a href="/manager/maria">Maria De la Paz</a>
            </p>
        </div>);
}

export default Manager;