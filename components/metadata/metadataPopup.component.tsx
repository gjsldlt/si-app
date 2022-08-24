import { FC } from 'react';

import { deleteMetadata } from '../../services/metadata.service';

import { PopupProps } from '../../types/MasterPageComponent.type';

const MetadataPopup: FC<PopupProps> = ({
  renderData,
  metadataToDelete,
}: PopupProps) => {

  const clickYes = async() => {
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
        <button onClick={clickYes}>Yes</button>
        <button onClick={exitDeletion}>No</button>
      </div>
  )
}

export default MetadataPopup

