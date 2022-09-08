import { useState } from 'react';
import { useRouter } from 'next/router'
import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/login.module.css"

const Login = () => {
  const [email, setEmail] = useState('');
  const [userMsg, setUserMsg] = useState('')

  const router = useRouter()

  const handleOnChangeEmail = (e) => {
    setUserMsg('');
    const email = e.target.value;
    setEmail(email);
  }

  const handleLoginWithEmail = (e) => {
    console.log('login button')
    e.preventDefault();

    if (email) {
      if (email === 'chrtravels@gmail.com') {
        router.push('/');
      } else {
        setUserMsg('Something went wrong logging in')
      }
    } else {
      setUserMsg('Enter a valid email address');
    }

  };

  return (
    <div className={styles.container}>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header className={styles.header}>
        <div className={styles.headerWrapper}>
          <Link className={styles.logoLink} href="/">
            <a>
              <div className={styles.logoWrapper}>
                <Image
                  src="/static/netflix.svg"
                  alt="Netflix logo"
                  width="128px"
                  height="34px"
                />
              </div>
            </a>
          </Link>
        </div>
      </header>

      <main className={styles.main}>
        <div className={styles.mainWrapper}>
          <h1 className={styles.signinHeader}>Sign In</h1>
          <input
            type="text"
            placeholder="Email address"
            className={styles.emailInput}
            onChange={handleOnChangeEmail}
          />
          <p className={styles.userMsg}>{userMsg}</p>
          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>
            Sign In
          </button>
        </div>
      </main>
    </div>

  )
}

export default Login;
