import Head from "next/head";
import Link from "next/link";
import Image from "next/image";

import styles from "../styles/login.module.css"

const Login = () => {

  const handleLoginWithEmail = (e) => {
    console.log('login button')
    e.preventDefault();
  }

  return (
    <div>
      <Head>
        <title>Netflix SignIn</title>
      </Head>
      <header>
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

      <div className={styles.mainWrapper}>
        <main className={styles.main}>
          <h1 className={styles.inputHeader}>Sign In</h1>
          <input type="text" placeholder="Email Address" className={styles.emailInput} />

          <p className={styles.userMsg}></p>

          <button onClick={handleLoginWithEmail} className={styles.loginBtn}>Sign In</button>
        </main>
      </div>
    </div>

  )
}

export default Login;
