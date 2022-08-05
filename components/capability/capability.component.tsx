import styles from "./skills.module.scss";
import CapabilityPage from "../../pages/capability";

export default function Capability({ children }: PageProps) {
  const tailwindClasses = {
    container: "",
  };
  return (
    <div className={tailwindClasses.container}>
      <main>Capability</main>
      <div>
        <CapabilityPage />
      </div>
    </div>
  );
}

type PageProps = {
  children?: any;
};
