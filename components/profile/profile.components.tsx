import * as React from 'react';
import { Avatar } from '@mui/material';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Card from '@mui/material/Card';

export default function Profile() {
  const tailwindClasses = {
    avatar:
      'w-[130px] h-[130px] md:w-[160px] md:h-[160px] md:mr-[460px]  lg:mr-[1100px] lg:w-[200px] lg:h-[200px] ',
    addCloseIcon:
      'addCloseIcon w-[30px] h-[30px] text-white  bg-[#0E2040] pt-[-10px]  rounded-[10px] ml-[285px] md:mr-[10px] md:flex md:justify-center',
    main_card: 'flex justify-center bg-[#FFFF] h-[auto] ',

    main_cardContent:
      ' bg-[#FAF9F9] h-full md:h-[800px] w-auto  mt-[80px]   rounded-lg shadow-xl  md:w-full md:h-[auto] md:mt-[0]     ',
    infoSection_div: ' pt-[60px]',
    sectionText:
      'text-sm leading-normal mt-0 mb-2 text-blueGray-400 pl-[13px]  uppercase md:pl-[30px]',
    infoCard: 'mt-[60px] md:mt-[80px] md:pt-0 ',
    utilizationCard: 'mt-[20px] md:w-[50%] md:pr-[10px] md:pl:-[10px] ',
    skillSummarryCard: 'mt-[20px] h-auto md:w-[50%] md:pr-[10px] md:pl:-[10px]',
    typographyInfocard_name:
      'text-[22px] text-blueGray-400 flex justify-center    md:text-[32px] md:pt-[10px]  md:flex md:justify-center lg:pr-[595px]',
    cardContentInfocard_level:
      'md:grid md:grid-cols-2 md:divide-x md:pr-[90px]  lg:grid lg:grid-cols-3 lg:divide-x lg:pr-[430px] ',
    typographyInfocard_level:
      'text-sm  leading-normal  text-blueGray-400  uppercase flex justify-center md:ml-[170px] lg:ml-[210px]  ',
    typographyInfocard_capability:
      'text-sm leading-normal   text-blueGray-400  uppercase flex justify-center md:pr-[70px]  lg:pr-[100px] ',
  };
  return (
    <Card className={tailwindClasses.main_card}>
      <CardContent className={tailwindClasses.main_cardContent}>
        <Card className={tailwindClasses.infoCard}>
          <CardContent>
            <Typography className={tailwindClasses.typographyInfocard_name}>
              Juan Dela Cruz
            </Typography>
            <CardContent className={tailwindClasses.cardContentInfocard_level}>
              <Typography className={tailwindClasses.typographyInfocard_level}>
                Analyst
              </Typography>
              <Typography
                className={tailwindClasses.typographyInfocard_capability}
              >
                Front End Developer
              </Typography>
            </CardContent>
          </CardContent>
        </Card>
        <div className='md:flex '>
          <Card className={tailwindClasses.utilizationCard}>
            <>
              <CardContent>
                <Typography className={tailwindClasses.sectionText}>
                  Utilization Status:
                  <span> N/A</span>
                </Typography>
                <Typography className={tailwindClasses.sectionText}>
                  Availability:
                  <span> N/A</span>
                </Typography>
                <Typography className={tailwindClasses.sectionText}>
                  Delivery Manager:
                  <span> Arlene Eco</span>
                </Typography>
              </CardContent>

              <CardContent className=' md:pl-[30px] '>
                <Accordion className=''>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className=''>Current Projects</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>ACM</Typography>
                  </AccordionDetails>
                </Accordion>
                <Accordion className=''>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls='panel1a-content'
                    id='panel1a-header'
                  >
                    <Typography className=''>Project Experiences</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>Origin</Typography>
                    <Typography>CPA</Typography>
                    <Typography>Flight Centre Asutalia</Typography>
                  </AccordionDetails>
                </Accordion>
              </CardContent>
            </>
          </Card>

          <Card className={tailwindClasses.skillSummarryCard}>
            <CardContent className=' md:top-0 md:right-0'>
              <div className='flex justify-center pb-[20px] '>
                <span className='pt-[11px] '>
                  <hr className='w-[90px]   ' />
                </span>
                <h1>Skill Summary</h1>
                <span className='pt-[11px]'>
                  <hr className='w-[90px] md:w-[80px]' />
                </span>
              </div>
              <Accordion className=' '>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography className=''>Primary Skill</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>React JS</Typography>
                </AccordionDetails>
              </Accordion>

              <Accordion className=''>
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls='panel1a-content'
                  id='panel1a-header'
                >
                  <Typography className=''>Secondary Skills</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography>Figma</Typography>
                  <Typography>Adobe</Typography>
                  <Typography>Canva</Typography>
                  <Typography>Canva</Typography>
                  <Typography>Canva</Typography>
                </AccordionDetails>
              </Accordion>
            </CardContent>
          </Card>
        </div>
      </CardContent>

      <div className='absolute z-10  pt-[15px]     '>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          className={tailwindClasses.avatar}
        />
      </div>
    </Card>
  );
}
