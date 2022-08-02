import styles from './sample.module.scss';

export default function Sample({ children }: PageProps) {
  const tailwindClasses = {
    container: ''
  }
  return (
    <div className={tailwindClasses.container}>
      <main>Sample</main>
    </div>
  )
}

type PageProps = {
  children: any
}