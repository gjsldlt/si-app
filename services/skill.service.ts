import { useState, useEffect, FormEvent } from 'react'

import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { SkillObj } from '../components/skills/skills.type';

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

//ADD SKILLS TO API
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
const addSkill = (event: FormEvent<HTMLFormElement>, sklName: string, sklDesc: string, sklList: SkillObj[]) => {
	event.preventDefault();
	axios.post(
		GLOBALHELPER.APIURL,
		{
			query: addSkillQuery,
			variables: {
				name: sklName,
				description: sklDesc,
				type: "skill"
			}
		}).then((response) => {
			console.log(response.status);
			console.log(response.data.data);
			sklList.push(response.data.data)
		})
}
//GET SKILLS FROM API
//query string for API get request
const getSkillsQuery =  `query($type:String!) {
	metadataByType(type:$type) {
		_id 
		name 
		description
		}
}`

const useFetchSkills = (url: string) => {
  const [skills, setSkills] = useState<SkillObj[]>([])
  const [error, setError] = useState("")
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios
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
  }, [url])

  return { skills, error, isLoading }
}


export { useFetchSkills, addSkill };