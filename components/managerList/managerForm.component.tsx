import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

import LoaderComponent from "../loader/loader.component";
import { ManagerType } from "../../types/MasterTypes.types";

export default function ManagerList({ managerToEdit }: PageProps) {
  const [firstName, setFirstName] = useState(
    managerToEdit ? managerToEdit.firstName : ""
  );
  const [lastName, setLastName] = useState(
    managerToEdit ? managerToEdit.lastName : ""
  );

  const tailwindClasses = {
    form: "flex flex-col w-full max-w-lg",
  };

  const onSubmitForm = (e: any) => {
    e.preventDefault();
    if (managerToEdit) {
      // submit to update
    } else {
      // submit to create
    }
  };

  useEffect(() => {}, []);

  return (
    <form className="w-full max-w-lg" onSubmit={onSubmitForm}>
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-first-name"
          >
            First Name
          </label>
          <input
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
            id="grid-first-name"
            value={firstName}
            type="text"
            placeholder="Jane"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="grid-last-name"
          >
            Last Name
          </label>
          <input
            value={lastName}
            className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
            id="grid-last-name"
            type="text"
            placeholder="Doe"
          />
        </div>
      </div>
    </form>
    // <form>

    // </form>
  );
}

type PageProps = {
  managerToEdit?: any;
};
