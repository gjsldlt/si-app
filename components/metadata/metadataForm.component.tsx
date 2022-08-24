import { FC, useState, ChangeEvent, FormEvent } from 'react';

import { addMetadata, updateMetadata } from '../../services/metadata.service';
import { FormProps } from '../../types/MasterPageComponent.type';

const MetadataForm: FC<FormProps> = ({
  metadataType,
  renderData,
  setLoadState,
  metadataToEdit,
}: FormProps) => {

  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }

  //set state hooks for input
  const [newMetadataName, setNewMetadataName] = useState<string>(metadataToEdit ? metadataToEdit.name : '')
  const [newMetadataDesc, setNewMetadataDesc] = useState<string>(metadataToEdit ? metadataToEdit.description : '')

  const metadataId: string = metadataToEdit ? metadataToEdit._id : ''

  //detect change of input in text boxes
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'metadataName': setNewMetadataName(event.target.value); break;
      case 'metadataDesc': setNewMetadataDesc(event.target.value); break;
      default: break;
    }
  }

  //function when submitting the form containing data from input fields
  //action depends if add or update is selected
  const formSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoadState(true)
    //submit to update
    if (metadataToEdit) {
      await updateMetadata(metadataId, newMetadataName, newMetadataDesc)
      setNewMetadataName('')
      setNewMetadataDesc('')
      renderData()
    }
    //submit to create
    else if (newMetadataName && newMetadataDesc) {
      await addMetadata(newMetadataName, newMetadataDesc, metadataType)
      setNewMetadataName('')
      setNewMetadataDesc('')
      renderData()
    }

  }

  return (
    <form action="submit" onSubmit={formSubmit}>
      <label>{metadataType.charAt(0).toUpperCase() + metadataType.slice(1)}</label>
      <input
        onChange={inputChange}
        className={tailwindClasses.input}
        value={newMetadataName}
        type="text"
        id="metadataName"
        name="metadataName"
      />
      <br />
      <label>Description</label>
      <input
        onChange={inputChange}
        className={tailwindClasses.input}
        value={newMetadataDesc}
        type="text"
        id="metadataDesc"
        name="metadatalDesc"
      />
      <br />
      <button type="submit">{metadataToEdit ? "Update" : "Add"}</button>
    </form>
  )
}

export default MetadataForm;

