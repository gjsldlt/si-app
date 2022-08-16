import { FC, useState } from 'react';

import SkillForm from './skillsForm.component';
import { useFetchSkills, addSkill } from '../../services/skill.service';

import AddIcon from '@mui/icons-material/Add';

const SkillComponent: FC = () => {
  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }

  const [displayForm, setDisplayForm] = useState<boolean>(false)

  const addClick = () => {
    setDisplayForm(true)
  }
  //fetch api response using custom hook
  const { skills, error, isLoading } = useFetchSkills()

 
  const handleFormDisplay = () => {
    if (isLoading) {
      return <div>Loading...</div>
    }
    if (error) {
      return <div>{error}</div>
    }
    return (
      displayForm ? <SkillForm />
        : skills.map(skill => (
          <li key={skill._id}>{skill.name}</li>
        ))
    )
  }

  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main><button onClick={addClick}>Add Skill<AddIcon /></button>
      {handleFormDisplay()}
    </div>
  )
}
export default SkillComponent;


