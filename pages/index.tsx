import Head from 'next/head';
import Image from 'next/image';
import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import { getSkills } from '../services/skill.service';
import { accessUserInSession } from '../services/user.service';
import { AccountType } from '../types/MasterTypes.types';
import PageBanner from '../components/pageBanner/pageBanner.component';
import ButtonComponent from '../components/ButtonComponent';
import DeleteIcon from '@mui/icons-material/Delete';

import HomeSVG from '../public/assets/images/home-alt.svg';
import {
  Button,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from '@mui/material';
import CardComponents from '../components/cardComponents';

import styles from '../styles/Home.module.css';
import { setuid } from 'process';
import PopupComponent from '../components/PopupComponent';

const Home: NextPage = () => {
  //state to show popup component
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };
  //let user: AccountType = accessUserInSession();
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    role: '',
  });
  const tailwindClasses = {
    container: 'index-container',
    customBanner:
      'h-full w-full bg-[rgba(0,0,0,0.2)] md:bg-[transparent] flex z-[2]',
    profilePicture: 'w-[30%]',
    nameContainer:
      'flex-grow flex flex-col justify-center items-center md:justify-start md:items-start md:pl-[5rem]',
    nameh1: 'text-[3rem] m-0 z-[10] flex flex-row gap-2  md:items-end',
    nameh2: 'text-[1rem] m-0 uppercase z-[10] md:hidden',
    firstName: 'md:text-[5rem]',
    lastName: 'md:text-[2rem]',
    body: 'mt-[225px] flex flex-col items-center justify-center flex-grow h-full',
    bodyImage: 'h-[250px] w-[250px]',
  };

  useEffect(() => {
    setUser(accessUserInSession());
  }, []);

  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4} lg={4}>
        <CardComponent
          actions={
            <Button size='small'>sample</Button>
          }
          content={
            <>
              <Typography
                sx={{ fontSize: 14 }}
                color='text.secondary'
                gutterBottom
              >
                Word of the Day
              </Typography>
              <Typography sx={{ mb: 1.5 }} color='text.secondary'>
                adjective
              </Typography>
              <Typography variant='body2'>
                well meaning and kindly.
                <br />
                {'"a benevolent smile"'}
              </Typography>
            </>
          }
        />
        {/* <CardComponents>
          <CardContent>
            <Typography
              sx={{ fontSize: 14 }}
              color='text.secondary'
              gutterBottom
            >
              Word of the Day
            </Typography>
            <Typography sx={{ mb: 1.5 }} color='text.secondary'>
              adjective
            </Typography>
            <Typography variant='body2'>
              well meaning and kindly.
              <br />
              {'"a benevolent smile"'}
            </Typography>
          </CardContent>
          <CardActions>
            <Button size='small'>sample</Button>
          </CardActions>
        </CardComponents> */}
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <p className=''>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolores
          dolorem laborum repellat quam odit molestiae. Consequuntur incidunt
          eaque atque maiores vel. Tempora quibusdam repudiandae veniam aperiam
          suscipit, est similique quasi!
        </p>
        <Button className=' mt-8'>test button</Button>
      </Grid>
      <Grid item xs={12} md={4} lg={4}>
        <p className=''>
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatum
          expedita reprehenderit cumque voluptates, earum porro ex voluptas cum
          similique illum quam perferendis neque modi tempora quae quas
          consectetur non eum?
        </p>
      </Grid>
    </Grid>
    // <div className={`${styles.container} ${tailwindClasses.container}`}>
    //   <PageBanner
    //     content={
    //       <div className={tailwindClasses.customBanner}>
    //         <div className={tailwindClasses.nameContainer}>
    //           <div className={tailwindClasses.nameh1}>
    //             <span className={tailwindClasses.firstName}>
    //               {user?.firstName || ""}
    //             </span>
    //             <span className={tailwindClasses.lastName}>
    //               {user?.lastName || ""}
    //             </span>
    //           </div>
    //           <h2 className={tailwindClasses.nameh2}>{user?.role || ""}</h2>
    //         </div>
    //         <div
    //           className={`${tailwindClasses.profilePicture} hidden md:flex`}
    //         ></div>
    //       </div>
    //     }
    //   />
    //   <div className={tailwindClasses.body}>
    //     <div className="">Introduction to Admin Home</div>
    //     <div>
    //       <Button variant="text">test button</Button>
    //     </div>
    //     <div>
    //       <CardComponents>
    //         <CardContent>
    //           <Typography
    //             sx={{ fontSize: 14 }}
    //             color="text.secondary"
    //             gutterBottom
    //           >
    //             Word of the Day
    //           </Typography>
    //           <Typography sx={{ mb: 1.5 }} color="text.secondary">
    //             adjective
    //           </Typography>
    //           <Typography variant="body2">
    //             well meaning and kindly.
    //             <br />
    //             {'"a benevolent smile"'}
    //           </Typography>
    //         </CardContent>
    //         <CardActions>
    //           <Button size="small">sample</Button>
    //         </CardActions>
    //       </CardComponents>
    //     </div>
    //   </div>
    // </div>
  );
};

export default Home;
