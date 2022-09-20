import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import MetadataComponent from '../components/metadata/metadata.component';

import { Box, Container } from '@mui/material';

import { Metadata } from '../types/MasterTypes.types';

const MetadataPage = () => {
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content:
      'flex relative mx-1 md:mx-0 md:mr-4 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow h-full mb-1',
    header: 'text-2xl text-white z-[5]',
    box: 'flex flex-grow overflow-auto ',
    mobileBoxShow: 'flex',
    mobileBoxHidden: 'md:flex hidden',
    mobileTab: 'md:hidden flex justify-center',
    mobileTabOption: '',
    formButton:
      'm-[10px] font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
    formButtonActive: 'bg-sidebar text-white',
    formButtonInactive:
      'bg-transparent text-white hover:bg-sidebar text-sidebar',
  };
  const [activeSkill, setActiveSkill] = useState<Metadata>();
  const [activeCapability, setActiveCapability] = useState<Metadata>();
  const [activeIndustry, setActiveIndustry] = useState<Metadata>();
  const [activeMobileTab, setActiveMobileTab] = useState<string>('Skills');
  const mobileTabs = ['Skills', 'Capabilities', 'Industries'];

  const onMobileTabClick = (tab: string) => {
    setActiveMobileTab(tab);
    setActiveCapability(undefined);
    setActiveIndustry(undefined);
    setActiveSkill(undefined);
  };

  return (
    <>
      {/* <PageBanner
        content={
          <div className={tailwindClasses.customBanner}>
            <h1 className={tailwindClasses.header}>Metadata List</h1>
          </div>
        }
      /> */}

      <div className={tailwindClasses.mobileTab}>
        {mobileTabs.map((tab, index) => (
          <div
            key={`mobile-tab-${index}`}
            className={tailwindClasses.mobileTab}
            onClick={() => onMobileTabClick(tab)}
          >
            <button className={tailwindClasses.formButton}>{tab}</button>
          </div>
        ))}
      </div>

      <Box
        sx={{
          pt: 2,
          pb: 2,
          pr: 2,
          display: 'flex',
          alignItems: 'stretch',
          flex:'1 0',
          height:'100%'
        }}
      >
        <Container
          sx={{ display: 'flex', pl: '16px', flexGrow: 1 }}
          disableGutters
        >
          <MetadataComponent
            type='skill'
            activeMetadata={activeSkill}
            onMetadataClick={setActiveSkill}
            enableRowActions={true}
          />
        </Container>
        <Container
          sx={{ display: 'flex', pl: '16px', flexGrow: 1 }}
          disableGutters
        >
          <MetadataComponent
            type='capability'
            activeMetadata={activeCapability}
            onMetadataClick={setActiveCapability}
            enableRowActions={true}
          />
        </Container>
        <Container
          sx={{ display: 'flex', pl: '16px', flexGrow: 1 }}
          disableGutters
        >
          <MetadataComponent
            type='industry'
            activeMetadata={activeIndustry}
            onMetadataClick={setActiveIndustry}
            enableRowActions={true}
          />
        </Container>
      </Box>
    </>
  );
};

export default MetadataPage;
