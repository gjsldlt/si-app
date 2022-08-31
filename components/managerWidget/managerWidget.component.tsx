import { useEffect, useState } from 'react';

import LoaderComponent from '../loader/loader.component';
import { UserType } from '../../types/MasterTypes.types';
import styles from './managerWidget.module.scss';

export default function ManagerWidget({ activeManager, height }: PageProps) {
  const tailwindClasses = {
    container: `container flex h-[${height}] bg-white p-1 border-[1px] shadow-lg`,
    widget: 'widget flex flex-grow',
    default: 'default w-full flex flex-row justify-center items-center',
    active: 'active ',
  }
  const [loadState, setLoadState] = useState<boolean>(false);

  const renderDefaultData = () => {
    return <div className={tailwindClasses.default}>
    asd
    </div>
  }
  const renderActiveData = () => {
    return <div className={tailwindClasses.active}>
    asd
    </div>
  }

  // useEffect(() => {

  // }, [activeManager])

  return (
    <div className={tailwindClasses.container}>
      {loadState && <LoaderComponent />}
      <div className={tailwindClasses.widget}>
        {activeManager ? renderActiveData() : renderDefaultData()}
      </div>
    </div>
  )
}

type PageProps = {
  activeManager?: UserType,
  height?: string
}
ManagerWidget.defaultProps = {
  height: '20vh'
}