export default function Login({ }: LoginProps) {
    const tailwindClasses = {
        container:'flex flex-row h-100vh',
        firstHalf:'flex-1 h-100vh bg-grey',
        secondHalf:'hidden md:flex flex-1 h-100vh',
        formClass:'absolute h-[75vh] w-[90vw] bg-gainsboro left-[5vw] top-[12.5vh]'
    }

    return (
        <div className={tailwindClasses.container}>
            <div className={`login-bg ${tailwindClasses.firstHalf}`}></div>
            <div className={`${tailwindClasses.secondHalf}`}></div>
            <div className={`${tailwindClasses.formClass}`}>
                asd
            </div>
        </div>
    )
}

type LoginProps = {};