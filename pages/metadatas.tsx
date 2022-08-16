import Link from "next/link";

import PageBanner from "../components/pageBanner/pageBanner.component";
import Skills from "../components/skills/skills.component";
import Capability from "../components/capability/capability.component";
import Industry from "../components/industries/industries.component";

function Metadata() {
  const tailwindClasses = {
    customBanner: "h-full w-full flex items-center justify-start p-[2rem]",
    content: "mt-[105px] pl-[1rem] flex flex-col md:flex-row gap-[2rem]",
    header: "text-2xl text-white z-[5]",
    widget: "bg-current h-[100px] w-[75px] flex-grow md:h-[100px]",
  };

  return (
    <>
      <PageBanner
        content={
          <div className={tailwindClasses.customBanner}>
            <h1 className={tailwindClasses.header}>Metadata List</h1>
          </div>
        }
      />
      <div className={tailwindClasses.content}>
        <div className={tailwindClasses.widget}>
          <Skills />
        </div>
        <div className={tailwindClasses.widget}>
          <Capability />
        </div>
        <div className={tailwindClasses.widget}>
          <Industry />
        </div>
      </div>
    </>
  );
}

export default Metadata;
