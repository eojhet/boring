import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.scss'

export default function Home() {


  return (
    <div className={styles.container}>
      <Head>
        <title>The Boring App</title>
        <meta name="Boring App" content="Build a boring log" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1>Welcome to the Boring App!</h1>
        <p>This is where I hope you'll be able to enter data for boring logs and have a graphical representation spit back out at you!</p>

      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by EOJHET&reg;
        </a>
      </footer>
    </div>
  )
}
