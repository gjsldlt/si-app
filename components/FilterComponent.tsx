import { FC } from 'react'
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography } from '@mui/material';
import { CardType, FilterType } from '../types/ComponentTypes.type';

const FilterComponent: FC<FilterType> = ({ title, content }) => {
  return (
    <Card
      sx={{
        borderRadius: '10px'
      }}
    >
      <CardActions sx={{ p: 1, display: 'flex' }}>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 700 }}
          variant='h5'
          component='div'
        >
          {title}
        </Typography>
      </CardActions>
      <CardContent>
        {content}
      </CardContent>
    </Card>
  )
}

export default FilterComponent;