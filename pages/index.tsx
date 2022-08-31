import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";

import { getSkills } from "../services/skill.service";
import { accessUserInSession } from "../services/user.service";
import { AccountType } from "../types/MasterTypes.types";
import PageBanner from "../components/pageBanner/pageBanner.component";

import HomeSVG from "../public/assets/images/home-alt.svg";

import styles from "../styles/Home.module.css";
import { setuid } from "process";
import { Button } from "@mui/material";

const Home: NextPage = () => {
  //let user: AccountType = accessUserInSession();
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    role: "",
  });
  const tailwindClasses = {
    container: "index-container",
    customBanner:
      "h-full w-full bg-[rgba(0,0,0,0.2)] md:bg-[transparent] flex z-[2]",
    profilePicture: "w-[30%]",
    nameContainer:
      "flex-grow flex flex-col justify-center items-center md:justify-start md:items-start md:pl-[5rem]",
    nameh1: "text-[3rem] m-0 z-[10] flex flex-row gap-2  md:items-end",
    nameh2: "text-[1rem] m-0 uppercase z-[10] md:hidden",
    firstName: "md:text-[5rem]",
    lastName: "md:text-[2rem]",
    body: "mt-[225px] flex flex-col items-center justify-center flex-grow h-full",
    bodyImage: "h-[250px] w-[250px]",
  };

  // const populateSkills = async () => {
  //   let data = await getSkills();
  //   return data;
  // }

  useEffect(() => {
    setUser(accessUserInSession());
    // populateSkills();
    // useFetchSkills;
  }, []);

  return (
    <div className={`${styles.container} ${tailwindClasses.container}`}>
      <PageBanner
        content={
          <div className={tailwindClasses.customBanner}>
            <div className={tailwindClasses.nameContainer}>
              <div className={tailwindClasses.nameh1}>
                <span className={tailwindClasses.firstName}>
                  {user?.firstName || ""}
                </span>
                <span className={tailwindClasses.lastName}>
                  {user?.lastName || ""}
                </span>
              </div>
              <h2 className={tailwindClasses.nameh2}>{user?.role || ""}</h2>
            </div>
            <div
              className={`${tailwindClasses.profilePicture} hidden md:flex`}
            ></div>
          </div>
        }
      />
      <div className={tailwindClasses.body}>
        <div className={tailwindClasses.bodyImage}>
          {/* <img src={HomeSVG.src} /> */}
        </div>
        <div className="">Introduction to Admin Home</div>
        <div>
          <Button variant="text">test button</Button>
        </div>
      </div>
    </div>
  );
};

export default Home;
