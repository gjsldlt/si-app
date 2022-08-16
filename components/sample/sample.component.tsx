import styles from './sample.module.scss';

export default function Sample({ }: PageProps) {
  const tailwindClasses = {
    container: ''
  }
  return (
    <div className={tailwindClasses.container}>
      <div>Sample</div>
    </div>
  )
}

type PageProps = {
}