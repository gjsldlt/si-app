import { useState } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import MetadataComponent from '../components/metadata/metadata.component';

import { Container, Typography, Grid } from '@mui/material';

import { MetadataType } from '../types/MasterTypes.types';

const MetadataPage = () => {
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content:
      'flex relative md:mx-0 md:mr-4 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow h-full mb-1',
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
  const [activeSkill, setActiveSkill] = useState<MetadataType>();
  const [activeCapability, setActiveCapability] = useState<MetadataType>();
  const [activeIndustry, setActiveIndustry] = useState<MetadataType>();
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
      <PageBanner
        content={
          <Container
            sx={{
              p: 0,
              height: '15vh',
              width: '100%',
              display: 'flex',
              alignItems: 'center',
            }}
            maxWidth={false}
          >
            <Typography sx={{ zIndex: '5' }} variant='h4' component='h4'>
              Metadata List
            </Typography>
          </Container>
        }
      />

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

      <Grid
        container
        spacing={2}
        sx={{
          p: 2,
          backgroundColor: '#F7F7F7',
          minHeight: '70vh'
        }}
      >
        <Grid item xs={12} md={4}>
          <MetadataComponent
            type='skill'
            activeMetadata={activeSkill}
            onMetadataClick={setActiveSkill}
            enableRowActions={true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetadataComponent
            type='capability'
            activeMetadata={activeCapability}
            onMetadataClick={setActiveCapability}
            enableRowActions={true}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <MetadataComponent
            type='industry'
            activeMetadata={activeIndustry}
            onMetadataClick={setActiveIndustry}
            enableRowActions={true}
          />
        </Grid>
      </Grid>
    </>
  );
};

export default MetadataPage;
