import { FC, useState, ChangeEvent, FormEvent } from 'react';

import { addSkill, updateSkill } from '../../services/skill.service';
import { SkillType } from '../../types/MasterTypes.types';

const SkillForm: FC<FormProps> = ({
  renderData,
  setLoadState,
  skillToEdit,
}: FormProps) => {
  // const tailwindClasses = {
  //   container: '',
  //   input: 'border-2'
  // }
  const tailwindClasses = {
    form: 'flex flex-wrap w-full max-w-lg',
    formItemHalf: 'w-full md:w-1/2 px-3 pt-1 md:pt-0',
    formItem: 'w-full px-3 pt-1',
    inputLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1',
    input: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
    formButton: 'bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
  }

  //set state hooks for input
  const [newSkillName, setNewSkillName] = useState<string>(skillToEdit ? skillToEdit.name : '')
  const [newSkillDesc, setNewSkillDesc] = useState<string>(skillToEdit ? skillToEdit.description : '')

  const skillId: string = skillToEdit ? skillToEdit._id : ''
  console.log("skill id: " + skillId)

  //detect change of input in text boxes
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    switch (event.target.name) {
      case 'skillName': setNewSkillName(event.target.value); break;
      case 'skillDesc': setNewSkillDesc(event.target.value); break;
      default: break;
    }
  }

  //form submit
  const formSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoadState(true)
    //submit to update
    if (skillToEdit) {
      await updateSkill(skillId, newSkillName, newSkillDesc)
      setNewSkillName("")
      setNewSkillDesc("")
      renderData()
    }
    else {
      //submit to create
      if (newSkillName && newSkillDesc) {
        await addSkill(newSkillName, newSkillDesc)
        setNewSkillName("")
        setNewSkillDesc("")
        renderData()
      }
    }
  }

  return (
    <form className={tailwindClasses.form} onSubmit={formSubmit}>
      <div className={tailwindClasses.formItem}>
        <label className={tailwindClasses.inputLabel}>
          Skill Name
        </label>
        <input
          required
          name="skillName"
          onChange={inputChange}
          value={newSkillName}
          className={tailwindClasses.input}
          id="grid-email-name"
          type="text"
          placeholder="ex. JavaScript"
        />
      </div>
      <div className={tailwindClasses.formItem}>
        <label className={tailwindClasses.inputLabel}>
          Description
        </label>
        <input
          required
          name="skillDesc"
          onChange={inputChange}
          value={newSkillDesc}
          className={tailwindClasses.input}
          id="skillDesc"
          type="text"
          placeholder="ex. Scripting language for Web pages"
        />
      </div>
      <div className={`${tailwindClasses.formItem} mt-1 flex justify-end`}>
        <button className={tailwindClasses.formButton} type="submit">
          {skillToEdit === undefined ? 'Create' : 'Update'}
        </button>
      </div>
    </form>
  )
}

export default SkillForm;

type FormProps = {
  renderData: () => {}
  setLoadState: React.Dispatch<React.SetStateAction<Boolean>>
  skillToEdit?: SkillType
};