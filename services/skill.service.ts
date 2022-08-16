import { useState, useEffect, FormEvent } from 'react'

import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { SkillObj } from '../types/skills.type';

import { addSkillQuery, getSkillsQuery } from './skill.query'

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

//ADD SKILLS TO API

//call API to post data from input box
const addSkill = async (event: FormEvent<HTMLFormElement>, sklName: string, sklDesc: string, sklList: SkillObj[]) => {
	event.preventDefault();
	await axios
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
		.then((response) => {
			console.log(response.status);
			console.log(response.data.data);
			sklList.push(response.data.data)
		})
}

//GET SKILLS FROM API

//Create custom hook to get skills from API
const useFetchSkills = () => {
	//assigns api response to custom skill object array using this state hook
	const [skills, setSkills] = useState<SkillObj[]>([])
	
	const [error, setError] = useState("")
	const [isLoading, setIsLoading] = useState(false)

	useEffect(() => {
		setIsLoading(true)
		const fetchSkills = async () => {
			await axios
				.get(
					GLOBALHELPER.APIURL,
					{
						params: {
							query: getSkillsQuery,
							variables: {
								type: 'skill',
							},
						}
					})
				.then(response => {
					setSkills(response.data.data.metadataByType)
					setIsLoading(false)
				})
				.catch(() => {
					setError("Error loading skills")
					setIsLoading(false)
				})
		}
		fetchSkills()
	}, [])

	return { skills, error, isLoading }
}

export { useFetchSkills, addSkill };