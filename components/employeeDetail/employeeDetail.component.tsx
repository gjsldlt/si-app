import { useState, useEffect } from 'react';

import styles from './employeeDetail.module.scss';

export default function EmployeeDetail({ employee }: PageProps) {
  const tailwindClasses = {
    container: 'container relative flex flex-grow flex-col bg-white p-1 min-h-[200px] md:h-full md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg',
    toolbar: 'toolbar flex flex-row',
    title: 'title flex-1',
  }
  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Employee Detail</p>
      </div>
    </div>
  )
}

type PageProps = {
  employee: any
}