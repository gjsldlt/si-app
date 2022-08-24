import { FC } from 'react';

import { deleteMetadata } from '../../services/metadata.service';

import { PopupProps } from '../../types/MasterPageComponent.type';

const MetadataPopup: FC<PopupProps> = ({
  renderData,
  metadataToDelete,
}: PopupProps) => {

  const tailwindClasses = {
    form: 'flex flex-wrap w-full max-w-lg',
    formItem: 'w-full px-3 pt-1',
    inputLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1',
    input: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
    formButton: 'bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
  }

  const clickYes = async () => {
    if (metadataToDelete) {
      await deleteMetadata(metadataToDelete._id)
      renderData()
    }
  }

  const exitDeletion = () => {
    renderData()
  }

  return (
    <div>
      <p>Are you sure you want to delete {metadataToDelete?.name}?</p>
      <button onClick={clickYes} className={tailwindClasses.formButton}>
        Yes
      </button>
      <button onClick={exitDeletion} className={tailwindClasses.formButton}>
        No
      </button>
    </div>
  )
}

export default MetadataPopup

