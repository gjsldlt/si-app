import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useEffect } from 'react';

import { getSkills } from '../services/skills.services';
import { accessUserInSession } from '../services/user.services';
import { UserDataType } from '../types/MasterTypes.types';
import PageBanner from '../components/pageBanner/pageBanner.component';


import styles from '../styles/Home.module.css'

const Home: NextPage = () => {
  let user: UserDataType = accessUserInSession();
  const tailwindClasses = {
    container: 'index-container',
    customBanner: 'h-full w-full bg-[rgba(0,0,0,0.2)] flex z-[2]',
    profilePicture: 'flex-1',
    nameContainer: 'flex-1',
  }

  const populateSkills = async () => {
    let data = await getSkills();
    return data;
  }

  useEffect(() => {
    populateSkills();
  }, [])

  return (
    <div className={`${styles.container} ${tailwindClasses.container}`}>
      <PageBanner content={
        <div className={tailwindClasses.customBanner}>
          <div className={tailwindClasses.nameContainer}>
            <h1>{user.firstName}</h1>
            <h2>{user.lastName}</h2></div>
          <div className={tailwindClasses.profilePicture}>
            picture
          </div>
        </div>
      } />
    </div>
  )
}

export default Home
