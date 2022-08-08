import styles from "./skills.module.scss";
import { getCapabilities } from "../../services/capability.service";

export default function Capability({ children }: PageProps) {
  const tailwindClasses = {
    container: "",
  };
  let capabilityList = [];

  const populateCapabilities = async () => {
    capabilityList = await getCapabilities();
    console.log(capabilityList);
  };

  populateCapabilities();

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
