import { FC, useState, ChangeEvent } from 'react';

import { useFetchSkills, addSkill } from '../../services/skill.service';

const SkillForm: FC = () => {
  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }

  //set state hooks for input
  const [newSkillName, setNewSkillName] = useState<string>('')
  const [newSkillDesc, setNewSkillDesc] = useState<string>('')

  //detect change of input in text boxes
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name)
    switch (event.target.name) {
      case 'skillName': setNewSkillName(event.target.value); break;
      case 'skillDesc': setNewSkillDesc(event.target.value); break;
      default: break;
    }
  }
  //fetch api response using custom hook
  const { skills } = useFetchSkills()

  return (
    <form action="submit" onSubmit={(event) => addSkill(event, newSkillName, newSkillDesc, skills)}>
      <label>Skill Name </label>
      <input
        onChange={inputChange}
        className={tailwindClasses.input}
        value={newSkillName}
        type="text"
        id="skillName"
        name="skillName"
      />
      <br />
      <label>Description </label>
      <input
        onChange={inputChange}
        className={tailwindClasses.input}
        value={newSkillDesc}
        type="text"
        id="skillDesc"
        name="skillDesc"
      />
      <br />
      <button type="submit">Add Skill</button>
    </form>
  )
}

export default SkillForm;