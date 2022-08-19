import { FC, useState, useEffect } from 'react';

import SkillForm from './skillsForm.component';
import { getSkills } from '../../services/skill.service';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";


import LoaderComponent from '../loader/loader.component';
import { SkillType } from '../../types/MasterTypes.types';

const SkillComponent: FC = () => {
  const tailwindClasses = {
    container: "relative flex flex-col bg-white p-1 min-h-[200px] md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
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
  const [skillList, setSkillList] = useState<SkillType[]>([])

  const [displayForm, setDisplayForm] = useState<Boolean>(false)
  const [loadState, setLoadState] = useState<Boolean>(true);

  const addSkill = () => {
    setDisplayForm(!displayForm)
  }

  const RenderData = async () => {
    setDisplayForm(false);
    setLoadState(true)
    setSkillList(await getSkills())
    setLoadState(false)
  };

  useEffect(() => {
    RenderData();
  }, []);

  const handleFormDisplay = () => {
    return (
      displayForm ? <SkillForm renderData={RenderData} setLoadState={setLoadState} />
        : skillList.map(skill => (
          <div
            key={`skill-line-item-${skill._id}`}
            className={tailwindClasses.lineItem}
          >
            <p className={tailwindClasses.title}>{skill.name}</p>
            <button><PencilIcon className={tailwindClasses.pencilButton} /></button>
            <button><TrashIcon className={tailwindClasses.trashButton} /></button>
          </div>
        ))
    )
  }

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Skills</p>
        <button
          className={tailwindClasses.addButton}
          onClick={addSkill}>
          {displayForm ? (
            <XIcon className={tailwindClasses.xButton} />
          ) : (
            <PlusIcon className={tailwindClasses.plusButton} />
          )}
        </button>
      </div>
      {loadState ? <LoaderComponent /> : handleFormDisplay()}
    </div>
  )
}
export default SkillComponent;


