import * as React from 'react';
import { Avatar } from '@mui/material';
import CreateIcon from '@mui/icons-material/Create';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from '@heroicons/react/solid';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// const avatarStyle = {
//   width: '100px',
//   height: '100px',
// };

export default function Profile() {
  const tailwindClasses = {
    addCloseIcon:
      'addCloseIcon w-[30px] h-[30px] text-white  bg-[#0E2040] pt-[-10px]  rounded-[10px] ml-[285px] md:right-0 md:mt-[35px]',
    main_div: 'flex justify-center bg-[#FAF9F9] w-full h-full',

    personalInformation_div:
      'bg-[#FFFF] h-full w-[340px] mt-[80px]   rounded-lg shadow-xl  md:w-full md:h-[700px] lg:w-[850px]  lg:mt-[160px] lg:pt-[50px] lg:h-full md:relative ',
    infoSection_div: ' pt-[60px]',
    sectionText:
      'text-sm leading-normal mt-0 mb-2 text-blueGray-400 pl-[30px]  uppercase',
  };
  return (
    <div className={tailwindClasses.main_div}>
      <div className={tailwindClasses.personalInformation_div}>
        {/* perosnal informartion div */}
        <div className={tailwindClasses.infoSection_div}>
          {/* information section */}
          <div className='md:mt-[-130px] '>
            <div>
              <h1 className='text-[22px]  text-blueGray-400   flex justify-center pt-[20px] md:text-[32px] md:pt-[90px]  lg:pr-[655px]'>
                Juan Dela Cruz
              </h1>
            </div>
            <div className='md:grid md:grid-cols-2 md:divide-x md:mr-[90px] '>
              <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400  uppercase flex justify-center md:ml-[220px] lg:pr-[735px] '>
                Analyst
              </div>
              <div className='text-sm leading-normal mt-0 mb-2 text-blueGray-400  uppercase flex justify-center md:pr-[120px]  lg:pr-[630px]'>
                Front End Developer
              </div>
            </div>
          </div>

          <div className='pt-[40px] md:mt-[40px] bg-[#FAF9F9] md:w-[330px] md:h-[210px] md:pb-[80px]'>
            <div className={tailwindClasses.sectionText}>
              Utilization Status:
              <span> N/A</span>
            </div>
            <div className={tailwindClasses.sectionText}>
              Availability:
              <span> N/A</span>
            </div>
            <div className={tailwindClasses.sectionText}>
              Delivery Manager:
              <span> Arlene Eco</span>
            </div>
            <PlusIcon className={tailwindClasses.addCloseIcon} />
          </div>

          <div className='pt-[30px] mt-[30px] pb-[30px] bg-[#FAF9F9]  h-full mb-[20px] w-[340px]  flex justify-center md:absolute  md:top-[20px] md:right-0 md:mt-[120px] md:w-[330px] md:h-auto md:rounded-r-lg lg:h-full lg:mt-[160px] lg:mr-[50px]'>
            <div className=' md:top-0 md:right-0'>
              <div className='flex justify-center pb-[20px] '>
                <span className='pt-[11px] '>
                  <hr className='w-[90px]  ' />
                </span>
                <h1>Skill Summary</h1>
                <span className='pt-[11px]'>
                  <hr className='w-[90px] ' />
                </span>
              </div>
              <Accordion className='w-[300px] shadow-2sl border border-black-600 '>
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

              <Accordion className='w-[300px] border border-black-600'>
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
            </div>
          </div>
        </div>
      </div>

      <div className='absolute z-10  pt-[15px]     '>
        <Avatar
          alt='Remy Sharp'
          src='/static/images/avatar/1.jpg'
          // sx={avatarStyle}
          className='w-[130px] h-[130px] md:w-[160px] md:h-[160px] md:mr-[460px] lg:mr-[920px] lg:w-[200px] lg:h-[200px]'
        />
      </div>
    </div>
  );
}
