import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';

axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;
// axios.defaults.headers.common['Authorization'] = ``;

export async function getSkills() {
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
                type: 'skill',
            },
        }
    })
    return data.data.data;
}
