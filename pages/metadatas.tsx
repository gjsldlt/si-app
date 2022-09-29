import { useState, useEffect } from 'react';
import MetadataComponent from '../components/metadata/metadata.component';

import { Box, Grid } from '@mui/material';

import { MetadataType } from '../types/MasterTypes.types';
import ButtonComponent from '../components/ButtonComponent';
import { minHeight } from '@mui/system';

const MetadataPage = () => {
  const [activeSkill, setActiveSkill] = useState<MetadataType>();
  const [activeCapability, setActiveCapability] = useState<MetadataType>();
  const [activeIndustry, setActiveIndustry] = useState<MetadataType>();
  const [activeMobileTab, setActiveMobileTab] = useState<string>('Skills');
  const [isMobile, setIsMobile] = useState<boolean>(false);
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
    window.addEventListener("resize", handleResize);
    handleResize();
  })



  return (
    <>
      <Box
        sx={{
          pt: { xs: 1, md: 0 },
          backgroundColor: '#F7F7F7',
          display: 'flex',
          flex: "1 0",
          flexDirection: 'column',
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
            p: { xs: 1, sm: 2 },
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
