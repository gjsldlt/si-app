import { Grid } from '@mui/material';
import React, { FC } from 'react';

type DashboardType = {
  cards: {
    title: string;
    icon: any;
    total: number;
  }[];
};

const Dashboard: FC<DashboardType> = ({ cards }) => {
  return (
    <Grid
      container
      className='bg-[#0E2040] justify-center -mt-2 md:mt-0 rounded-b-lg md:rounded-lg py-10 md:pt-14 md:pb-12 md:px-12'
    >
      <div className='flex flex-wrap max-w-[362px] md:min-w-[546px] md:max-w-none justify-between md:justify-evenly gap-y-7 w-full'>
        {cards.map((item, index) => (
          <div
            key={index}
            className='text-black  md:w-48 md:h-44 bg-white rounded-3xl'
          >
            <div className='bg-main rounded-2xl px-6 py-2 w-10 -mt-5 ml-2 text-white flex justify-center'>
              {item.icon}
            </div>
            <div className='w-full p-4 flex flex-col items-center justify-center'>
              <div className='text-center font-semibold text-xs'>
                TOTAL NUMBER OF<br />{item.title}
              </div>
              <div className='text-2xl md:text-6xl font-bold'>{item.total}</div>
            </div>
          </div>
        ))}
      </div>
    </Grid>
  );
};

export default Dashboard;
