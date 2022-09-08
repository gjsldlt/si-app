import { FC, useState, useEffect, useCallback } from 'react';

import MetadataForm from './metadataForm.component';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import {
  Card,
  CardActions,
  CardContent,
  Typography,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  Box,
} from '@mui/material';

import { getMetadata } from '../../services/metadata.service';
import { MetadataComponentProps } from '../../types/MasterPageComponent.type';
import { Metadata } from '../../types/MasterTypes.types';
import { deleteMetadata } from '../../services/metadata.service';

import LoaderComponent from '../loader/loader.component';
import PopupComponent from '../PopupComponent';
import ButtonComponent from '../ButtonComponent';

const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions,
}: MetadataComponentProps) => {
  //state hook to capture api response to SkillType array
  const [metadataList, setMetadataList] = useState<Metadata[]>([]);
  //state hook to capture skill to edit on click of pencil icon
  const [metadataToEdit, setMetadataToEdit] = useState<Metadata>();
  //state hook to capture skill to delete on click of trash icon
  const [metadataToDelete, setMetadataToDelete] = useState<Metadata>();
  //state hook to display form containing input fields
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  //state hook to display delete confirmation
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  //state hook to show loadscreen component
  const [loadState, setLoadState] = useState<boolean>(true);

  const showMetadataForm = () => {
    setMetadataToEdit(undefined);
    setDisplayForm(!displayForm);
  };

  const clickMetadataRow = (metadata: Metadata) => {
    if (enableRowActions) {
      if (activeMetadata?._id === metadata._id) {
        onMetadataClick(undefined);
      } else {
        onMetadataClick(metadata);
      }
    }
  };

  const editMetadata = (metadata: Metadata) => {
    setDisplayForm(true);
    setMetadataToEdit(metadata);
  };

  const removeMetadata = (metadata: Metadata) => {
    setDisplayPopup(true);
    setMetadataToDelete(metadata);
  };

  const renderData = useCallback(async () => {
    setDisplayForm(false);
    setDisplayPopup(false);
    setLoadState(true);
    setMetadataList(await getMetadata(type));
    setLoadState(false);
  }, [type]);

  useEffect(() => {
    renderData();
  }, [renderData]);

  const metadataTitle = () => {
    let title: string;
    switch (type) {
      case 'skill':
        title = 'Skills';
        return title;
      case 'capability':
        title = 'Capabilities';
        return title;
      case 'industry':
        title = 'Industries';
        return title;
      default:
        break;
    }
  };

  const confirmDelete = async () => {
    if (metadataToDelete) {
      await deleteMetadata(metadataToDelete._id);
      renderData();
    }
  };

  const cardBody = () => {
    if (displayForm) {
      return (
        <MetadataForm
          renderData={renderData}
          setLoadState={setLoadState}
          metadataToEdit={metadataToEdit}
          metadataType={type}
        />
      );
    } else {
      return (
        <List
          sx={{
            p: 0,
            position: 'relative',
            overflow: 'auto',
          }}
        >
          {metadataList.map((metadata) => {
            const activeLine = activeMetadata?._id === metadata._id;
            let shortDesc: string | undefined = undefined;

            if (metadata.description.length > 45) {
              shortDesc = metadata.description.substring(0, 45) + '...';
            } else {
              shortDesc = metadata.description;
            }

            return (
              <ListItem
                key={`${type}-line-item-${metadata._id}`}
                component='div'
                disablePadding
                secondaryAction={
                  enableRowActions ? (
                    <>
                      <ButtonComponent
                        style='icon'
                        icon={<CreateIcon />}
                        text={['Edit']}
                        color={activeLine ? 'white' : '#0E2040'}
                        handleClick={[() => editMetadata(metadata)]}
                      />
                      <ButtonComponent
                        style='icon'
                        icon={<DeleteIcon />}
                        text={['Remove']}
                        color={activeLine ? 'white' : '#0E2040'}
                        handleClick={[() => removeMetadata(metadata)]}
                      />
                    </>
                  ) : null
                }
              >
                <ListItemButton
                  sx={[
                    {
                      m: 1,
                      backgroundColor: '#FAF9F9',
                      borderRadius: '10px',
                      '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.1)' },
                    },
                    activeLine
                      ? {
                        backgroundColor: '#0E2040',
                        '&:hover': { backgroundColor: '#0E2040' },
                      }
                      : null,
                  ]}
                  key={`${type}-line-item-${metadata._id}`}
                  onClick={() => {
                    clickMetadataRow(metadata);
                  }}
                >
                  <ListItemText
                    sx={{ mr: 5 }}
                    disableTypography={false}
                    primary={
                      <Typography
                        sx={{ fontSize: '14px', fontWeight: 700 }}
                        variant='subtitle1'
                        component='div'
                        color={activeLine ? 'white' : 'black'}
                      >
                        {metadata.name}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        sx={{
                          fontSize: '12px',
                          fontWeight: 400,
                          lineHeight: '15px',
                        }}
                        variant='body2'
                        component='span'
                        fontStyle='italic'
                        color={activeLine ? 'white' : 'gray'}
                      >
                        {activeLine ? metadata.description : shortDesc}
                      </Typography>
                    }
                    secondaryTypographyProps={{}}
                  />
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>
      );
    }
  };

  return (
    <>
      <Card sx={{ flexGrow: 1, borderRadius: '10px' }}>
        <CardActions sx={{ p: 1, display: 'flex' }}>
          <Typography
            sx={{ fontSize: '14px', fontWeight: 700 }}
            variant='h5'
            component='div'
          >
            {metadataTitle()}
          </Typography>
          <Container
            sx={{ p: 0, display: 'flex', justifyContent: 'flex-end' }}
            disableGutters
          >
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
            />
            <ButtonComponent
              style='icon'
              text={['Add']}
              color={'#0E2040'}
              icon={displayForm ? <CancelIcon /> : <AddBoxIcon />}
              handleClick={[() => showMetadataForm()]}
            />
          </Container>
        </CardActions>
        <PopupComponent
          title='Are you sure you want to delete this entry?'
          entry={metadataToDelete?.name}
          open={displayPopup}
        >
          <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
            <ButtonComponent
              text={['yes', 'no']}
              variant='outlined'
              handleClick={[confirmDelete, renderData]}
            />
          </Box>
        </PopupComponent>
        <CardContent sx={{ p: 0 }}>
          {loadState ? <LoaderComponent /> : cardBody()}
        </CardContent>
      </Card>
    </>
  );
};

export default MetadataComponent;
