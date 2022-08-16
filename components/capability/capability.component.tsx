import { useEffect, useState } from "react";
import { PlusIcon, XIcon } from "@heroicons/react/solid";

import {
  getCapabilities,
  addCapability,
} from "../../services/capability.service";
import { CapabilityType } from "../../types/MasterTypes.types";
import LoaderComponent from "../loader/loader.component";
import CapabilityForm from "./capabilityForm.component";

export default function Capability({ children }: PageProps) {
  const tailwindClasses = {
    container:
      " fixed flex flex-col bg-white p-1 min-h-[520px]  md:min-h-100 md:w-[47vw] lg:w-[27vw] border-[1px] shadow-lg",
    toolbar: "flex flex-row",
    title: "flex-1",
    addButton: "h-iconbutton w-iconbutton flex items-center justify-center p-0",
    list: "flex flex-col h-[100px]",
    lineItem: "",
  };
  // const [capabilityToEdit, setCapabilityToEdit] = useState<CapabilityType>();
  const [capabilityList, setCapabilityList] = useState<CapabilityType[]>([]);
  const [loadState, setLoadState] = useState<Boolean>(true);
  const [addState, setAddState] = useState<Boolean>(false);

  const renderData = async () => {
    setAddState(false);
    setLoadState(true);
    setCapabilityList(await getCapabilities());
    setLoadState(false);
  };
  const addNewCapability = () => {
    setAddState(!addState);
  };
  //   const clickCapabilityRow = (id: String) => {
  //     if (enableRowAction) {
  //       if (activeCapability === id) {
  //       onclick(undefined)
  //     }else{onclick(id)}
  //   }

  // }

  const renderList = () => {
    return (
      <div className={tailwindClasses.list}>
        {!loadState &&
          capabilityList.map((item, index) => (
            <div
              key={`manager-line-item-${index}`}
              className={tailwindClasses.lineItem}
            >
              {item.name}
            </div>
          ))}
      </div>
    );
  };

  useEffect(() => {
    renderData();
  }, []);

  return (
    <div className={tailwindClasses.container}>
      {/* <main>Capability test</main> */}

      <div className={tailwindClasses.container}>
        {loadState ? <LoaderComponent /> : null}
        <div className={tailwindClasses.toolbar}>
          <p className={tailwindClasses.title}>Capabilities</p>
          <button
            className={tailwindClasses.addButton}
            onClick={addNewCapability}
          >
            {addState ? (
              <XIcon className="h-5 w-5 text-blue-500" />
            ) : (
              <PlusIcon className="h-5 w-5 text-blue-500" />
            )}
          </button>
        </div>
        {addState ? (
          <CapabilityForm renderData={renderData} setLoadState={setLoadState} />
        ) : (
          renderList()
        )}
      </div>
    </div>
  );
}

type PageProps = {
  children?: any;
};
