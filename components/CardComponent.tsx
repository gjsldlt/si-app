import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Container } from '@mui/material';

import { CardType } from '../types/ComponentTypes.type';

const CardComponent: FC<CardType> = ({ title, actions, content }) => {
  return (
    <Card sx={{ borderRadius: '10px' }}>
      <CardActions sx={{ p: 1, display: 'flex' }}>
        <Typography
          sx={{ fontSize: '14px', fontWeight: 700 }}
          variant='h5'
          component='div'
        >
          {title}
        </Typography>
        <Container
          sx={{ p: 0, display: 'flex', justifyContent: 'flex-end' }}
          disableGutters
        >
          {actions}
        </Container>
      </CardActions>
      <CardContent sx={{ p: 0, maxHeight: '32vw', overflow: 'auto' }}>{content}</CardContent>
    </Card>
  );
};

export default CardComponent;
