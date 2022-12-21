import React, { FC, useState, useCallback, ChangeEvent, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { Typography, Container, Pagination } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import CloseIcon from '@mui/icons-material/Close';

import { CardType } from '../types/ComponentTypes.type';

import ButtonComponent from './ButtonComponent';
import TextFieldComponent from './TextFieldComponent';

const CardComponent: FC<CardType> = ({
  title,
  actions,
  content,
  pageCount,
  setCurrentPage,
  searchFunction
}) => {

  const [searchTerm, setSearchTerm] = useState<string>('');

  const [searchingStatus, setSearchingStatus] = useState<boolean>(false);

  const searchInputChange = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    setSearchTerm(event.target.value);
  }, []);

  useEffect(() => {
    searchInputChange;
    setSearchingStatus(false);
  }, [searchInputChange, searchTerm])

  const pageChangeHandler = (event: ChangeEvent<unknown>, pageNumber = 1) => {
    if (setCurrentPage !== undefined) {
      setCurrentPage(pageNumber - 1);
    }
  }

  const searchHandler = () => {
    if (searchTerm !== '' && searchingStatus === false) {
      setSearchingStatus(true);
      searchFunction(searchTerm);

      console.log(searchingStatus)
    }
    else if (searchTerm !== '' && searchingStatus === true) {
      setSearchingStatus(false);
      setSearchTerm('')
      searchFunction('');

      console.log(searchingStatus)
    }
  }

  return (
    <Card
      sx={{
        borderRadius: '10px',
        minWidth: 275,
        height: '80vh',
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
          <TextFieldComponent
            className={"w-full"}
            id={'search' + title}
            name="search"
            required={false}
            onChange={searchInputChange}
            value={searchTerm}
            label='Search'
            fontSize={11}
            fontSizeLabel={11}
            size={'small'}
            width={150}
          />
          {searchingStatus ?
            <ButtonComponent
              style='icon'
              text={['Search']}
              color={'#0E2040'}
              icon={<CloseIcon />}
              handleClick={[() => searchHandler()]}
            /> :
            <ButtonComponent
              style='icon'
              text={['Search']}
              color={'#0E2040'}
              icon={<SearchIcon />}
              handleClick={[() => searchHandler()]}
            />
          }
          <ButtonComponent
            style='icon'
            text={['Filter']}
            color={'#0E2040'}
            icon={<TuneIcon />}
            filter={true}
            handleClick={null}
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
