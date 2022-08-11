import { useEffect, useState } from "react";

export default function ManagerList({}: PageProps) {
  const [addName, setAddName] = useState("");
  const [addDescription, setAddDescription] = useState("");
  const tailwindClasses = {
    form: "flex flex-col",
    addButton: "pt-[200px] pl-[90px]",
    input:
      "appearance-none block w-[300px] bg-gray-200 text-gray-700 border border-red-500 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
  };
  useEffect(() => {}, []);

  const capabilityOnChange = (evt) => {
    switch (evt.target.name) {
      case "addName":
        setAddName(evt.target.value);
        break;
      case "addDescription":
        setAddDescription(evt.target.value);
        break;
      default:
        break;
    }
  };

  const capabilityOnSubmit = (evt) => {
    evt.preventDefault();
    console.log(addName, addDescription);
  };

  return (
    <form className="w-full max-w-lg">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Add Capability
          </label>
          <input
            onChange={capabilityOnChange}
            value={addName}
            name="addName"
            required
            className={tailwindClasses.input}
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            for="grid-first-name"
          >
            Add Description
          </label>
          <input
            onChange={capabilityOnChange}
            value={addDescription}
            name="addDescription"
            required
            className={tailwindClasses.input}
            id="grid-first-name"
            type="text"
            placeholder="Jane"
          />
          <p className="text-red-500 text-xs italic">
            Please fill out this field.
          </p>
        </div>
        <div className="w-full md:w-1/2 px-3">
          <button
            onClick={capabilityOnSubmit}
            className={tailwindClasses.addButton}
          >
            add
          </button>
        </div>
      </div>
    </form>
  );
}

type PageProps = {};
