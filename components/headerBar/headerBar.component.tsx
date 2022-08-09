import { SidebarCallerType } from '../../types/MasterTypes.types';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/router'

import { clearUserSession, accessUserInSession } from '../../services/user.service';

function HeaderBar({ onMenuClick, show }: HeaderBarProps) {
    const [profileBarState, setProfileBarState] = useState(false);
    const router = useRouter();
    const authorizedUser = accessUserInSession();
    let [humanName, setHumanName] = useState('');
    const tailwindClasses = {
        header: 'transition-all duration-500 fixed h-header-height min-w-full items-stretch top-0 w-full z-10 bg-sidebar md:bg-transparent text-black flex-row-reverse sm:flex-row flex justify-stretch items-center shadow-xl md:shadow-none',
        title: 'flex-1 mx-2 flex flex-col text-white ',
        mainTitle: 'flex-1 text-lg flex flex-row justify-start items-center whitespace-nowrap',
        headerBtn: 'bg-sidebar transition-all duration-500 box-border flex items-center overflow-hidden break-words cursor-pointer hover:text-current w-sidebar-min flex-row-reverse md:flex-row ',
        headerBtnMin: 'w-sidebar-min',
        headerBtnMax: 'md:w-sidebar-width',
        menuButton: 'z-[3] transition-all duration-500 w-sidebar-min h-header-height text-white cursor-pointer hover:text-current flex justify-center items-center m-0',
        headerBtnTitle: 'transition-all duration-500 w-full text-white flex-1 flex justify-start align-center whitespace-nowrap overflow-hidden flex-nowrap hidden md:block ',
        headerBtnTitleMin: 'opacity-0 -translate-x-full opacity-0 ml-0 ',
        headerBtnTitleMax: 'opacity-1 translate-x-0 opacity-1 ml-5 ',
        breadcrumb: 'flex-row hidden md:flex',
        crumb: ' text-xs flex-initial mr-2 capitalize cursor-pointer hover:text-current',
        profileBar: 'hidden md:flex transition-all duration-500 w-profileBarMobile cursor-pointer text-sm md:w-profileBar overflow-hidden text-white h-full flex flex-col-reverse pr-profileBar h-header-height shadow-none',
        profileBarActive: 'bg-sidebar text-white h-active-profile-bar shadow-lg flex-col justify-start',
        profile: 'flex flex-row justify-end items-center min-h-header-height max-h-header-height h-header-height absolute right-0 top-0 pr-profileBar',
        logoutButton: 'transition-position duration-500 z-1 flex flex-row justify-end items-center flex-0 text-white h-header-height',
        logoutButtonActive: ' translate-y-0',
        logoutButtonInactive: '-translate-y-full opacity-0',
    }
    let breadcrumb = ['Home'];
    router.asPath.split('/').forEach(routePath => {
        if (routePath != '') breadcrumb.push(routePath)
    });

    const logout = () => {
        if (profileBarState) {
            clearUserSession();
            router.push('/login')
        }
    }

    const breadcrumbClick = (crumbIndex: number) => {
        if (crumbIndex === 0) {
            router.push('/');
        } else {
            let newPath = '';
            router.asPath.split('/').forEach((routePath, routeIndex) => {
                if (routePath != '' && routeIndex <= crumbIndex) {
                    newPath += `/${routePath}`
                }
            });
            router.push(newPath);
        }
    }

    useEffect(() => {
        setHumanName(`${authorizedUser?.firstName} ${authorizedUser?.lastName}! `)
    }, [])

    return (<>
        <div className={`${tailwindClasses.header}`}>
            <div className={`${tailwindClasses.headerBtn} ${show ? tailwindClasses.headerBtnMax : tailwindClasses.headerBtnMin}`}>
                <div className={`${tailwindClasses.headerBtnTitle} ${show ? tailwindClasses.headerBtnTitleMax : tailwindClasses.headerBtnTitleMin}`}>
                    iFED
                </div>
                <button
                    onClick={() => onMenuClick()}
                    type="button"
                    className={`${tailwindClasses.menuButton}`}
                    data-mdb-ripple="true"
                    data-mdb-ripple-color="light">
                    <svg xmlns="http://www.w3.org/2000/svg" className="hero-icons" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>
            <div className={tailwindClasses.title}>
                <p className={tailwindClasses.mainTitle}>Skills Inventory</p>
                {
                    breadcrumb.length > 1 &&
                    <div className={tailwindClasses.breadcrumb}>
                        {
                            breadcrumb.map((crumb, crumbIndex) => (<div onClick={() => breadcrumbClick(crumbIndex)} className={tailwindClasses.crumb}>{crumb}</div>))
                        }
                    </div>
                }
            </div>
            <div className={`${tailwindClasses.profileBar} ${profileBarState ? tailwindClasses.profileBarActive : ''}`} onClick={() => setProfileBarState(!profileBarState)}>
                <div className={`${tailwindClasses.profile} ${profileBarState ? 'text-white' : ''}`}>
                    Hi {humanName}
                    <svg xmlns="http://www.w3.org/2000/svg" className="hero-icons" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                </div>
                <div className={`${tailwindClasses.logoutButton} ${profileBarState ? tailwindClasses.logoutButtonActive : tailwindClasses.logoutButtonInactive}`} onClick={logout}>
                    Logout
                    <svg xmlns="http://www.w3.org/2000/svg" className="hero-icons" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
                </div>
            </div>
        </div>
    </>);
}

type HeaderBarProps = {
    breadcrumb: Array<string>,
    onMenuClick: Function
    show: boolean
}

export default HeaderBar;