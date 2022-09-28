import { CircularProgress, Grid } from '@mui/material';
import React, { FC } from 'react';

type GraphType = {
    title:string;
  percent: number;
};

const GraphCard: FC<GraphType> = ({ percent, title }) => {
  return (
    <Grid className='rounded-xl bg-white drop-shadow-lg p-5 relative' xs={12} md={4}>
      <div>{title}</div>
      <div className='relative flex justify-center top-[40%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
        <CircularProgress
          variant='determinate'
          className='absolute z-30'
          thickness={5}
          value={100 - percent}
          size={250}
        />
        <CircularProgress
          className='text-[#86c9f0]'
          variant='determinate'
          thickness={5}
          value={100}
          size={250}
        />
        <div className='text-[#86c9f0] font-bold text-6xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]'>
          {percent}%
        </div>
      </div>
      <div className='mt-9 flex gap-x-2'>
        <div className='flex items-center text-xs gap-x-2 uppercase'>
          <div className='min-w-[20px] min-h-[20px] bg-[#86c9f0] rounded-full'></div>
          {title}
        </div>
        <div className='flex items-center text-xs gap-x-2'>
          <div className='min-w-[20px] min-h-[20px] bg-main rounded-full'></div>
          TOTAL EMPLOYEES
        </div>
      </div>
    </Grid>
  );
};

export default GraphCard;
