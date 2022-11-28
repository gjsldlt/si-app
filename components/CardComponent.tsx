import React, { FC, ChangeEvent } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Container, Pagination, TextField } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

import { CardType } from '../types/ComponentTypes.type';

import ButtonComponent from './ButtonComponent';

const CardComponent: FC<CardType> = ({
  title,
  actions,
  content,
  pageCount,
  setCurrentPage
}) => {

  const pageChangeHandler = (event: ChangeEvent<unknown>, pageNumber = 1) => {
    console.log("current page: " + pageNumber)
    if (setCurrentPage !== undefined) {
      setCurrentPage(pageNumber - 1);
    }
  }

  return (
    <Card
      sx={{
        borderRadius: '10px',
        minWidth: 275,
        height: '100%',
        margin: { xs: 2, sm: 0 }
      }}>
      <CardActions
        sx={{
          p: 2,
          display: 'flex'
        }}>
        <Typography
          sx={{
            fontSize: '14px',
            fontWeight: 700
          }}
          variant='h5'
          component='div'
        >
          {title}
        </Typography>
        <Container
          sx={{
            p: 0,
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
          disableGutters
        >
          <TextField
            label='Search'
            variant='outlined'
            margin='none'
            size='small'
            inputProps={{
              style: {
                fontSize: 12
              }
            }}
            InputLabelProps={{
              style: {
                fontSize: 12
              }
            }}
          />
          <ButtonComponent
            style='icon'
            text={['Search']}
            color={'#0E2040'}
            icon={<SearchIcon />}
          />
          <ButtonComponent
            style='icon'
            text={['Filter']}
            color={'#0E2040'}
            icon={<TuneIcon />}
            filter={true}
          />
          {actions}
        </Container>
      </CardActions>
      <CardContent sx={{ p: 0, height: '85%', overflow: 'auto' }}>
        {content}
      </CardContent>
      <CardActions>
        <Pagination onChange={(event, pageNumber) => pageChangeHandler(event, pageNumber)} sx={{ padding: 1, margin: 'auto' }} count={pageCount} size="small" />
      </CardActions>
    </Card>
  );
};

export default CardComponent;
