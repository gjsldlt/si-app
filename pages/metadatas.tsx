import Link from "next/link";

import PageBanner from "../components/pageBanner/pageBanner.component";

import MetadataComponent from "../components/metadata/metadata.component";

function Metadata() {
  const tailwindClasses = {
    customBanner: 'h-full w-full flex items-center justify-start p-[2rem]',
    content: 'flex relative mx-1 md:mx-0 md:mr-4 md:pl-[1rem] pt-1 md:py-[1rem] flex flex-col md:flex-row gap-1 md:gap-[1rem] z-[1] md:flex-grow',
    header: 'text-2xl text-white z-[5]',
    box: 'flex flex-grow overflow-auto'
  }

  return (
    <>
      <PageBanner content={<div className={tailwindClasses.customBanner}>
        <h1 className={tailwindClasses.header}>Metadata List</h1>
      </div>} />
      <div className={tailwindClasses.content}>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="skill" />
        </div>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="capability" />
        </div>
        <div className={tailwindClasses.box}>
          <MetadataComponent type="industry" />
        </div>
      </div>
    </>
  );
}

export default Metadata;

