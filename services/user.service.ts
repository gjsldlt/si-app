import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { UserDataType, UserType } from '../types/MasterTypes.types';


axios.defaults.headers.common['Content-Type'] = `application/json`;
axios.defaults.headers.common['Access-Control-Allow-Origin'] = `*`;
axios.defaults.headers.common['Accept'] = `application/json, text/plain, application/graphql, */*`;

export async function authLogin({ email, password }: LoginDetails) {
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query: `mutation(
                $email:String!, 
                $password:String!
                ) { 
                    login(email:$email, password:$password) {
                        token
                        managerId
                        employeeId
                        isAdmin
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
    console.log(response.data.data);
    return response.data.data;
}

export const saveUserInSession = (UserData: UserDataType) => {
    sessionStorage.setItem('user', JSON.stringify(UserData));
}

export const accessUserInSession = () => {
    try {
        return JSON.parse(sessionStorage.getItem('user') || '');
    } catch (e) {
        return null;
    }
}

export const clearUserSession = () => {
    sessionStorage.removeItem('user')
}

export const getAllManagers = async () => {
    let data = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query: `query GetAllManagers{
                managers{
                  _id
                  firstName
                  lastName
                  email
                  createdAt
                  userId
                }
              }`,
            variables: {
            },
        }
    })
    return data.data.data.managers;
}

export const getEmployeesOfManager = async (managerId: String) => {
    let data = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query: `query GetAllEmployeesOfManager($managerId: String!){
                employeesPerManager(managerId:$managerId){
                    _id
                    firstName
                    lastName
                    email
                    skills{
                      rate
                      skill{
                        name
                        description
                      }
                    }
                  }
              }`,
            variables: {
                managerId: managerId
            },
        }
    })
    return data.data.data.employeesPerManager;
}

export const getEmployees = async () => {
    let data = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query: `query GetAllEmployees{
                employees{
                    _id
                    firstName
                    lastName
                    email
                    skills{
                      rate
                      skill{
                        name
                        description
                      }
                    }
                  }
              }`,
            variables: {
            },
        }
    })
    return data.data.data.employees;
}

export const registerEmployee = async (user: UserType) => {

}

type LoginDetails = {
    email: String,
    password: String
}
