import { FC, useState, ChangeEvent } from 'react';

import { useFetchSkills, addSkill } from '../../services/skill.service';

import AddIcon from '@mui/icons-material/Add';
import GLOBALHELPER from '../../helpers/global.helper';

const Skills: FC = () => {
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
  const {skills, error, isLoading } = useFetchSkills(GLOBALHELPER.APIURL)

  if (isLoading) {
    return <div>Loading...</div>
  }
  
  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main>
      <form action="submit" onSubmit={(event) => addSkill(event, newSkillName, newSkillDesc, skills)}>
        <div>Add Skill:</div>
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
        <button type="submit"><AddIcon /></button>
      </form>
      {skills.map(skill => (
        <li key={skill._id}>{skill.name}</li>
      ))}
    </div>
  )
}
export default Skills;


