import styles from "./skills.module.scss";

export default function Capability({ children }: PageProps) {
  const tailwindClasses = {
    container: "",
  };
  return (
    <div className={tailwindClasses.container}>
      <main>Capability</main>
      <div></div>
    </div>
  );
}

type PageProps = {
  children?: any;
};
