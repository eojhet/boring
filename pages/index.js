import Head from 'next/head'
import { useState } from 'react';
import BoringLog from '../formComponents/boringLog'
import DrillerInfo from '../formComponents/drillerInfo'
import styles from '/styles/Home.module.scss'

export default function Home() {
  const [test, setTest] = useState({0:1,1:2,2:3});

  return (
    <div className={styles.container}>
      <Head>
        <title>The Boring App</title>
        <meta name="Boring App" content="Build a boring log" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <div className={styles.title}>
          <h1>Welcome to the Boring App!</h1>
          <p>{`This is where I hope you'll be able to enter data for boring logs and have a graphical representation spit back out at you!`}</p>
        </div>
        
        <DrillerInfo test={test}/>

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
