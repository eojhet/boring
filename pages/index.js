import Head from 'next/head'
import DrillerInfo from '../formComponents/drillerInfo'
import styles from '/styles/Home.module.scss'

export default function Home() {

  return (
    <div className={styles.container}>
      <Head>
        <title>The Boring App</title>
        <meta name="Boring App" content="Build a boring log" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1>The Boring App</h1>
          <p>{`Please enter boring log information below then hit "Create PDF" when finished.`}</p>
        </div>
        
        <DrillerInfo/>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://www.eojhet.com"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by EOJHET&reg;
        </a>
      </footer>
    </div>
  )
}
