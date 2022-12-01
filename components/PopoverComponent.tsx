import React, { FC } from 'react';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import { PopoverType } from "../types/ComponentTypes.type";

const PopoverComponent: FC<PopoverType> = ({
}) => {
  return (
    <FormControl sx={{
      p: 2
    }}>
      <FormLabel>Filters</FormLabel>
      <RadioGroup
        defaultValue="name"
        sx={{
          p: 2
        }}
      >
        <FormControlLabel value="name" control={<Radio />} label="Name" />
        <FormControlLabel value="description" control={<Radio />} label="Description" />
      </RadioGroup>
    </FormControl>)

}

export default PopoverComponent