import { FC, useState, useEffect, useCallback } from 'react';

import MetadataForm from './metadataForm.component';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { Box } from '@mui/material';

import { getMetadata } from '../../services/metadata.service';
import { MetadataComponentProps } from '../../types/MasterPageComponent.type';
import { MetadataType } from '../../types/MasterTypes.types';
import { deleteMetadata } from '../../services/metadata.service';

import LoaderComponent from '../loader/loader.component';
import PopupComponent from '../PopupComponent';
import ButtonComponent from '../ButtonComponent';
import CardComponent from '../CardComponent';
import ListComponent from '../ListComponent';

const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions,
}: MetadataComponentProps) => {
  //state hook to capture api response to SkillType array
  const [metadataList, setMetadataList] = useState<MetadataType[]>([]);
  //state hook to capture skill to edit on click of pencil icon
  const [metadataToEdit, setMetadataToEdit] = useState<MetadataType>();
  //state hook to capture skill to delete on click of trash icon
  const [metadataToDelete, setMetadataToDelete] = useState<MetadataType>();
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

  const editMetadata = (metadata: MetadataType) => {
    setDisplayForm(true);
    setMetadataToEdit(metadata);
  };

  const removeMetadata = (metadata: MetadataType) => {
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
        <ListComponent
          data={metadataList}
          listItemType={type}
          enableItemActions={enableRowActions}
          activeItem={activeMetadata}
          editFunction={editMetadata}
          deleteFunction={removeMetadata}
          onListItemClick={onMetadataClick}
        />
      );
    }
  };

  return (
    <>
      <CardComponent
        title={metadataTitle()}
        actions={
          <>
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
          </>
        }
        content={loadState ? <LoaderComponent /> : cardBody()}
      />
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
    </>
  );
};

export default MetadataComponent;
