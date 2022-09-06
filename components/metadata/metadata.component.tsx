import { FC, useState, useEffect, useCallback } from "react";

import MetadataForm from "./metadataForm.component";
import MetadataPopup from "./metadataPopup.component";
import CreateIcon from "@mui/icons-material/Create";
import DeleteIcon from "@mui/icons-material/Delete";
import { getMetadata } from "../../services/metadata.service";

import { MetadataComponentProps } from "../../types/MasterPageComponent.type";
import { Metadata } from "../../types/MasterTypes.types";
import { deleteMetadata } from "../../services/metadata.service";

import LoaderComponent from "../loader/loader.component";
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";
import PopupComponent from "../PopupComponent";
import ButtonComponent from "../ButtonComponent";

const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions,
}: MetadataComponentProps) => {
  const tailwindClasses = {
    container:
      "relative flex-grow flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
    toolbar: "flex flex-row",
    title: "flex-1",
    submitButton:
      "h-iconbutton w-iconbutton flex items-center justify-center p-0",
    list: "list flex-grow flex flex-col overflow-auto max-h-[300px] md:max-h-full",
    lineItem:
      "lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row",
    lineItemActive: "active bg-sidebar text-white",
    lineDetails:
      "name flex flex-col justify-start justify-center flex-grow cursor-pointer",
    lineActions: "lineActions flex flex-row justify-center items-center",
    lineButton:
      "lineButton h-[20px] w-[20px] cursor-pointer hover:text-current",
    icon: "h-5 w-5 text-gray",
    description: "block w-full text-xs",
    name: "p-0 m-0",
  };

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

  //state to show popup component
  const [open, setOpen] = useState<boolean>(false);
  const handleOpen = (): void => {
    setOpen(true);
  };
  const handleClose = (): void => {
    setOpen(false);
  };

  useEffect(() => {
    renderData();
  }, [renderData]);

  const handleFormDisplay = () => {
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
        <div className={tailwindClasses.list}>
          {metadataList.map((metadata) => {
            const activeLine = activeMetadata?._id === metadata._id;
            return (
              <div
                key={`${type}-line-item-${metadata._id}`}
                className={`${tailwindClasses.lineItem} ${
                  activeLine ? tailwindClasses.lineItemActive : ""
                }`}
              >
                <div
                  className={`${tailwindClasses.lineDetails}`}
                  onClick={() => {
                    clickMetadataRow(metadata);
                  }}
                >
                  <p className={tailwindClasses.name}>
                    <span>{metadata.name}</span>
                  </p>
                  <span className={tailwindClasses.description}>
                    {activeLine ? metadata.description : ""}
                  </span>
                </div>
                {enableRowActions ? (
                  <div className={tailwindClasses.lineActions}>
                    <ButtonComponent
                      style="icon"
                      icon={<CreateIcon />}
                      text={["Edit"]}
                      color={activeLine ? "white" : ""}
                      handleClick={[() => editMetadata(metadata)]}
                    />
                    <ButtonComponent
                      style="icon"
                      icon={<DeleteIcon />}
                      text={["Remove"]}
                      color={activeLine ? "white" : ""}
                      handleClick={[() => removeMetadata(metadata)]}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}
        </div>
      );
    }
  };

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

  const clickYes = async () => {
    if (metadataToDelete) {
      await deleteMetadata(metadataToDelete._id);
      renderData();
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
  };

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>{metadataTitle()}</p>
        <PopupComponent
          title="Are you sure you want to delete this entry?:"
          entry={metadataToDelete?.name}
          open={displayPopup}
          close={handleClose}
        >
          <div className="flex justify-center mt-2">
            <ButtonComponent
              text={["yes", "no"]}
              variant="outlined"
              handleClick={[clickYes, renderData]}
            />
          </div>
        </PopupComponent>
        {displayPopup ? (
          <p></p>
        ) : (
          <button
            className={tailwindClasses.submitButton}
            onClick={showMetadataForm}
          >
            {displayForm ? (
              <XIcon className={tailwindClasses.icon} />
            ) : (
              <PlusIcon className={tailwindClasses.icon} />
            )}
          </button>
        )}
      </div>
      {loadState ? <LoaderComponent /> : handleFormDisplay()}
    </div>
  );
};

export default MetadataComponent;
