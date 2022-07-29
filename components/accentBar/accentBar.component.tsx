import { useState, useEffect } from "react"
import Image from "next/image"
import logoMobile from '../../public/assets/images/shared/deloitte-logo-mobile.png'
import logoDesktopTablet from '../../public/assets/images/shared/deloitte-logo-desktop-tablet.png'

const AccentBar: React.FC = () => {

    const [logo, setLogo] = useState(true)

    useEffect(() => {
        if (window.innerWidth <= 640) {
            setLogo(true)
        } else {
            setLogo(false)
        }
    }, [])

    return (
        <nav className="w-screen h-[70px] bg-black absolute lg:hidden">
            <div className="flex items-center pl-[20px] pt-[15px]">
                <Image src={logo === true ? logoMobile : logoDesktopTablet} alt="Deloitte Logo" width={logo === true ? 98.91 : 178.2} height={40} />
                <div className="flex items-center" >
                    <span className="text-white text-[20px] md:text-[32px] font-bold">
                        <span className="px-[12px]">&bull;</span>
                        iFED
                    </span>
                </div>
            </div>
        </nav>
    )
}

export default AccentBar