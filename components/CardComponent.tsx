import { FC } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Container, Pagination } from '@mui/material';

import { CardType } from '../types/ComponentTypes.type';

const CardComponent: FC<CardType> = ({ title, actions, content, pageCount }) => {
  return (
    <Card
      sx={{
        borderRadius: '10px',
        minWidth: 275,
        height: '100%',
        margin: { xs: 2, sm: 0 }
      }}>
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
      <CardContent sx={{ p: 0, height: '60vh', overflow: 'auto' }}>{content}</CardContent>
      <CardActions>
        <Pagination sx={{ padding: 1, margin: 'auto' }} count={pageCount} size="small" />
      </CardActions>
    </Card>
  );
};

export default CardComponent;
