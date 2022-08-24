import Link from "next/link";
import { useState } from "react";

import PageBanner from "../components/pageBanner/pageBanner.component";
import Skills from "../components/skills/skills.component";
import Capability from "../components/capability/capability.component";
import Industry from "../components/industries/industries.component";
import SkillComponent from '../components/skills/skills.component';

function Metadata() {
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
  const [activeSkill, setActiveSkill] = useState(undefined);
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
          )
          )
        }
      </div>


      <div className={tailwindClasses.content}>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Skills' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <SkillComponent role="skills" activeMetadata={activeSkill} onMetadataClick={setActiveSkill} enableRowActions={true} />
        </div>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Capabilities' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <Capability />
        </div>
        <div className={`${tailwindClasses.box} ${activeMobileTab === 'Industries' ? tailwindClasses.mobileBoxShow : tailwindClasses.mobileBoxHidden}`}>
          <Industry />
        </div>
      </div>
    </>
  );
}

export default Metadata;

