import { FC, useState, useEffect, ChangeEvent, FormEvent } from 'react';
import AddIcon from '@mui/icons-material/Add';
import getSkills from '../../services/skill.service';
import { SkillObj } from './skills.type';
import axios from 'axios';
import GLOBALHELPER from '../../helpers/global.helper';


const Skills: FC = () => {
  const tailwindClasses = {
    container: '',
    input: 'border-2'
  }

  const [skillList, setSkillList] = useState<SkillObj[]>([])
  const [newSkillName, setNewSkillName] = useState<string>('')
  const [newSkillDesc, setNewSkillDesc] = useState<string>('')

  //drill down API response to skill metadata
  useEffect(() => {
    getSkills().then(response => {
      setSkillList(response.data.data.metadataByType)
    })
  }, [])

  //detect change of input in text boxes
  const inputChange = (event: ChangeEvent<HTMLInputElement>) => {
    console.log(event.target.value, event.target.name)
    switch (event.target.name) {
      case 'skillName': setNewSkillName(event.target.value); break;
      case 'skillDesc': setNewSkillDesc(event.target.value); break;
      default: break;
    }
  }

  //query string for API post request
  const addSkillQuery = `mutation CreateMetadata
  (
    $name: String!,
    $description: String!,
    $type: String!
  )
  {
    addMetadata (metadata:
      {
      name: $name,
      description: $description,
      type: $type
      }
    )
    {
      _id
      name
      description
    }
  }`

  //call API to post data from input box
  const addSkill = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    axios.post(
      GLOBALHELPER.APIURL,
      {
        query: addSkillQuery,
        variables: {
          name: newSkillName,
          description: newSkillDesc,
          type: "skill"
        }
      }).then((response) => {
        console.log(response.status);
        console.log(response.data.data);
        skillList.push(response.data.data)
      })
  }

  

  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main>
      <form action="submit" onSubmit={addSkill}>
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
      {skillList.map(function (skill, i) {
        return (<li key={i}>{skill.name}</li>)
      })}
    </div>
  )
}
export default Skills;


