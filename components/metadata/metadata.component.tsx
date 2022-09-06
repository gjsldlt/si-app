import { FC, useState, useEffect, useCallback } from "react";

import MetadataForm from "./metadataForm.component";
import MetadataPopup from "./metadataPopup.component";

import { getMetadata } from "../../services/metadata.service";

import { MetadataComponentProps } from "../../types/MasterPageComponent.type";
import { Metadata } from "../../types/MasterTypes.types";

import LoaderComponent from "../loader/loader.component";
import { Typography, List, ListItem, ListItemButton, ListItemText, IconButton, Container, Box, Card, CardContent, CardActions } from "@mui/material";
import { spacing } from '@mui/system';
import DeleteIcon from '@mui/icons-material/Delete';
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import { ClassNames } from "@emotion/react";


const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions,
}: MetadataComponentProps) => {
  // const tailwindClasses = {
  //   container:
  //     "relative flex-grow flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
  //   toolbar: "flex flex-row",
  //   title: "flex-1",
  //   submitButton:
  //     "h-iconbutton w-iconbutton flex items-center justify-center p-0",
  //   list: "list flex-grow flex flex-col overflow-auto max-h-[300px] md:max-h-unset",
  //   lineItem:
  //     "lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row",
  //   lineItemActive: "active bg-sidebar text-white min-h-0",
  //   lineDetails:
  //     "name flex flex-col justify-start justify-center flex-grow cursor-pointer",
  //   lineActions: "lineActions flex flex-row justify-center items-center",
  //   lineButton:
  //     "lineButton h-[20px] w-[20px] cursor-pointer hover:text-current",
  //   icon: "h-5 w-5 text-gray",
  //   description: "block w-full text-xs",
  //   name: "p-0 m-0",
  // };

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
      case "skill":
        title = "Skills";
        return title;
      case "capability":
        title = "Capabilities";
        return title;
      case "industry":
        title = "Industries";
        return title;
      default:
        break;
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
    } else if (displayPopup) {
      return (
        <MetadataPopup
          renderData={renderData}
          metadataToDelete={metadataToDelete}
        />
      );
    } else {
      return (
        <List>
          {metadataList.map((metadata) => {
            const activeLine = activeMetadata?._id === metadata._id;
            return (
              <ListItem key={`${type}-line-item-${metadata._id}`} component="div" disablePadding
                secondaryAction={enableRowActions ? (
                  <>
                    <IconButton>
                      <CreateIcon
                        onClick={() => {
                          editMetadata(metadata);
                        }}
                      />
                    </IconButton>
                    <IconButton>
                      <DeleteIcon onClick={() => {
                        removeMetadata(metadata);
                      }} />
                    </IconButton>
                  </>
                ) : null
                }>
                <ListItemButton>
                  <ListItemText primary={metadata.name} />
                </ListItemButton>
                <span>
                  {activeLine ? metadata.description : ""}
                </span>
              </ListItem>
            );
          })}
        </List>
      );
    }
  };

  return (
    <Container sx={{ px: 1 }} disableGutters>
      <Card variant="outlined">
        {loadState? <LoaderComponent/> : <>
        <CardActions sx={{ p: 1 }}>
            <Typography variant="h6" component="div">{metadataTitle()}</Typography>
            <IconButton onClick={showMetadataForm}>
              {displayForm ? (
                <CloseIcon />
              ) : (
                <AddIcon />
              )}
            </IconButton>
          </CardActions>
          <CardContent sx={{ p: 0 }}>
            {cardBody()}
          </CardContent>
        </>}
      </Card>
    </Container>
  );
};

export default MetadataComponent;
