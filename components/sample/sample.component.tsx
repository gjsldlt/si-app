import styles from './sample.module.scss';

export default function Sample({ children }) {
    return (
      <div className={styles.sample}>
        <main>Sample</main>
      </div>
    )
  }