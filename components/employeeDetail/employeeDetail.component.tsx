import styles from './sample.module.scss';

export default function EmployeeDetail({ }: PageProps) {
  const tailwindClasses = {
    container: ''
  }
  return (
    <div className={tailwindClasses.container}>
      <div>Employee Detail</div>
    </div>
  )
}

type PageProps = {
}