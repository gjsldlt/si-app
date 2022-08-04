import { FunctionComponent, useState, useEffect } from 'react';
import styles from './skills.module.scss';
import AddIcon from '@mui/icons-material/Add';
import getSkills from '../../services/skill.service';


type PageProps = {
  children?: string
}

type SkillObj ={
  _id: string
  name: string
  description: string
}

const Skills: FunctionComponent<PageProps> = (props) => {
  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }
  const [skillList, setSkillList] = useState<SkillObj[]>([])

  useEffect(() => {
    getSkills().then(res => {
      setSkillList(res.data.data.metadataByType)
    })
  }, [])

  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main>
      <label>Add Skill: </label><input className={tailwindClasses.input} type="text" />
      <button><AddIcon /></button>
      {skillList.map(function(skill, i){
        return (<li key={i}>{skill.name}</li>)
      })}
    </div>
  )
}
export default Skills;


