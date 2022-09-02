import axios from 'axios';
import GLOBALHELPER from '../helpers/global.helper';
import { AccountType, UserType, EmployeeType } from '../types/MasterTypes.types';


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

export const saveUserInSession = (UserData: AccountType) => {
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

export const getEmployeesOfManager = async (managerId: string) => {
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
                    userId
                    firstName
                    lastName
                    email
                    manager{
                        _id
                        firstName
                        lastName
                        email
                        userId
                    }
                    capability{
                        name
                    }
                    skills {
                        _id
                        skill{
                            name
                        }
                        rate
                        yearsExperience
                    }
                    primarySkill{
                        name
                    }
                    secondarySkill{
                        name
                    }
                  }
              }`,
            variables: {
            },
        }
    })
    return data.data.data.employees;
}

export const registerManager = async (user: UserType) => {
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query: `
            mutation NewManager($manager:ManagerInput){
                addManager(manager:$manager){
                    _id
                    userId
                    firstName
                    lastName
                    email
                }
            }`,
            variables: {
                manager: {
                    firstName: user.firstName,
                    lastName: user.lastName,
                    email: user.email,
                    password: user.password
                }
            },
        })
    console.log(response.data.data.addManager);
    return response.data.data.addManager;
}

export const registerEmployee = async (emp: EmployeeType, managerId: string) => {
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query: `
            mutation NewEmployee(
                $firstName: String!
                $lastName: String!
                $email: String!
                $password: String!
                $managerId:String!
                $capabilityId:String,
                $primarySkillId:String,
                $secondarySkillId:String,
                ){
                addEmployee(
                    firstName:$firstName
                    lastName:$lastName
                    email:$email
                    password:$password
                    managerId:$managerId
                    capabilityId:$capabilityId
                    primarySkillId:$primarySkillId
                    secondarySkillId:$secondarySkillId
                    ){
                    _id
                    userId
                    firstName
                    lastName
                    email
                }
            }`,
            variables: {
                ...emp,
                capabilityId: emp.capability?._id,
                primarySkillId: emp.primarySkill?._id,
                secondarySkillId: emp.secondarySkill?._id,
                managerId: managerId,
            },
        })
    console.log(response.data.data.addEmployee);
    return response.data.data.addEmployee;
}

export const deleteUser = async (id: string) => {
    let response = await axios.post(
        GLOBALHELPER.APIURL,
        {
            query: `
        mutation DeleteUser($id:String!){
          deleteUser(id:$id){
            message
            success
          }
        }`,
            variables: {
                id: id,
            },
        })
    console.log(response.data.data.deleteUser);
    return response.data.data.deleteUser;
}

export const getEmployeeByUserId = async (id: string) => {

    let data = await axios.get(
        GLOBALHELPER.APIURL, {
        params: {
            query: `
            query GetEmployeeByID($employeeId:String!){
                employeeById(employeeId:$employeeId){
                    _id
                    userId
                    firstName
                    lastName
                    email
                    manager{
                        _id
                        firstName
                        lastName
                        email
                        userId
                    }
                    capability{
                        name
                        _id
                    }
                    skills {
                        _id
                        skill{
                            name
                            _id
                        }
                        rate
                        yearsExperience
                    }
                    primarySkill{
                        name
                        _id
                    }
                    secondarySkill{
                        name
                        _id
                    }
                }
            }`,
            variables: {
                employeeId: id
            },
        }
    })
    return data.data.data.employeeById;
}

export const updateManager = async (id: string, user: UserType) => {
    try {
        delete user.password;
        console.log(id, user)
        let response = await axios.post(
            GLOBALHELPER.APIURL,
            {
                query: `mutation UpdateUser(
                    $id:String!
                    $user: UserUpdateFields!
                  ){
                    updateUser(
                      id:$id,
                      user:$user
                    ){
                      _id
                      firstName
                      lastName
                      email
                    }
                  }`,
                variables: {
                    id: id,
                    user: user
                },
            })
        console.log(response.data.data);
        return response.data.data;
    } catch (e) {
        return {
            error: e
        }
    }
}


type LoginDetails = {
    email: string,
    password: string
}
