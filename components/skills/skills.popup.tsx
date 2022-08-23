import { FC, FormEvent } from 'react';

import { deleteSkill } from '../../services/skill.service';
import { SkillType } from '../../types/MasterTypes.types';

const SkillPopup: FC<PopupProps> = ({
  renderData,
  setLoadState,
  skillToDelete,
}: PopupProps) => {

  const clickYes = async() => {
    if (skillToDelete) {
      await deleteSkill(skillToDelete._id)
      renderData()
    }
  }

  const exitDeletion = () => {
    renderData()
  }
  
  return (
      <div>
        <p>Are you sure you want to delete {skillToDelete?.name}?</p>
        <button onClick={clickYes}>Yes</button>
        <button onClick={exitDeletion}>No</button>
      </div>
  )
}

export default SkillPopup

type PopupProps = {
  renderData: () => {}
  setLoadState: React.Dispatch<React.SetStateAction<Boolean>>
  skillToDelete?: SkillType
};