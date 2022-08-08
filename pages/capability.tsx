import { Add } from "@mui/icons-material";
import AddIcon from "@mui/icons-material/Add";
import { PlusCircleIcon } from "@heroicons/react/solid";

function Skills() {
  const tailwindClasses = {
    content: "m-5 mt-[5px]",
    header: "text-2xl",
    input: "border-2",
  };

  return (
    <div className={tailwindClasses.content}>
      <h2 className={tailwindClasses.header}>Capabilities Home</h2>
      <label>Add Capability: </label>
      <input className={tailwindClasses.input} type="text" />
      <button>
        {/* <AddIcon /> */}
        <PlusCircleIcon className="w-[20px] h-[20px]" />
      </button>
    </div>
  );
}

export default Skills;
