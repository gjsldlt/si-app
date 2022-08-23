import { FC, useState, useEffect } from 'react';

import SkillForm from './skillsForm.component';
import SkillPopup from './skillsPopup.component';
import { getSkills } from '../../services/skill.service';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";


import LoaderComponent from '../loader/loader.component';
import { SkillType } from '../../types/MasterTypes.types';

const SkillComponent: FC = () => {
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
  const [skillList, setSkillList] = useState<SkillType[]>([])
  //state hook to capture skill to edit on click of pencil icon
  const [skillToEdit, setSkillToEdit] = useState<SkillType>()
  //state hook to capture skill to delete on click of trash icon
  const [skillToDelete, setSkillToDelete] = useState<SkillType>()
  //state hook to display form containing input fields
  const [displayForm, setDisplayForm] = useState<Boolean>(false)
  //state hook to display delete confirmation
  const [displayPopup, setDisplayPopup] = useState<Boolean>(false)
  //state hook to show loadscreen component
  const [loadState, setLoadState] = useState<Boolean>(true)

  const showSkillForm = () => {
    setSkillToEdit(undefined)
    setDisplayForm(!displayForm)
  }

  const editSkill = (skill: SkillType) => {
    setDisplayForm(true)
    setSkillToEdit(skill)
  }

  const removeSkill = (skill: SkillType) => {
    setDisplayPopup(true)
    setSkillToDelete(skill)
  }

  const renderData = async () => {
    setDisplayForm(false)
    setDisplayPopup(false)
    setLoadState(true)
    setSkillList(await getSkills())
    setLoadState(false)
  };

  useEffect(() => {
    renderData();
  }, []);

  const handleFormDisplay = () => {
    if (displayForm) {
      return (<SkillForm renderData={renderData} setLoadState={setLoadState} skillToEdit={skillToEdit} />)
    }
    else if (displayPopup) {
      return (<SkillPopup renderData={renderData} skillToDelete={skillToDelete} />)
    }
    else {
      return (
        skillList.map(skill => (
        <div
          key={`skill-line-item-${skill._id}`}
          className={tailwindClasses.lineItem}
        >
          <p className={tailwindClasses.title}>{skill.name}</p>
          <button onClick={() => editSkill(skill)}><PencilIcon className={tailwindClasses.pencilButton} /></button>
          <button onClick={() => removeSkill(skill)}><TrashIcon className={tailwindClasses.trashButton} /></button>
        </div>)))
    }
  }

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Skills</p>
        {
          displayPopup ? <p></p>: <button
          className={tailwindClasses.addButton}
          onClick={showSkillForm}>
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

export default SkillComponent;


