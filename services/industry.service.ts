import axios from 'axios'
import GLOBALHELPER from '../helpers/global.helper'

axios.defaults.headers.common['Content-Type'] = `application/json`
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`
// axios.defaults.headers.common['Authorization'] = ``;

const getIndustries = async () => {
    let res = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query:
                `query($type:String!) {
                    metadataByType(type:$type) {
                        _id 
                        name 
                        description
                    }
                }`,
            variables: {
                type: 'industry'
            }
        }
    })
    return res.data.data.metadataByType
}

const addIndustry = async (name: String, description: String) => {
    let res = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query:
                `mutation CreateMetadata(
                    $name: String!,
                    $description: String!,
                    $type: String!,
                ){
                    addMetadata(metadata:
                        {
                            name: $name,
                            description: $description
                            type: $type
                        }
                    )
                    {
                        _id
                        name
                        description
                    }
                }`,
            variables: {
                name: name,
                description: description,
                type: 'industry'
            }
        })
    return res.data.data
}

const updateIndustry = async (name: String, description: String) => {
    let res = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query:
                `mutation UpdateMetadata(
                    $id:String!
                    $metadata: MetadataUpdateFields!
                ){
                    updateMetadata(
                        id:$id,
                        metadata:$metadata
                    ){
                        _id
                        name
                        description
                        type
                        createdAt
                    }
                }`

        })
    return res.data.data;
}

export { getIndustries, addIndustry, updateIndustry }