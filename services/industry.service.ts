import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

export async function getIndustries() {
    let data = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query: `query($type:String!) {
                 metadataByType(type:$type) {
                    _id 
                    name 
                    description
                }
            }`,
            variables: {
                type: 'industry',
            },
        }
    })
    return data.data.data;
}

export async function addIndustry(name: String, description: String) {
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {  //will add the query form the ss
            query: `mutation CreateMetadata(
                $name:String!,
                $description:String!,
                $type:String!,
                ) {
                    addMetadata(metadata:{
                        name:$name,
                        description:$description
                        type:$type
                    }) {
                       _id
                       name
                       description
                        }
                }`,

            variables: { // will add name, description , type
                name: name,
                description: description,
                type: "industry"
            },
        })
    console.log(response.data.data);
    return response.data.data;
}