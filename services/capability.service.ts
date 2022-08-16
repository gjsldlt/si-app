import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { CapabilityType } from '../types/MasterTypes.types';

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

export async function getCapabilities() {
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
                type: 'capability',
            },
        }
    })
    
    return data.data.data.metadataByType;
}

export async function addCapability(name:String ,description:String) {
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
                type :"capability"
            },
        })
    console.log(response.data.data);
    return response.data.data;
}


// export async function updateCapability(name:String ,description:String) {
//     let response = await axios.post(
//         GLOBALHELPER.APIURL,
//         {  //will add the query form the ss
//             query: `mutation CreateMetadata(
//                 $name:String!, 
//                 $description:String!,
//                 $type:String!,

//                 ) { 
//                     addMetadata(metadata:{
//                         name:$name,
//                         description:$description
//                         type:$type
//                     }) {
//                        _id
//                        name
//                        description
//                         }
                    
//                 }`,
//             variables: { // will add name, description , type
//                 name: name,
//                 description: description,
//                 type :"capability"
//             },
//         })
//     console.log(response.data.data);
//     return response.data.data;
// }






// mutation UpdateMetadata(
//     $id:String!
//     $metadata: MetadataUpdateFields!
//   ){
//     updateMetadata(
//       id:$id,
//       metadata:$metadata
//     ){
//       _id
//       name
//       description
//       type
//       createdAt
//     }
//   }

