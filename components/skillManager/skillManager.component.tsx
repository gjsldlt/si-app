import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
// import _ from 'lodash';

import { getMetadata } from "../../services/metadata.service";
import { MetadataType, EmployeeType } from "../../types/MasterTypes.types";
import Loader from "../loader/loader.component";
import styles from "./skillManager.module.scss";
import ButtonComponent from "../ButtonComponent";
import TextFieldComponent from "../TextFieldComponent";
import { MenuItem } from "@mui/material";

export default function SkillManager({ employee }: PageProps) {
  const tailwindClasses = {
    //border border-[gray]
    container: 'rounded  w-full m-2 p-2 flex flex-row',
    list: 'h-full basis-[50%] flex flex-wrap gap-1 pt-5 pl-3',
    formRow: 'flex flex-col pt-1',
    form: 'h-full basis-[50%] pr-2',
    inputLabel:
      'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1',
    input:
      'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
    formButton:
      'bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
    chip: 'p-1 border border-black rounded-xl bg-sidebar text-white px-2 flex items-center',
    name: '',
    chipDeleteIcon: 'h-[20px] ml-2 hover:text-current cursor-pointer',
  };
  const [loadState, setLoadState] = useState<boolean>(false);
  const [metadataSkills, setMetadataSkills] = useState<MetadataType[]>([]);
  const [primarySkill, setPrimarySkill] = useState<MetadataType>();
  const [secondarySkill, setSecondarySkill] = useState<MetadataType>();
  const [activeSkills, setActiveSkills] = useState<
    {
      rate: number;
      yearsExperience: number;
      description: string;
      skill?: MetadataType;
    }[]
  >([]);
  const filteredMetadataSkills = metadataSkills.filter(
    (mskill) =>
      activeSkills
        .map((item) => item.skill)
        .map((item) => item?._id)
        .indexOf(mskill._id) === -1
  );

  const [rate, setRate] = useState<number>(0);
  const [yearsExperience, setYearsExperience] = useState<number>(0);
  const [description, setDescription] = useState<string>('');
  const [skill, setSkill] = useState<MetadataType>();

  const renderData = async () => {
    setLoadState(true);
    setMetadataSkills(await getMetadata('skill'));
    setLoadState(false);
  };

  const onFormSkillInputChange = (
    e:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLSelectElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => {
    switch (e.target.name) {
      case 'rate':
        setRate(parseInt(e.target.value));
        break;
      case 'yearsExperience':
        setYearsExperience(parseInt(e.target.value));
        break;
      case 'description':
        setDescription(e.target.value);
        break;
      case 'skill':
        setSkill(metadataSkills.find((item) => item._id === e.target.value));
        break;
      default:
        break;
    }
  };

  const addActiveSkill = () => {
    const tempActiveSkills = activeSkills;
    if (
      Boolean(skill) &&
      rate > 0 &&
      yearsExperience > 0 &&
      description !== ''
    ) {
      tempActiveSkills?.push({
        skill: skill,
        rate: rate,
        yearsExperience: yearsExperience,
        description: description,
      });
      setActiveSkills(tempActiveSkills);
      setRate(0);
      setDescription('');
      setSkill({ _id: '', name: '', description: '' });
      setYearsExperience(0);
    }
  };

  const removeActiveSkill = (id: string) => {
    setActiveSkills(activeSkills.filter((item) => item.skill?._id !== id));
  };

  useEffect(() => {
    renderData();
  }, [employee]);

  return (
    <div className={tailwindClasses.container}>
      <div className={tailwindClasses.form + " space-y-2"}>
        <div className={tailwindClasses.formRow}>
          {/* <span className={tailwindClasses.inputLabel}>Skill</span>
          <select
            disabled={filteredMetadataSkills.length === 0}
            required
            name='skill'
            onChange={onFormSkillInputChange}
            className={tailwindClasses.input}
            value={skill?._id}
            id='grid-skills-name'
          >
            <option value={''}>-</option>
            {filteredMetadataSkills.map((item, index) => (
              <option key={`active-skill-option-${index}`} value={item._id!}>
                {`${item.name}`}
              </option>
            ))}
          </select> */}
          <TextFieldComponent
            select={true}
            label="Skill"
            disabled={filteredMetadataSkills.length === 0}
            required={true}
            id="grid-skills-name"
            name="skill"
            onChange={onFormSkillInputChange}
            value={skill ? skill?._id : ""}
          >
            {filteredMetadataSkills.map((item, index) => (
              <MenuItem key={`active-skill-option-${index}`} value={item._id!}>
                {`${item.name}`}
              </MenuItem>
            ))}
          </TextFieldComponent>
        </div>
        <div className={tailwindClasses.formRow}>
          {/* <label className={tailwindClasses.inputLabel} htmlFor="grid-rate">
            Rate
          </label>
          <input
            disabled={filteredMetadataSkills.length === 0}
            required
            name='rate'
            onChange={onFormSkillInputChange}
            value={rate}
            className={tailwindClasses.input}
            id="grid-rate"
            type="number"
            placeholder="0"
          /> */}
          <TextFieldComponent
            label="Rate"
            required={true}
            disabled={filteredMetadataSkills.length === 0}
            id="grid-rate"
            name="rate"
            value={rate}
            onChange={onFormSkillInputChange}
            type="number"
            placeholder="0"
          />
        </div>
        <div className={tailwindClasses.formRow}>
          {/* <label
            className={tailwindClasses.inputLabel}
            htmlFor='grid-years-experience'
          >
            Years Experience
          </label>
          <input
            disabled={filteredMetadataSkills.length === 0}
            required
            name='yearsExperience'
            onChange={onFormSkillInputChange}
            value={yearsExperience}
            className={tailwindClasses.input}
            id="grid-years-experience"
            type="number"
            placeholder="0"
          /> */}
          <TextFieldComponent
            label="Years Experience"
            required={true}
            disabled={filteredMetadataSkills.length === 0}
            id="grid-years-experience"
            name="yearsExperience"
            value={yearsExperience}
            onChange={onFormSkillInputChange}
            type="number"
            placeholder="0"
          />
        </div>
        <div className={tailwindClasses.formRow}>
          {/* <label
            className={tailwindClasses.inputLabel}
            htmlFor='grid-description'
          >
            Description
          </label>
          <textarea
            disabled={filteredMetadataSkills.length === 0}
            required
            name='description'
            onChange={onFormSkillInputChange}
            value={description}
            className={tailwindClasses.input}
            id="grid-description"
            placeholder="Indicate your experience here."
          /> */}
          <TextFieldComponent
            label="Description"
            disabled={filteredMetadataSkills.length === 0}
            id="grid-description"
            name="description"
            value={description}
            onChange={onFormSkillInputChange}
            multiline={{ enabled: true, rows: 4 }}
            className="w-full"
          />
        </div>
        <div className={tailwindClasses.formRow}>
          <ButtonComponent
            text={['Add Skill']}
            type='button'
            handleClick={[addActiveSkill]}
            disabled={filteredMetadataSkills.length === 0}
            variant='outlined'
          />
        </div>
      </div>
      <div className={tailwindClasses.list}>
        {activeSkills?.map((item, index) => (
          <div className={tailwindClasses.chip} key={`skill-chip-${index}`}>
            <span className={tailwindClasses.name}>{item.skill?.name}</span>
            <XIcon
              className={tailwindClasses.chipDeleteIcon}
              onClick={() =>
                removeActiveSkill(item.skill ? item.skill._id : '')
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
}

type PageProps = {
  employee?: EmployeeType;
  setEmployee: (emp: EmployeeType) => void;
};
