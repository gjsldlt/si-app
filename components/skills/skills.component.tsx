import { useState, useEffect } from 'react';
import styles from './skills.module.scss';
import AddIcon from '@mui/icons-material/Add';
import getSkills from '../../services/skill.service';

export default function Skills({ children }: PageProps) {
  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }
  const [skills, setSkills] = useState([])

  useEffect(() => {
    getSkills().then(res => {
      setSkills(res.data.data)
    })
  },[])

  console.log("skills: " + skills);

  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main>
      <label>Add Skill: </label><input className={tailwindClasses.input} type="text" />
      <button><AddIcon /></button>
      <div>{JSON.stringify(skills, null, 2)}</div>
    </div>
  )
}

type PageProps = {
  children?: any
}