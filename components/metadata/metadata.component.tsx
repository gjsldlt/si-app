import { FC, useState, useEffect, useCallback } from 'react';

import MetadataForm from './metadataForm.component';
import MetadataPopup from './metadataPopup.component';
import { getMetadata } from '../../services/metadata.service';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

import { MetadataComponentProps } from '../../types/MasterPageComponent.type';


import LoaderComponent from '../loader/loader.component';
import { Metadata } from '../../types/MasterTypes.types';

const MetadataComponent: FC<MetadataComponentProps> = ({
  type,
  activeMetadata,
  onMetadataClick,
  enableRowActions
}: MetadataComponentProps) => {

  const tailwindClasses = {
    container: "relative flex-grow flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
    toolbar: "flex flex-row",
    title: "flex-1",
    submitButton: "h-iconbutton w-iconbutton flex items-center justify-center p-0",
    list: "list flex-grow flex flex-col overflow-auto max-h-[300px] md:max-h-unset",
    lineItem: "lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row",
    lineItemActive: "active bg-sidebar text-white min-h-0",
    lineDetails: "name flex flex-col justify-start justify-center flex-grow cursor-pointer",
    lineActions: "lineActions flex flex-row justify-center items-center",
    lineButton: "lineButton h-[20px] w-[20px] cursor-pointer hover:text-current",
    icon: "h-5 w-5 text-gray",
    description: "block w-full text-xs",
    name: "p-0 m-0",
  }

  //state hook to capture api response to SkillType array
  const [metadataList, setMetadataList] = useState<Metadata[]>([])
  //state hook to capture skill to edit on click of pencil icon
  const [metadataToEdit, setMetadataToEdit] = useState<Metadata>()
  //state hook to capture skill to delete on click of trash icon
  const [metadataToDelete, setMetadataToDelete] = useState<Metadata>()
  //state hook to display form containing input fields
  const [displayForm, setDisplayForm] = useState<Boolean>(false)
  //state hook to display delete confirmation
  const [displayPopup, setDisplayPopup] = useState<Boolean>(false)
  //state hook to show loadscreen component
  const [loadState, setLoadState] = useState<Boolean>(true)

  const showMetadataForm = () => {
    setMetadataToEdit(undefined)
    setDisplayForm(!displayForm)
  }

  const clickMetadataRow = (metadata: Metadata) => {
    if (enableRowActions) {
      if (activeMetadata?._id === metadata._id) {
        onMetadataClick(undefined)
      } else {
        onMetadataClick(metadata)
      }
    }
  }

  const editMetadata = (metadata: Metadata) => {
    setDisplayForm(true)
    setMetadataToEdit(metadata)
  }

  const removeMetadata = (metadata: Metadata) => {
    setDisplayPopup(true)
    setMetadataToDelete(metadata)
  }

  const renderData = useCallback(async () => {
    setDisplayForm(false)
    setDisplayPopup(false)
    setLoadState(true)
    setMetadataList(await getMetadata(type))
    setLoadState(false)
  }, [type]);

  useEffect(() => {
    renderData();
  }, [renderData]);

  const handleFormDisplay = () => {
    if (displayForm) {
      return (<MetadataForm renderData={renderData} setLoadState={setLoadState} metadataToEdit={metadataToEdit} metadataType={type} />)
    }
    else if (displayPopup) {
      return (<MetadataPopup renderData={renderData} metadataToDelete={metadataToDelete} />)
    }
    else {
      return <div className={tailwindClasses.list}>
        {
          metadataList.map((metadata) => {
            let activeLine = activeMetadata?._id === metadata._id
            return <div key={`${type}-line-item-${metadata._id}`} className={`${tailwindClasses.lineItem} ${activeLine ? tailwindClasses.lineItemActive : ''}`}>
              <div className={`${tailwindClasses.lineDetails}`} onClick={() => { clickMetadataRow(metadata) }}>
                <p className={tailwindClasses.name}>
                  <span>{metadata.name}</span>
                </p>
                <span className={tailwindClasses.description}>
                  {activeLine ? metadata.description : ''}
                </span>
              </div>
              {
                enableRowActions ? (
                  <div className={tailwindClasses.lineActions}>
                    <PencilIcon className={tailwindClasses.lineButton} onClick={() => { editMetadata(metadata) }} />
                    <TrashIcon className={tailwindClasses.lineButton} onClick={() => { removeMetadata(metadata) }} />
                  </div>
                ) : null
              }
            </div>
          })
        }
      </div>
    }
  }

  const metadataTitle = () => {
    let title: string
    switch (type) {
      case 'skill': title = "Skills"; return title;
      case 'capability': title = "Capabilities"; return title;
      case 'industry': title = "Industries"; return title;
      default: break;
    }
  }

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>{metadataTitle()}</p>
        {
          displayPopup ? <p></p> : <button
            className={tailwindClasses.submitButton}
            onClick={showMetadataForm}>
            {displayForm ? (
              <XIcon className={tailwindClasses.icon} />
            ) : (
              <PlusIcon className={tailwindClasses.icon} />
            )}
          </button>
        }
      </div>
      {loadState ? <LoaderComponent /> : handleFormDisplay()}
    </div>
  )
}

export default MetadataComponent;


