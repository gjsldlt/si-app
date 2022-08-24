import { FC, useState, useEffect, useCallback } from 'react';

import MetadataForm from './metadataForm.component';
import MetadataPopup from './metadataPopup.component';
import { getMetadata } from '../../services/metadata.service';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

import { MetadataComponentProps } from '../../types/MasterPageComponent.type';


import LoaderComponent from '../loader/loader.component';
import { Metadata } from '../../types/MasterTypes.types';

const MetadataComponent: FC<MetadataComponentProps> = ({ type }: MetadataComponentProps) => {
  const tailwindClasses = {
    container: "relative flex-grow flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
    toolbar: "flex flex-row",
    title: "flex-1",
    addButton: "h-iconbutton w-iconbutton flex items-center justify-center p-0",
    list: "flex flex-col h-[100px]",
    lineItem: "flex flex-row",
    xButton: "h-5 w-5 text-blue-500",
    plusButton: "h-5 w-5 text-blue-500",
    trashButton: "h-5 w-5 text-blue-500",
    pencilButton: "h-5 w-5 text-blue-500",
    skillName: "flex-1"
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
      return (
        metadataList.map(metadata => (
          <div
            key={`${type}-line-item-${metadata._id}`}
            className={tailwindClasses.lineItem}
          >
            <p className={tailwindClasses.title}>{metadata.name}</p>
            <button onClick={() => editMetadata(metadata)}><PencilIcon className={tailwindClasses.pencilButton} /></button>
            <button onClick={() => removeMetadata(metadata)}><TrashIcon className={tailwindClasses.trashButton} /></button>
          </div>)))
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
            className={tailwindClasses.addButton}
            onClick={showMetadataForm}>
            {displayForm ? (
              <XIcon className={tailwindClasses.xButton} />
            ) : (
              <PlusIcon className={tailwindClasses.plusButton} />
            )}
          </button>
        }
      </div>
      {loadState ? <LoaderComponent /> : handleFormDisplay()}
    </div>
  )
}

export default MetadataComponent;

