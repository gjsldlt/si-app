import { useState, useEffect } from "react"
import Image from "next/image"
import logoMobile from '../../public/assets/images/shared/deloitte-logo-mobile.png'
import logoDesktopTablet from '../../public/assets/images/shared/deloitte-logo-desktop-tablet.png'

const AccentBar: React.FC = () => {

    const tailwindClasses = {
        accentBarContainer: `w-screen h-[70px] bg-black absolute lg:hidden`,
        logoTitleContainer: `flex items-center pl-[20px] pt-[15px]`,
        titleContainer: `flex items-center`,
        titleProperties: `text-white text-[20px] md:text-[32px] font-bold`,
        spanSpacing: `px-[12px]`
    }

    const [logo, setLogo] = useState(true)

    useEffect(() => {
        if (window.innerWidth <= 640) {
            setLogo(true)
        } else {
            setLogo(false)
        }
    }, [])

    return (
        <div className={`${tailwindClasses.accentBarContainer}`}>
            <div className={`${tailwindClasses.logoTitleContainer}`}>
                <Image src={logo === true ? logoMobile : logoDesktopTablet} alt="Deloitte Logo" width={logo === true ? 98.91 : 178.2} height={40} />
                <div className={`${tailwindClasses.titleContainer}`} >
                    <span className={`${tailwindClasses.titleProperties}`}>
                        <span className={`${tailwindClasses.spanSpacing}`}>&bull;</span>
                        iFED
                    </span>
                </div>
            </div>
        </div>
    )
}

export default AccentBar