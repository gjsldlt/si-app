import { FC } from 'react';

import { deleteMetadata } from '../../services/metadata.service';

import { PopupProps } from '../../types/MasterPageComponent.type';

const MetadataPopup: FC<PopupProps> = ({
  renderData,
  metadataToDelete,
}: PopupProps) => {

  //confirm deletion of metadata
  const clickYes = async() => {
    if (metadataToDelete) {
      await deleteMetadata(metadataToDelete._id)
      renderData()
    }
  }

  //go back to list of metadata
  const clickNo = () => {
    renderData()
  }
  
  return (
      <div>
        <p>Are you sure you want to delete {metadataToDelete?.name}?</p>
        <button onClick={clickYes}>Yes</button>
        <button onClick={clickNo}>No</button>
      </div>
  )
}

export default MetadataPopup

