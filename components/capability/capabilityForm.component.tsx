import { useEffect, useState } from "react";
import { addCapability } from "../../services/capability.service";

export default function CapabilityForm({
  renderData,
  setLoadState,
}: PageProps) {
  const [formName, setFormName] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const tailwindClasses = {
    form: "flex flex-col",
    addButton: "mt-[200px] pl-[90px] bg-blue-300 ",
    input:
      "appearance-none block w-[300px] bg-gray-200 text-gray-700 border  rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white",
  };
  useEffect(() => {}, []);
  //onchange
  const capabilityOnChange = (evt) => {
    switch (evt.target.name) {
      case "formName":
        setFormName(evt.target.value);
        break;
      case "formDescription":
        setFormDescription(evt.target.value);
        break;
      default:
        break;
    }
  };

  //onchange
  ///onsubmit
  const capabilityOnSubmit = async (evt) => {
    evt.preventDefault();
    setLoadState(true);
    if (formName !== "" && formDescription !== "") {
      const newCapability = await addCapability(formName, formDescription);
      setFormName("");
      setFormDescription("");
      renderData();
    }

    // console.log(newCapability);
  };
  ///onsubmit
  return (
    <form onSubmit={capabilityOnSubmit} className="w-full max-w-lg ">
      <div className="flex flex-wrap -mx-3 mb-6">
        <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="formName"
          >
            Capability
          </label>
          <input
            onChange={capabilityOnChange}
            value={formName}
            name="formName"
            required
            className={tailwindClasses.input}
            id="formName"
            type="text"
            placeholder="Jane"
          />

          <label
            className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
            htmlFor="formDescription"
          >
            Description
          </label>
          <input
            onChange={capabilityOnChange}
            value={formDescription}
            name="formDescription"
            required
            className={tailwindClasses.input}
            id="formDescription"
            type="text"
            placeholder="Jane"
          />
        </div>
        <div className="w-full md:w-1/2 px-3">
          <button type="submit" className={tailwindClasses.addButton}>
            add
          </button>
        </div>
      </div>
    </form>
  );
}

type PageProps = {
  renderData: () => {};
  setLoadState: React.Dispatch<React.SetStateAction<Boolean>>;
};
