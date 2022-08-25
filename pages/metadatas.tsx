import Link from "next/link";
import { useState } from "react";

import PageBanner from "../components/pageBanner/pageBanner.component";

import MetadataComponent from "../components/metadata/metadata.component";
import { Metadata } from '../types/MasterTypes.types';

const MetadataPage = () => {
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content: 'flex relative mx-1 md:mx-0 md:mr-4 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow',
    header: 'text-2xl text-white z-[5]',
    box: 'flex flex-grow overflow-auto ',
    mobileBoxShow: 'flex',
    mobileBoxHidden: 'md:flex hidden',
    mobileTab: 'md:hidden ',
    mobileTabOption: ''
  }
  const [activeSkill, setActiveSkill] = useState<Metadata>();
  const [activeCapability, setActiveCapability] = useState<Metadata>();
  const [activeIndustry, setActiveIndustry] = useState<Metadata>();
  const [activeMobileTab, setActiveMobileTab] = useState<String>('Skills');
  const mobileTabs = [
    "Skills",
    "Capabilities",
    "Industries"
  ]

  const onMobileTabClick = (tab: String) => {
    setActiveMobileTab(tab);
  }

  return (
    <>
      <PageBanner content={
        <div className={tailwindClasses.customBanner}>
          <h1 className={tailwindClasses.header}>Metadata List</h1>
        </div>
      }
      />

      <div className={tailwindClasses.mobileTab}>
        {
          mobileTabs.map((tab, index) => (
            <div
              key={`mobile-tab-${index}`}
              className={tailwindClasses.mobileTab}
              onClick={(e) => onMobileTabClick(tab)}>
              {tab}
            </div>
          ))
        }
      </div>


      <div className={tailwindClasses.content}>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="skill" activeMetadata={activeSkill} onMetadataClick={setActiveSkill} enableRowActions={true} />
        </div>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="capability" activeMetadata={activeCapability} onMetadataClick={setActiveCapability} enableRowActions={true} />
        </div>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="industry" activeMetadata={activeIndustry} onMetadataClick={setActiveIndustry} enableRowActions={true} />
        </div>
      </div>
    </>
  );
}

export default MetadataPage;

