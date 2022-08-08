import { useEffect, useState } from "react";

import styles from "./skills.module.scss";
import { getCapabilities } from "../../services/capability.service";

export default function Capability({ children }: PageProps) {
  const [capabilityList, setCapabilityList] = useState([]);
  const tailwindClasses = {
    container: "",
  };
  // let capabilityList = [];

  const populateCapabilities = async () => {
    let tempList = await getCapabilities();
    setCapabilityList(tempList);
    console.log(capabilityList);
  };

  useEffect(()=>{
    populateCapabilities();
  },[])

  return (
    <div className={tailwindClasses.container}>
      <main>Capability test</main>
      {capabilityList.map((item, index) => (
        <div>{item.name}</div>
      ))}
      <div></div>
    </div>
  );
}

type PageProps = {
  children?: any;
};
