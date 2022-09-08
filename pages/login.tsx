import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

import AccentBar from '../components/accentBar/accentBar.component';
import Form from '../components/loginRegisterForm/loginRegister.component';

import logoDesktopTablet from '../public/assets/images/shared/deloitte-logo-desktop-tablet.png';
import logoiFED from '../public/assets/images/logo-ifed.png';

const tailwindClasses = {
  backgroundProperties: `bg-[url('../public/assets/images/background-login-register-mobile.jpg')] md:bg-[url('../public/assets/images/background-login-register-tablet.jpg')] lg:bg-[url('../public/assets/images/background-login-register-desktop-xl.jpg')] lg:bg-black bg-center lg:bg-right bg-no-repeat bg-cover h-100vh flex justify-center w-[100vw]`,
  logoContainer: `lg:flex flex-col items-center justify-center flex-wrap lg:w-1/3 lg:h-screen lg:bg-black hidden`,
  spanSpacing: `mt-[50px]`,
  title: `flex justify-center text-white text-[128px] font-bold`,
  mainContainer: `flex justify-center items-center lg:w-2/3`,
};

const Home: NextPage = () => {
  return (
    <div className={`${tailwindClasses.backgroundProperties}`}>
      <Head>
        <title>iFED</title>
        <meta
          name='description'
          content='Deloitte Consulting Philippines Delivery Center'
        />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <AccentBar />
      <div className={`${tailwindClasses.logoContainer}`}>
        <Image
          src={logoDesktopTablet}
          alt='Deloitte Logo'
          width={235}
          height={52.75}
        />
        <span className={`${tailwindClasses.spanSpacing}`}></span>
        <Image src={logoiFED} alt='iFED Logo' width={175} height={175} />
        <h1 className={`${tailwindClasses.title}`}>iFED</h1>
      </div>
      <main className={`${tailwindClasses.mainContainer}`}>
        <Form />
      </main>
    </div>
  );
};

export default Home;
