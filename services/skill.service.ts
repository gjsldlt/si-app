import { FormEvent } from 'react'

import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';

import { addSkillQuery, getSkillsQuery, updateSkillQuery, deleteSkillQuery } from '../query/skill.query'

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

//CREATE SKILLS TO API

//call API to post data from input box
const addSkill = async (sklName: string, sklDesc: string) => {
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

//READ SKILLS FROM API

//Create function to get skills from API
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
//UPDATE SKILL FROM API

//Create function to update skills in APU
//uses POST instead of PUT as PUT is not allowed by the API
const updateSkill = async (sklId: string, sklName: string, sklDesc: string) => {
	let response = await axios
		.post(
			GLOBALHELPER.APIURL,
			{
				query: updateSkillQuery,
				variables: {
					id: sklId,
					metadata: {
						name: sklName,
						description: sklDesc
					}
				}
			})
	return response.data.data;
}
//DELETE SKILL FROM API

const deleteSkill = async (sklId: string) => {
	let response = await axios
	.post(
		GLOBALHELPER.APIURL,
		{
			query: deleteSkillQuery,
			variables: {
				id: sklId
			}
		}

	)
	return response.data.data;
}

export { getSkills, addSkill, updateSkill, deleteSkill };