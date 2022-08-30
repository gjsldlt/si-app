import { MouseEvent, ChangeEvent, useState } from "react";
import {
  MailIcon,
  LockClosedIcon,
  EyeOffIcon,
  EyeIcon,
  ChevronRightIcon,
  IdentificationIcon,
  PhoneIcon,
} from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Swal from "sweetalert2";

import { authLogin, saveUserInSession } from "../../services/user.service";

const Form: React.FC = () => {
  const tailwindClasses = {
    container: `bg-black bg-opacity-50 w-screen md:w-[480px] h-screen md:h-[450px] md:rounded-[25px] md:backdrop-blur-[10px] flex flex-col items-center justify-center`,

    tabContainer: `flex justify-center`,
    textActive: `text-white`,
    textInactive: `text-white text-opacity-50`,
    tabActive: `border-b border-solid border-white w-[100px]`,
    tabInactive: `border-b border-solid border-white border-opacity-50 w-[100px]`,

    loginFormContainer: `flex flex-col items-center md:m-auto md:w-[360px]`,
    registerFormContainer: `flex flex-col items-center mt-[32px]`,

    loginLabel: `relative mt-[30px] md:mt-[50px]`,
    registerLabel: `relative`,

    loginInputBox: `w-[275px] md:w-[360px] h-[40px] rounded-[25px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]`,
    registerInputBox: `w-[275px] md:w-[360px] h-[40px] border-[2px] border-solid border-white border-opacity-25 bg-black bg-opacity-50 transition hover:bg-opacity-100 placeholder-white placeholder-opacity-50 text-white px-[45px] py-[10px]`,
    topRounded: `rounded-t-[25px]`,
    bottomRounded: `rounded-b-[25px]`,

    iconProperties: `w-[20px] h-[20px] absolute top-1/2 transform -translate-y-1/2 fill-white opacity-50`,
    leftIcon: `left-[15px]`,
    rightIcon: `right-[15px]`,
    iconPointer: `cursor-pointer`,

    optionsContainer: `flex flex-col mt-[30px] md:mt-[50px] md:flex-row md:justify-between md:w-[360px]`,
    rememberMe: `text-white text-opacity-75 pl-[10px]`,
    forgotPass: `mt-[15px] md:mt-0 italic text-white text-opacity-75 transition hover:underline`,

    formSubmitBtnContainer: `md:w-[360px] flex justify-end`,
    formSubmitBtn: `flex justify-center items-center w-[275px] md:w-[150px] rounded-[25px] bg-[#80B324] bg-opacity-50 transition hover:bg-opacity-100 text-[16px] text-white text-opacity-75`,
    submitLoginSpacing: `mt-[30px] md:mt-[50px]`,
    submitRegisterSpacing: `mt-[32px]`,
    submitIcon: `w-[40px] h-[40px]`,
  };

  const router = useRouter();
  const [displayLogin, setDisplayLogin] = useState(true);
  const [displayRegister, setDisplayRegister] = useState(false);
  const [displayPassword, setDisplayPassword] = useState(false);

  const [emailLogin, setEmailLogin] = useState("");
  const [passwordLogin, setpasswordLogin] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [emailRegister, setEmailRegister] = useState("");
  const [passwordRegister, setPasswordRegister] = useState("");
  const [repeatPasswordRegister, setRepeatPasswordRegister] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const loginForm = async () => {
    if (displayLogin === false) {
      setDisplayLogin(true);
      setDisplayRegister(false);
    } else {
      setDisplayLogin(false);
      setDisplayRegister(true);
    }
  };

  const registerForm = async () => {
    if (displayRegister === false) {
      setDisplayRegister(true);
      setDisplayLogin(false);
    } else {
      setDisplayRegister(false);
      setDisplayLogin(true);
    }
  };

  const passwordInput = async () => {
    if (displayPassword === false) {
      setDisplayPassword(true);
    } else {
      setDisplayPassword(false);
    }
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    switch (e.target.name) {
      case "emailLogin":
        setEmailLogin(e.target.value);
        break;
      case "passwordLogin":
        setpasswordLogin(e.target.value);
        break;
      case "firstName":
        setFirstName(e.target.value);
        break;
      case "lastName":
        setLastName(e.target.value);
        break;
      case "emailRegister":
        setEmailRegister(e.target.value);
        break;
      case "passwordRegister":
        setPasswordRegister(e.target.value);
        break;
      case "repeatPasswordRegister":
        setRepeatPasswordRegister(e.target.value);
        break;
      case "contactNumber":
        setContactNumber(e.target.value);
        break;
      default:
        break;
    }
  };

  const login = async <T extends MouseEvent>(e: T) => {
    e.preventDefault();
    const loginData = await authLogin({
      email: emailLogin,
      password: passwordLogin,
    });
    if (loginData.login === null) {
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Login Unsuccessful",
        text: "Incorrect email or password",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      let role = "";
      if (loginData.login.isAdmin) role = "admin";
      else if (loginData.login.employeeId === null) role = "manager";
      else role = "employee";

      saveUserInSession({
        role: role,
        firstName: loginData.login.user.firstName,
        lastName: loginData.login.user.lastName,
        email: loginData.login.user.email,
        userId: loginData.login.user._id,
        token: loginData.login.token,
        managerId: loginData.login.managerId,
        employeeId: loginData.login.employeeId,
        roles: "",
      });
      router.push("/");
    }
  };

  const register = async <T extends MouseEvent>(e: T) => {
    e.preventDefault();
    console.log(
      firstName,
      lastName,
      emailRegister,
      passwordRegister,
      repeatPasswordRegister,
      contactNumber
    );
  };

  return (
    <div className={`${tailwindClasses.container}`}>
      <div className={`${tailwindClasses.tabContainer}`}>
        <span
          className={
            displayLogin === true
              ? `${tailwindClasses.textActive}`
              : `${tailwindClasses.textInactive}`
          }
        >
          <button
            onClick={loginForm}
            className={
              displayLogin === true
                ? `${tailwindClasses.tabActive}`
                : `${tailwindClasses.tabInactive}`
            }
            disabled={displayLogin}
          >
            LOGIN
          </button>
        </span>
        <span
          className={
            displayRegister === true
              ? `${tailwindClasses.textActive}`
              : `${tailwindClasses.textInactive}`
          }
        >
          <button
            onClick={registerForm}
            className={
              displayRegister === true
                ? `${tailwindClasses.tabActive}`
                : `${tailwindClasses.tabInactive}`
            }
            disabled={displayRegister}
          >
            REGISTER
          </button>
        </span>
      </div>
      <form
        action="submit"
        className={displayLogin === true ? "block" : "hidden"}
      >
        <div className={`${tailwindClasses.loginFormContainer}`}>
          <label
            htmlFor="emailLogin"
            className={`${tailwindClasses.loginLabel}`}
          >
            <MailIcon
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
            />
            <input
              onChange={onChange}
              value={emailLogin}
              name="emailLogin"
              type="email"
              id="emailLogin"
              className={`${tailwindClasses.loginInputBox}`}
              placeholder="Email Address"
              required
            />
          </label>
          <label
            htmlFor="passwordLogin"
            className={`${tailwindClasses.loginLabel}`}
          >
            <LockClosedIcon
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
            />
            <input
              onChange={onChange}
              value={passwordLogin}
              name="passwordLogin"
              type={displayPassword === true ? "text" : "password"}
              id="passwordLogin"
              className={`${tailwindClasses.loginInputBox}`}
              placeholder="Password"
              required
            />
            {displayPassword === false ? (
              <EyeOffIcon
                onClick={passwordInput}
                className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
              />
            ) : (
              <EyeIcon
                onClick={passwordInput}
                className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
              />
            )}
          </label>
          <div className={`${tailwindClasses.optionsContainer}`}>
            <span>
              <input type="checkbox" id="remember" />
              <label
                htmlFor="remember"
                className={`${tailwindClasses.rememberMe}`}
              >
                Remember me
              </label>
            </span>
            <a href="#" className={`${tailwindClasses.forgotPass}`}>
              Forgot Password?
            </a>
          </div>
          <div className={`${tailwindClasses.formSubmitBtnContainer}`}>
            <button
              onClick={login}
              className={`${tailwindClasses.formSubmitBtn} ${tailwindClasses.submitLoginSpacing}`}
            >
              LOGIN{" "}
              <ChevronRightIcon className={`${tailwindClasses.submitIcon}`} />
            </button>
          </div>
        </div>
      </form>
      <form
        action="submit"
        className={
          displayRegister === true
            ? `${tailwindClasses.registerFormContainer}`
            : "hidden"
        }
      >
        <label
          htmlFor="firstName"
          className={`${tailwindClasses.registerLabel}`}
        >
          <IdentificationIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={firstName}
            name="firstName"
            type="text"
            id="firstName"
            className={`${tailwindClasses.registerInputBox} ${tailwindClasses.topRounded}`}
            placeholder="First Name"
            required
          />
        </label>
        <label
          htmlFor="lastName"
          className={`${tailwindClasses.registerLabel}`}
        >
          <IdentificationIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={lastName}
            name="lastName"
            type="text"
            id="lastName"
            className={`${tailwindClasses.registerInputBox}`}
            placeholder="Last Name"
            required
          />
        </label>
        <label
          htmlFor="emailRegister"
          className={`${tailwindClasses.registerLabel}`}
        >
          <MailIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={emailRegister}
            name="emailRegister"
            type="email"
            id="emailRegister"
            className={`${tailwindClasses.registerInputBox}`}
            placeholder="Email Address"
            required
          />
        </label>
        <label
          htmlFor="passwordRegister"
          className={`${tailwindClasses.registerLabel}`}
        >
          <LockClosedIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={passwordRegister}
            name="passwordRegister"
            type={displayPassword === true ? "text" : "password"}
            id="passwordRegister"
            className={`${tailwindClasses.registerInputBox}`}
            placeholder="Password"
            required
          />
          {displayPassword === false ? (
            <EyeOffIcon
              onClick={passwordInput}
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
            />
          ) : (
            <EyeIcon
              onClick={passwordInput}
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
            />
          )}
        </label>
        <label
          htmlFor="repeatPasswordRegister"
          className={`${tailwindClasses.registerLabel}`}
        >
          <LockClosedIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={repeatPasswordRegister}
            name="repeatPasswordRegister"
            type={displayPassword === true ? "text" : "password"}
            id="repeatPasswordRegister"
            className={`${tailwindClasses.registerInputBox}`}
            placeholder="Repeat Password"
            required
          />
          {displayPassword === false ? (
            <EyeOffIcon
              onClick={passwordInput}
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
            />
          ) : (
            <EyeIcon
              onClick={passwordInput}
              className={`${tailwindClasses.iconProperties} ${tailwindClasses.rightIcon} ${tailwindClasses.iconPointer}`}
            />
          )}
        </label>
        <label
          htmlFor="contactNumber"
          className={`${tailwindClasses.registerLabel}`}
        >
          <PhoneIcon
            className={`${tailwindClasses.iconProperties} ${tailwindClasses.leftIcon}`}
          />
          <input
            onChange={onChange}
            value={contactNumber}
            name="contactNumber"
            type="number"
            id="contactNumber"
            className={`${tailwindClasses.registerInputBox} ${tailwindClasses.bottomRounded}`}
            placeholder="Contact Number"
            required
          />
        </label>
        <div className={`${tailwindClasses.formSubmitBtnContainer}`}>
          <button
            onClick={register}
            className={`${tailwindClasses.formSubmitBtn} ${tailwindClasses.submitRegisterSpacing}`}
          >
            REGISTER{" "}
            <ChevronRightIcon className={`${tailwindClasses.submitIcon}`} />
          </button>
        </div>
      </form>
    </div>
  );
};
export default Form;
