import { FC, useState, useEffect, useCallback } from 'react';

import MetadataForm from './metadataForm.component';
import AddBoxIcon from '@mui/icons-material/AddBox';
import CancelIcon from '@mui/icons-material/Cancel';
import { Box } from '@mui/material';

import { getMetadata, getPgMetadata } from '../../services/metadata.service';
import { MetadataComponentProps } from '../../types/MasterPageComponent.type';
import { MetadataType } from '../../types/MasterTypes.types';
import { deleteMetadata } from '../../services/metadata.service';

import LoaderComponent from '../loader/loader.component';
import PopupComponent from '../PopupComponent';
import ButtonComponent from '../ButtonComponent';
import CardComponent from '../CardComponent';
import ListComponent from '../ListComponent';

import { CircularProgress } from "@mui/material";
const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions,
}: MetadataComponentProps) => {

  //state hook to capture metadata to edit on click of pencil icon
  const [metadataToEdit, setMetadataToEdit] = useState<MetadataType>();
  //state hook to capture metadala to delete on click of trash icon
  const [metadataToDelete, setMetadataToDelete] = useState<MetadataType>();
  //state hook to get page count of card
  const [metadataPageCount, setMetadataPageCount] = useState(0);
  //state hook to display form containing input fields
  const [displayForm, setDisplayForm] = useState<boolean>(false);
  //state hook to display delete confirmation
  const [displayPopup, setDisplayPopup] = useState<boolean>(false);
  //state hook to show loadscreen component
  const [loadState, setLoadState] = useState<boolean>(true);
  // state hook to show succesfull  message
  const [success, setSuccess] = useState<boolean>(false);
  // state hook to show what action the metadata will be done
  const [metadataAction, setAction] = useState<string>("");
  // state hook to show loader on popup
  const [popupLoading, setPopupLoading] = useState<boolean>(false);
  // state hook to gather metadata
  const [metadataList, setMetadataList] = useState<MetadataType[]>([]);
  const [metadataPgList, setMetadataPgList] = useState<MetadataType[]>([]);
  // state hook to change current page
  const [currentPage, setCurrentPage] = useState<number>(0);
  // state hook to capture search term from card component
  const [searchInput, setSearchInput] = useState<string>('');

  const maxNoOfResults = 10;

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

  //function to accept data (search term) from card component
  const searchMetadata = useCallback((searchTerm: string) => {
    setSearchInput(searchTerm);

  }, []);

  useEffect(() => {
    searchMetadata;
  }, [searchMetadata, searchInput])


  const renderData = useCallback(async () => {
    setDisplayForm(false);
    setDisplayPopup(false);
    setLoadState(true);
    setMetadataList(await getMetadata(type))
    setMetadataPgList(await getPgMetadata(type, searchInput, currentPage, maxNoOfResults));
    setLoadState(false);
  }, [type, currentPage, searchInput]);

  useEffect(() => {
    renderData();
  }, [renderData]);

  const metadataTitle = useCallback(() => {
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
  }, [type]);

  //add page count for every 10 entries of metadata
  useEffect(() => {
    //if no search is done and less than 10 entries
    if (metadataList.length < maxNoOfResults && searchInput === '') {
      setMetadataPageCount(1)
    }
    //if no search is done and more than 10 entries
    else if (metadataList.length > maxNoOfResults && searchInput === '') {
      for (let i = 1; i <= metadataList.length / i; i++) {
        if (metadataList.length / i <= maxNoOfResults) {
          setMetadataPageCount(i)
          break;
        }
      }
    }
    //if search is done
    else if (searchInput !== '') {
      setMetadataPageCount(1)
    }
  }, [metadataList, metadataPgList, metadataTitle, searchInput])

  const clickYes = async () => {
    setAction("delete");
    if (metadataToDelete) {
      setPopupLoading(true);
      await deleteMetadata(metadataToDelete._id);
      setPopupLoading(false);
      setSuccess(true);
      renderData();
    }
  };

  //shows the body of the card (if entering data or reading data)
  const cardBody = () => {
    if (displayForm) {
      return (
        <MetadataForm
          renderData={renderData}
          setLoadState={setLoadState}
          metadataToEdit={metadataToEdit}
          metadataType={type}
          setAction={setAction}
          setSuccess={setSuccess}
        />
      );
    } else {
      return (
        <ListComponent
          data={metadataPgList}
          listItemType={type}
          enableItemActions={enableRowActions}
          activeItem={activeMetadata}
          editFunction={editMetadata}
          deleteFunction={removeMetadata}
          onListMetadataClick={onMetadataClick}
        />
      );
    }
  };



  return (
    <>
      <CardComponent
        title={metadataTitle()}
        renderData={renderData}
        pageCount={metadataPageCount}
        setCurrentPage={setCurrentPage}
        searchFunction={searchMetadata}
        actions={
          <>
            <ButtonComponent
              style='icon'
              text={['Add']}
              color={'#0E2040'}
              icon={displayForm ? <CancelIcon /> : <AddBoxIcon />}
              handleClick={[() => showMetadataForm()]}
            />
          </>}
        content={
          loadState ? <LoaderComponent /> : cardBody()
        }

      />
      <PopupComponent
        title={`${!popupLoading ? 'Are you sure you want to delete this entry?:' : ''
          }`}
        entry={!popupLoading ? metadataToDelete?.name : ''}
        open={displayPopup}
      >
        <div>
          {!popupLoading ? (
            <ButtonComponent
              text={['yes', 'no']}
              variant='outlined'
              handleClick={[clickYes, () => setDisplayPopup(false)]}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </PopupComponent>
      <PopupComponent
        title={`Entry successfully ${metadataAction === 'add'
          ? "added"
          : metadataAction === 'update'
            ? 'updated'
            : 'deleted'
          }`}
        open={success}
      >
        <div>
          {!popupLoading ? (
            <ButtonComponent
              text={['yes', 'no']}
              variant='outlined'
              handleClick={[clickYes, () => setDisplayPopup(false)]}
            />
          ) : (
            <CircularProgress />
          )}
        </div>
      </PopupComponent>
      <PopupComponent
        title={`Entry successfully ${metadataAction === "add"
          ? "added"
          : metadataAction === "update"
            ? "updated"
            : "deleted"
          }`}
        open={success}
      >
        <Box sx={{ mt: 1, display: 'flex', justifyContent: 'center' }}>
          <ButtonComponent
            text={['confirm']}
            variant='outlined'
            handleClick={[() => setSuccess(false)]}
          />
        </Box>
      </PopupComponent>
    </>
  );
};

export default MetadataComponent;
