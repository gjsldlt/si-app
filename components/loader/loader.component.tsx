// import styles from './loader.style.scss';
import LoaderImg from "../../public/assets/images/loader.gif";

import Image from "next/image"

export default function Loader() {
    const tailwindClasses = {
        container: 'absolute z-[10] h-full w-full bg-[rgba(0,0,0,0.1)] top-0 left-0 flex items-center justify-center',
        item: 'bg-[]'
    }
    return (
        <div className={tailwindClasses.container}>
            <Image src={LoaderImg.src} alt="loading" height={200} width={200}/>
        </div>
    )
}
