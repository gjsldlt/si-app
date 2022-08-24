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
    form: 'flex flex-wrap w-full max-w-lg',
    formItem: 'w-full px-3 pt-1',
    inputLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1',
    input: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
    formButton: 'bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
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
    <form action="submit" className={tailwindClasses.form} onSubmit={formSubmit}>
      <div className={tailwindClasses.formItem}>
        <label className={tailwindClasses.inputLabel}>
          {metadataType.charAt(0).toUpperCase() + metadataType.slice(1)}
        </label>
        <input
          required
          onChange={inputChange}
          className={tailwindClasses.input}
          value={newMetadataName}
          type="text"
          id="metadataName"
          name="metadataName"
          placeholder="ex. JavaScript"
        />
      </div>
      <div className={tailwindClasses.formItem}>
        <label className={tailwindClasses.inputLabel}>
          Description
        </label>
        <input
          required
          onChange={inputChange}
          className={tailwindClasses.input}
          value={newMetadataDesc}
          type="text"
          id="metadataDesc"
          name="metadataDesc"
          placeholder="ex. Scripting language for web pages"
        />
      </div>
      <div className={`${tailwindClasses.formItem} mt-1 flex justify-end`}>
        <button type="submit" className={tailwindClasses.formButton}>
          {metadataToEdit ? "Update" : "Add"}
        </button>
      </div>
    </form>
  )
}

export default MetadataForm;

