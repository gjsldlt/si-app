import styles from './skills.module.scss';

export default function Skills({ children }: PageProps) {
  const tailwindClasses = {
    container: ''
  }
  return (
    <div className={tailwindClasses.container}>
      <main>Skills</main>
    </div>
  )
}

type PageProps = {
  children?: any
}