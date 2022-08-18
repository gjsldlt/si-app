import { FC, useState, ChangeEvent, FormEvent } from 'react';

import { addSkill } from '../../services/skill.service';

const SkillForm: FC<FormProps> = ({
  renderData,
  setLoadState,
}: FormProps) => {
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

  //form submit
  const formSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setLoadState(true)
    if (newSkillName !== "" && newSkillDesc !== "") {
      addSkill(event, newSkillName, newSkillDesc)
      setNewSkillName("")
      setNewSkillDesc("")
      renderData();
    }
  }

  return (
    <form action="submit" onSubmit={formSubmit}>
      <label>Skill</label>
      <input
        onChange={inputChange}
        className={tailwindClasses.input}
        value={newSkillName}
        type="text"
        id="skillName"
        name="skillName"
      />
      <br />
      <label>Description</label>
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

type FormProps = {
  renderData: () => {};
  setLoadState: React.Dispatch<React.SetStateAction<Boolean>>;
};