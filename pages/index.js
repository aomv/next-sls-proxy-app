import { Component } from 'react'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import fetch from 'node-fetch'

class Result extends Component {
  constructor(props) {
    super(props);
    this.state = {
      response: null
    }
  }
  
  componentDidMount = async () => {
    const response = await fetch('/api/accounts/test');
    const contentType = response.headers.get('content-type');
    let resultString;
    if (contentType === 'text/html') {
      resultString = await response.text();
    } else if (contentType === 'application/json') {
      const json = await response.json();
      resultString = JSON.stringify(json, null, 2);
    }

    this.setState({
      result: `${response.status}: ${resultString}`
    });
  }

  render = () => {
    const result = this.state.result;
    
    if (!result) return <div>loading...</div>
    return <div><code>{ result }</code></div>
  }
}

export default function Home() {
  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.description}>
          <Result />
        </h1>
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{' '}
          <img src="/vercel.svg" alt="Vercel Logo" className={styles.logo} />
        </a>
      </footer>
    </div>
  )
}
