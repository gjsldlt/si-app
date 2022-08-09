// import styles from './loader.style.scss';
import LoaderImg from "../../public/assets/images/loader.gif";

export default function Loader({ }: PageProps) {
  const tailwindClasses = {
    container: 'absolute z-[10] h-full w-full bg-[rgba(0,0,0,0.1)] top-0 left-0 flex items-center justify-center',
    item:'bg-[]'
  }
  return (
    <div className={tailwindClasses.container}>
      <img src={LoaderImg.src} />
    </div>
  )
}

type PageProps = {
}