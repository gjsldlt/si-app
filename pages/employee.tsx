import Link from 'next/link';
import { useRouter } from 'next/router';

import PageBanner from '../components/pageBanner/pageBanner.component';

function Employee() {
  const router = useRouter();
  const { employee } = router.query;
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content: 'mt-[215px] pl-[2rem]',
    header: 'text-2xl text-white z-[5] ',
  };

  return (
    <>
      <PageBanner
        content={
          <div className={tailwindClasses.customBanner}>
            <h1 className={tailwindClasses.header}>Employee Home</h1>
          </div>
        }
      />
      <div className={tailwindClasses.content}>
        <p>
          <a href={`/employee/react`}>React Skill</a>
          <br />
          <a href={`/employee/angular`}>Angular Skill</a>
        </p>
      </div>
    </>
  );
}

export default Employee;
