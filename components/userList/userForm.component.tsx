import React, { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

import LoaderComponent from "../loader/loader.component";
import { UserType } from "../../types/MasterTypes.types";

export default function UserList({ userToEdit }: PageProps) {
    const [firstName, setFirstName] = useState<String>(userToEdit ? userToEdit.firstName : '');
    const [lastName, setLastName] = useState<String>(userToEdit ? userToEdit.lastName : '');
    const [email, setEmail] = useState<String>(userToEdit ? userToEdit.email : '');
    const [password, setPassword] = useState<String>('');
    const [confirmPassword, setConfirmPassword] = useState<String>('');
    const tailwindClasses = {
        form: 'flex flex-wrap w-full max-w-lg',
        formItemHalf: 'w-full md:w-1/2 px-3 pt-1 md:pt-0',
        formItem: 'w-full px-3 pt-1',
        inputLabel: 'block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2 mr-1',
        input: 'appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500',
        formButton: 'bg-transparent hover:bg-sidebar text-sidebar font-semibold hover:text-white py-2 px-4 border border-sidebar hover:border-transparent rounded',
    }

    const onSubmitForm = (e: any) => {
        e.preventDefault();
        if (userToEdit) {
            //  submit to update
            console.log('submit to update',userToEdit)
        } else {
            // submit to create
            console.log('submit to create',)
        }
    }

    const onInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        switch (e.target.name) {
            case "firstName": setFirstName(e.target.value); break;
            case "lastName": setLastName(e.target.value); break;
            case "email": setEmail(e.target.value); break;
            case "password": setPassword(e.target.value); break;
            case "confirmPassword": setConfirmPassword(e.target.value); break;
            default: break;
        }
    }

    return (
        <form className={tailwindClasses.form} onSubmit={onSubmitForm}>
            <div className={tailwindClasses.formItemHalf}>
                <label className={tailwindClasses.inputLabel} htmlFor="grid-first-name">
                    First Name
                </label>
                <input
                    required
                    name="firstName"
                    onChange={onInputChange}
                    value={firstName}
                    className={tailwindClasses.input}
                    id="grid-first-name"
                    type="text"
                    placeholder="Jane" />
            </div>
            <div className={tailwindClasses.formItemHalf}>
                <label className={tailwindClasses.inputLabel} htmlFor="grid-last-name">
                    Last Name
                </label>
                <input
                    required
                    name="lastName"
                    onChange={onInputChange}
                    value={lastName}
                    className={tailwindClasses.input}
                    id="grid-last-name"
                    type="text"
                    placeholder="Doe" />
            </div>
            <div className={tailwindClasses.formItem}>
                <label className={tailwindClasses.inputLabel} htmlFor="grid-email-name">
                    Email
                </label>
                <input
                    required
                    name="email"
                    onChange={onInputChange}
                    value={email}
                    className={tailwindClasses.input}
                    id="grid-email-name"
                    type="email"
                    placeholder="email@email.com" />
            </div>
            {
                userToEdit === undefined && <>
                    <div className={tailwindClasses.formItem}>
                        <label className={tailwindClasses.inputLabel} htmlFor="grid-password-name">
                            Password
                        </label>
                        <input
                            required
                            name="password"
                            onChange={onInputChange}
                            value={password}
                            className={tailwindClasses.input}
                            id="grid-password-name"
                            type="password" />
                    </div>

                    <div className={tailwindClasses.formItem}>
                        <label className={tailwindClasses.inputLabel} htmlFor="grid-confirmPassword-name">
                            Confirm Password
                        </label>
                        <input
                            required
                            name="confirmPassword"
                            onChange={onInputChange}
                            value={confirmPassword}
                            className={tailwindClasses.input}
                            id="grid-confirmPassword-name"
                            type="password" />
                    </div>
                </>
            }
            <div className={`${tailwindClasses.formItem} mt-1 flex justify-end`}>
                <button className={tailwindClasses.formButton} type="submit">
                    {userToEdit === undefined ? 'Create' : 'Update'}
                </button>
            </div>
        </form>
    )
}

type PageProps = {
    userToEdit?: UserType,
}