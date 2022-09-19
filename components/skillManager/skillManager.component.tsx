import { useEffect, useState } from 'react';
import { XIcon } from '@heroicons/react/solid';
// import _ from 'lodash';

import { getMetadata } from "../../services/metadata.service";
import { Metadata, EmployeeType } from "../../types/MasterTypes.types";
import Loader from "../loader/loader.component";
import styles from "./skillManager.module.scss";
import ButtonComponent from "../ButtonComponent";
import Select from '@mui/material/Select'
import InputLabel from '@mui/material/InputLabel'
import FormControl from '@mui/material/FormControl'
import MenuItem from '@mui/material/MenuItem'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from "@mui/material/InputAdornment";
import DeleteIcon from "@mui/icons-material/Delete";

export default function SkillManager({ employee }: PageProps) {
  const tailwindClasses = {
    container: "container rounded w-full m-2 p-2 flex flex-row bg-[#FAF9F9]",
    list: "h-[275px] w-2/3 flex flex-wrap gap-1 pt-5 pl-3 overflow-auto",
    formRow: "flex flex-col pt-1 m-[5px]",
    form: "h-full pr-2 w-1/3",
    inputLabel: "block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1",
    input: "appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500",
    formButton: "bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded",
    chip: "chip flex justify-between p-1 h-[50px] rounded-[10px] bg-white text-sidebar px-2 flex items-center w-full",
    name: "flex justify-between w-full",
    chipDeleteIcon: "chipDeleteIcon w-[30px] h-[30px] ml-[25px] p-[7px] text-[#1C1B1F] bg-white rounded-[25px] drop-shadow-[0_1px_1px_rgba(0,0,0,0.25)]",
    test: "flex",
    test2: "w-full m-[5px]"
  };
  const [loadState, setLoadState] = useState<boolean>(false);
  const [metadataSkills, setMetadataSkills] = useState<Metadata[]>([]);
  const [primarySkill, setPrimarySkill] = useState<Metadata>();
  const [secondarySkill, setSecondarySkill] = useState<Metadata>();
  const [activeSkills, setActiveSkills] = useState<
    {
      rate: number;
      yearsExperience: number;
      description: string;
      skill?: Metadata;
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
  const [skill, setSkill] = useState<Metadata>();

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
          <span className={tailwindClasses.inputLabel}>Skill</span>
          <FormControl fullWidth>
            <InputLabel htmlFor="grid-skills-name">Skill</InputLabel>
            <Select
              disabled={filteredMetadataSkills.length === 0}
              required
              labelId="grid-skills-name"
              id="grid-skills-name"
              name="skill"
              value={skill?._id}
              label="Skill"
              onChange={onFormSkillInputChange}
            >
              {filteredMetadataSkills.map((item, index) => (
                <MenuItem key={`active-skill-option-${index}`} value={item._id!}>
                  {`${item.name}`}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>
        <div className={tailwindClasses.test}>
          <div className={tailwindClasses.test2}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              <TextField
                disabled={filteredMetadataSkills.length === 0}
                required
                name="rate"
                onChange={onFormSkillInputChange}
                fullWidth
                value={rate}
                id="grid-rate"
                type="number"
                variant="outlined"
                label="Rate"
              />
            </Box>
          </div>
          <div className={tailwindClasses.test2}>
            <Box
              sx={{
                width: '100%',
                maxWidth: '100%'
              }}
            >
              <TextField
                disabled={filteredMetadataSkills.length === 0}
                required
                name="yearsExperience"
                onChange={onFormSkillInputChange}
                fullWidth
                value={yearsExperience}
                id="grid-years-experience"
                type="number"
                variant="outlined"
                label="Years of Exp"
              />
            </Box>
          </div>
        </div>
        <div className={tailwindClasses.formRow}>
          <Box
            sx={{
              width: '100%',
              maxWidth: '100%'
            }}
          >
            <TextField
              disabled={filteredMetadataSkills.length === 0}
              required
              name="description"
              onChange={onFormSkillInputChange}
              fullWidth
              value={description}
              id="grid-description"
              type="text"
              variant="outlined"
              label="Description"
              placeholder="Indicate your experience here"
            />
          </Box>
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
            <div className={tailwindClasses.name}>
              <div>{item.skill?.name}</div>
              <div>{item.rate}</div>
              <div>{item.yearsExperience}</div>
            </div>
            <DeleteIcon
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
