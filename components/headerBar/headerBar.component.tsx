import MenuIcon from '@mui/icons-material/Menu';

import { SidebarCallerType } from '../../types/MasterTypes.types';
import styles from './headerBar.module.scss';

function HeaderBar({ breadcrumb, onMenuClick }: HeaderBarProps) {

    const tailwindClasses = {
        header: 'transition-all duration-500 fixed h-header-height min-w-full top-0 w-full z-10 bg-black text-white flex-row-reverse sm:flex-row flex justify-stretch items-center',
        title: 'flex-1 mx-2 flex flex-col',
        mainTitle: 'flex-1 text-lg',
        menuButton: 'transition-all duration-500 w-45 h-header-height text-white cursor-pointer hover:bg-current hover:text-black',
        breadcrumb: 'flex flex-row',
        crumb: 'text-xs flex-initial mr-2 capitalize',
    }
    return (<>
        <div className={`${tailwindClasses.header}`}>
            <button
                onClick={() => onMenuClick()}
                type="button"
                className={tailwindClasses.menuButton}
                data-mdb-ripple="true"
                data-mdb-ripple-color="light">
                <MenuIcon />
            </button>
            <div className={tailwindClasses.title}>
                <p className={tailwindClasses.mainTitle}>Header</p>
                {/* {
                    breadcrumb.length > 1 &&
                    <div className={tailwindClasses.breadcrumb}>
                        {
                            breadcrumb.map((crumb, crumbIndex) => (<div className={tailwindClasses.crumb}>{crumb}</div>))
                        }
                    </div>
                } */}
            </div>
        </div>
    </>);
}

type HeaderBarProps = {
    breadcrumb: Array<string>,
    onMenuClick: Function
}

export default HeaderBar;