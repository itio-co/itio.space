import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>ITIO Space</title>
        <meta name="description" content="ITIO space" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className={styles.topWrapper}>
        <nav className={styles.pullRight}>
          <a
            href="https://github.com/itio-co/itio.space"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image src="/GitHub-Mark-Light-32px.png" alt="Github Logo" width={32} height={32} />
          </a>
        </nav>
      </div>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.title}>
            Welcome to <a href="https://itio.space">ITIO Space</a> |
          </h1>
        </div>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer>
    </div>
  )
}
