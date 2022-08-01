import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { UserDataType } from '../types/MasterTypes.types';


axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;

export async function authLogin({ email, password }: LoginDetails) {
    console.log('login', email, password);
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query: `mutation(
                $email:String!, 
                $password:String!
                ) { 
                    login(email:$email, password:$password) {
                        token
                        user{
                            firstName
                            lastName
                            email
                        }
                    }
                }`,
            variables: {
                email: email,
                password: password
            },
        })
    return response.data.data;
}

export const saveUserInSession = (UserData: UserDataType) => {
    window.sessionStorage.setItem('user', JSON.stringify(UserData));
}

export const accessUserInSession = () => {
    try {
        return JSON.parse(window.sessionStorage.getItem('user') || '');
    } catch (e) {
        return null;
    }
}


type LoginDetails = {
    email: String,
    password: String
}
