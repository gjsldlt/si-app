import { useState } from 'react'
import Link from 'next/link'
import { MailIcon, LockClosedIcon, EyeOffIcon, EyeIcon, ChevronRightIcon, IdentificationIcon, PhoneIcon } from '@heroicons/react/solid'
import { useRouter } from 'next/router'

import { authLogin, saveUserInSession } from '../../services/user.service';

const Form: React.FC = () => {
    const router = useRouter();
    const [displayLogin, setDisplayLogin] = useState(true)
    const [displayRegister, setDisplayRegister] = useState(false)
    const [displayPassword, setDisplayPassword] = useState(false)

    const loginForm = async () => {
        if (displayLogin === false) {
            setDisplayLogin(true)
            setDisplayRegister(false)
        } else {
            setDisplayLogin(false)
            setDisplayRegister(true)
        }
    }

    const registerForm = async () => {
        if (displayRegister === false) {
            setDisplayRegister(true)
            setDisplayLogin(false)
        } else {
            setDisplayRegister(false)
            setDisplayLogin(true)
        }
    }

    const passwordInput = async () => {
        if (displayPassword === false) {
            setDisplayPassword(true)
        } else {
            setDisplayPassword(false)
        }
    }

    const login = async () => {
        const loginData = await authLogin({
            'email': 'jdoe@email.com',
            'password': 'asdqwe123'
        });
        console.log(loginData);
        if (loginData.login === null) {
            // login failed
        } else {
            saveUserInSession({
                firstName: loginData.login.user.firstName,
                lastName: loginData.login.user.lastName,
                email: loginData.login.user.email,
                userId: loginData.login.user._id,
                token: loginData.login.token,
            })
            router.push('/');
        }
    }

    return (
        <div className="bg-black bg-opacity-50 w-screen md:w-[480px] h-screen md:h-[450px] md:rounded-[25px] md:backdrop-blur-[10px] flex flex-col items-center justify-center">
            <div className="flex justify-center">
                <span className={displayLogin === true ? "text-white" : "text-white text-opacity-50"}><button onClick={loginForm} className={displayLogin === true ? "border-b border-solid border-white w-[100px]" : "border-b border-solid border-white border-opacity-50 w-[100px]"} disabled={displayLogin}>LOGIN</button></span>
                <span className={displayRegister === true ? "text-white" : "text-white text-opacity-50"}><button onClick={registerForm} className={displayRegister === true ? "border-b border-solid border-white w-[100px]" : "border-b border-solid border-white border-opacity-50 w-[100px]"} disabled={displayRegister}>REGISTER</button></span>
            </div>
            <form action="submit" className={displayLogin === true ? "block" : "hidden"}>
                <div className="flex flex-col items-center md:m-auto md:w-[360px]">
                    <label htmlFor="emailLogin" className="relative mt-[30px] md:mt-[50px]">
                        <MailIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                        <input type="email" id="emailLogin" className="w-[275px] md:w-[360px] h-[40px] rounded-[25px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Email Address" required />
                    </label>
                    <label htmlFor="passwordLogin" className="relative mt-[30px] md:mt-[50px]">
                        <LockClosedIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                        <input type={displayPassword === true ? "text" : "password"} id="passwordLogin" className="w-[275px] md:w-[360px] h-[40px] rounded-[25px] border-[2px] border-solid border-white border-opacity-25 transition hover:bg-opacity-100 bg-black bg-opacity-50 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Password" required />
                        {displayPassword === false ? (
                            <EyeOffIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                        ) : (
                            <EyeIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                        )}
                    </label>
                    <div className="flex flex-col md:mt-[50px] md:flex-row md:justify-between md:w-[360px]">
                        <span className="mt-[30px] md:mt-0">
                            <input type="checkbox" id="remember" className="border border-solid border-white border-opacity-50 rounded bg-black bg-opacity-50" />
                            <label htmlFor="remember" className="text-white text-opacity-75 pl-[10px]">Remember me</label>
                        </span>
                        <a href="#" className="mt-[15px] md:mt-0 italic text-white text-opacity-75 transition hover:underline">Forgot Password?</a>
                    </div>
                    <div className="md:w-[360px] flex justify-end">
                        <button onClick={login} className="flex justify-center items-center mt-[30px] md:mt-[50px] w-[275px] md:w-[150px] rounded-[25px] bg-[#80B324] bg-opacity-50 transition hover:bg-opacity-100 text-[16px] text-white text-opacity-75"><span>Login</span><ChevronRightIcon className="w-[40px] h-[40px]" /></button>
                    </div>
                </div>
            </form>
            <form action="submit" className={displayRegister === true ? "flex flex-col items-center mt-[32px]" : "hidden"}>
                <label htmlFor="firstName" className="relative">
                    <IdentificationIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type="text" id="firstName" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 rounded-t-[25px] bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="First Name" required />
                </label>
                <label htmlFor="lastName" className="relative">
                    <IdentificationIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type="text" id="lastName" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Last Name" required />
                </label>
                <label htmlFor="emailRegister" className="relative">
                    <MailIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type="email" id="emailRegister" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Email Address" required />
                </label>
                <label htmlFor="passwordRegister" className="relative">
                    <LockClosedIcon className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type={displayPassword === true ? "text" : "password"} id="passwordRegister" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Password" required />
                    {displayPassword === false ? (
                        <EyeOffIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                    ) : (
                        <EyeIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                    )}
                </label>
                <label htmlFor="repeatPasswordRegister" className="relative">
                    <LockClosedIcon className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type={displayPassword === true ? "text" : "password"} id="repeatPasswordRegister" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Repeat Password" required />
                    {displayPassword === false ? (
                        <EyeOffIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                    ) : (
                        <EyeIcon onClick={passwordInput} className="cursor-pointer w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 right-[15px] fill-white opacity-50" />
                    )}
                </label>
                <label htmlFor="contact" className="relative">
                    <PhoneIcon className="pointer-events-none w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 left-[15px] fill-white opacity-50" />
                    <input type="number" id="contact" className="w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 rounded-b-[25px] bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]" placeholder="Contact Number" required />
                </label>
                <div className="md:w-[360px] flex justify-end">
                    <button className="flex justify-center items-center mt-[32px] w-[275px] md:w-[150px] rounded-[25px] bg-[#80B324] bg-opacity-50 transition hover:bg-opacity-100 text-[16px] text-white text-opacity-75">REGISTER <ChevronRightIcon className="w-[40px] h-[40px]" /></button>
                </div>
            </form>
        </div >
    )
}

export default Form