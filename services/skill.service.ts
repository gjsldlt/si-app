import { FormEvent } from 'react'

import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';

import { addSkillQuery, getSkillsQuery } from '../query/skill.query'

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

//ADD SKILLS TO API

//call API to post data from input box
const addSkill = async (event: FormEvent<HTMLFormElement>, sklName: string, sklDesc: string) => {
	event.preventDefault();
	let response = await axios
		.post(
			GLOBALHELPER.APIURL,
			{
				query: addSkillQuery,
				variables: {
					name: sklName,
					description: sklDesc,
					type: "skill"
				}
			})
	return response.data.data
}

//GET SKILLS FROM API

//Create custom hook to get skills from API

const getSkills = async () => {
	let skills = await axios.get(
		GLOBALHELPER.APIURL,
		{
			params: {
				query: getSkillsQuery,
				variables: {
					type: 'skill',
				},
			}
		})
	return skills.data.data.metadataByType;
}

export { getSkills, addSkill };