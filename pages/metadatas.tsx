import { useState } from "react";

import PageBanner from "../components/pageBanner/pageBanner.component";
import MetadataComponent from "../components/metadata/metadata.component";

import { Box } from "@mui/material";

import { Metadata } from '../types/MasterTypes.types';

const MetadataPage = () => {
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content: 'flex relative mx-1 md:mx-0 md:mr-4 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow h-full mb-1',
    header: 'text-2xl text-white z-[5]',
    box: 'flex flex-grow overflow-auto ',
    mobileBoxShow: 'flex',
    mobileBoxHidden: 'md:flex hidden',
    mobileTab: 'md:hidden flex justify-center',
    mobileTabOption: '',
    formButton: 'm-[10px] font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
    formButtonActive: 'bg-sidebar text-white',
    formButtonInactive: 'bg-transparent text-white hover:bg-sidebar text-sidebar',
  }
  const [activeSkill, setActiveSkill] = useState<Metadata>();
  const [activeCapability, setActiveCapability] = useState<Metadata>();
  const [activeIndustry, setActiveIndustry] = useState<Metadata>();
  const [activeMobileTab, setActiveMobileTab] = useState<string>('Skills');
  const mobileTabs = [
    "Skills",
    "Capabilities",
    "Industries"
  ]

  const onMobileTabClick = (tab: string) => {
    setActiveMobileTab(tab);
    setActiveCapability(undefined);
    setActiveIndustry(undefined);
    setActiveSkill(undefined);
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
              onClick={() => onMobileTabClick(tab)}>
              <button className={tailwindClasses.formButton}>
                {tab}
              </button>
            </div>
          ))
        }
      </div>

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'row' }}>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Skills' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <MetadataComponent type="skill" activeMetadata={activeSkill} onMetadataClick={setActiveSkill} enableRowActions={true} />
        </div>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Capabilities' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <MetadataComponent type="capability" activeMetadata={activeCapability} onMetadataClick={setActiveCapability} enableRowActions={true} />
        </div>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Industries' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <MetadataComponent type="industry" activeMetadata={activeIndustry} onMetadataClick={setActiveIndustry} enableRowActions={true} />
        </div>
      </Box>
    </>
  );
}

export default MetadataPage;




