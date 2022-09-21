import { useState, useEffect } from 'react';

import PageBanner from '../components/pageBanner/pageBanner.component';
import MetadataComponent from '../components/metadata/metadata.component';

import { Container, Box, Grid } from '@mui/material';

import { MetadataType } from '../types/MasterTypes.types';
import ButtonComponent from '../components/ButtonComponent';

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
  const [isMobile, setIsMobile] = useState<boolean>();
  const mobileTabs = ['Skills', 'Capabilities', 'Industries'];

  const onMobileTabClick = (tab: string) => {
    setActiveMobileTab(tab);
    console.log("tab: " + activeMobileTab);
    setActiveCapability(undefined);
    setActiveIndustry(undefined);
    setActiveSkill(undefined);
  };

  const handleResize = () => {
    if (window.innerWidth < 900) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
  }

  useEffect(() => {
    window.addEventListener("resize", handleResize)
  })



  return (
    <>
      {/* <PageBanner
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
      /> */}


      <Box
        sx={{
          pt: { xs: 1, md: 0 },
          backgroundColor: '#F7F7F7',
          display: 'flex',
          flex: "1 0",
          flexDirection: 'column',
          height: '100%'
        }}
      >
        <Box
          justifyContent="center"
          sx={{
            px: { xs: 1 },
            display: { xs: "flex", md: "none" },
            alignItems: "center",
          }}
        >
          {mobileTabs.map((tab, index) => (
            <ButtonComponent text={[`${tab}`]}
              key={`mobile-tab-${index}`}
              type='button'
              handleClick={[() => onMobileTabClick(tab)]}
              variant='outlined'></ButtonComponent>
          ))}
        </Box>

        <Grid
          container
          spacing={2}
          sx={{
            p: { xs: 1, md: 2 }
          }}
        >
          <Grid
            item
            xs={12}
            md={4}
            display={((activeMobileTab === 'Skills') || (isMobile === false)) ?
              'block'
              : 'none'
            }
          >
            <MetadataComponent
              type='skill'
              activeMetadata={activeSkill}
              onMetadataClick={setActiveSkill}
              enableRowActions={true}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display={((activeMobileTab === 'Capabilities') || (isMobile === false)) ?
              'block'
              : 'none'
            }
          >
            <MetadataComponent
              type='capability'
              activeMetadata={activeCapability}
              onMetadataClick={setActiveCapability}
              enableRowActions={true}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={4}
            display={((activeMobileTab === 'Industries') || (isMobile === false)) ?
              'block'
              : 'none'
            }
          >
            <MetadataComponent
              type='industry'
              activeMetadata={activeIndustry}
              onMetadataClick={setActiveIndustry}
              enableRowActions={true}
            />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default MetadataPage;
