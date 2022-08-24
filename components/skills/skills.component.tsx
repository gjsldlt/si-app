import { useState, useEffect } from 'react';

import SkillForm from './skillsForm.component';
import { addSkill, getSkills } from '../../services/skill.service';
import { PlusIcon, XIcon, PencilIcon, TrashIcon } from "@heroicons/react/solid";

import LoaderComponent from '../loader/loader.component';
import { SkillType } from '../../types/MasterTypes.types';
import { userAgent } from 'next/server';
import { deleteUser } from '../../services/user.service';

const SkillComponent = ({ role, activeMetadata, onMetadataClick, enableRowActions }: Pageprops) => {
  const tailwindClasses = {
    container: 'container relative flex flex-col bg-white p-1 min-h-[200px] md:h-full md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg',
    toolbar: 'toolbar flex flex-row',
    title: 'title flex-1',
    addButton: 'addbutton h-iconbutton w-iconbutton flex items-center justify-center p-0',
    list: 'list flex-grow flex flex-col overflow-auto max-h-[300px] md:max-h-unset',
    lineItem: 'lineitem transition-all duration-500 rounded py-1 px-2 flex flex-row',
    lineItemActive: 'active bg-sidebar text-white min-h-0',
    lineDetails: 'name flex flex-col justify-start justify-center flex-grow cursor-pointer',
    lineActions: 'lineActions flex flex-row justify-center items-center',
    lineButton: 'lineButton h-[20px] w-[20px] cursor-pointer hover:text-current',
    description: 'block w-full text-xs',
    name: 'p-0 m-0',
  }
  //state hook to capture api response to SkillType array
  const [skillList, setSkillList] = useState<SkillType[]>([])
  //state hook to capture skill to edit on click of pencil icon
  const [skillToEdit, setSkillToEdit] = useState<SkillType>()
  //state hook to display form containing input fields
  const [displayForm, setDisplayForm] = useState<Boolean>(false)
  //state hook to show loadscreen component
  const [loadState, setLoadState] = useState<Boolean>(true)

  const [addState, setAddState] = useState<Boolean>(false)

  const showSkillForm = (skill: SkillType) => {
    setSkillToEdit(undefined)
    setDisplayForm(!displayForm)
  }

  const clickSkillRow = (skill: SkillType) => {
    if (enableRowActions) {
      if (activeMetadata?._id === skill._id) {
        onMetadataClick(undefined)
      } else {
        onMetadataClick(skill)
      }
    }
  }

  const editSkill = (skill: SkillType) => {
    setDisplayForm(true)
    setSkillToEdit(skill)
  }

  const deleteSkill = (skill: SkillType) => {

  }

  const renderData = async () => {
    setDisplayForm(false)
    setLoadState(true)
    setSkillList(await getSkills())
    setLoadState(false)
  };

  const onLineItemClick = (lineItem) => {
    if (lineItem._id === activeMetadata?._id) {
      onMetadataClick(undefined);
    } else {
      onMetadataClick(lineItem);
    }
  }

  useEffect(() => {
    renderData();
  }, []);

  const handleFormDisplay = () => {
    return <div className={tailwindClasses.list}>
      {displayForm ? <SkillForm renderData={renderData} setLoadState={setLoadState} skillToEdit={skillToEdit} />
        : !loadState && skillList.map((item, index) => {
          let activeLine = activeMetadata?._id === item._id
          return <div
            key={`skill-line-item-${item._id}`}
            className={`${tailwindClasses.lineItem} ${activeLine ? tailwindClasses.lineItemActive : ''}`}
          >
            <div
              className={`${tailwindClasses.lineDetails}`}
              onClick={() => { clickSkillRow(item) }}
            >
              <p className={tailwindClasses.name}>
                <span>{item.name}</span>
              </p>
              <span className={tailwindClasses.description}>
                {activeLine ? item.description : ''}
              </span>
            </div>
            {
              enableRowActions ? (
                <div className={tailwindClasses.lineActions}>
                  <PencilIcon
                    className={tailwindClasses.lineButton}
                    onClick={() => { editSkill(item) }}
                  />
                  <TrashIcon
                    className={tailwindClasses.lineButton}
                    onClick={() => { deleteUser(item) }}
                  />
                </div>
              ) : null
            }
          </div>
        })
      }
    </div>
  }

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.toolbar}>
        <p className={tailwindClasses.title}>Skills</p>
        <button
          className={tailwindClasses.addButton}
          onClick={showSkillForm}>
          {displayForm ? (
            <XIcon className="h-5 w-5 text-gray" />
          ) : (
            <PlusIcon className="h-5 w-5 text-gray" />
          )}
        </button>
      </div>
      {loadState ? <LoaderComponent /> : handleFormDisplay()}
    </div>
  )
}

type Pageprops = {
  role?: String,
  activeMetadata: SkillType,
  onMetadataClick: Function,
  enableRowActions: Boolean
}

export default SkillComponent;