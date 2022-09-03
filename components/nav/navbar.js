import styles from './navbar.module.css';
import Image from 'next/image';

import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState } from 'react';

const NavBar = (props) => {
  const { username } = props;

  const [showDropdown, setShowDropdown] = useState(false);

  const router = useRouter();

  const handleOnClickHome = (e) => {
    e.preventDefault()
    router.push('/')
  }

  const handleOnClickMyList = (e) => {
    e.preventDefault()
    router.push('/browse/my-list')
  }

  const handleShowDropdown = (e) => {
    e.preventDefault();
    setShowDropdown(!showDropdown)
  }

  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <Link href="/">
          <a className={styles.logoLink}>
            <div className={styles.logoWrapper}>
              <Image
                alt="netflix logo"
                src="/static/netflix.svg"
                width="128px"
                height="34px"
              />
            </div>
          </a>
        </Link>

        <ul className={styles.navItems}>
          <li className={styles.navItem} onClick={handleOnClickHome}>Home</li>
          <li className={styles.navItem2} onClick={handleOnClickMyList}>My List</li>
        </ul>

        <nav className={styles.navContainer}>
          <div>
            <button className={styles.usernameBtn} onClick={handleShowDropdown}>
              <p styles={styles.username}>{username}</p>
              <Image
                alt="expand dropdown icon"
                src="/static/icons/expand_more.svg"
                width="24px"
                height="24px"
              />
            </button>

            {showDropdown && (
              <div className={styles.navDropdown}>
                <div>
                  <Link href="/login">
                    <a className={styles.linkName}>Sign out</a>
                  </Link>
                  <div className={styles.lineWrapper}></div>
                </div>
              </div>
            )}
          </div>
        </nav>
      </div>
    </div>
  )
}

export default NavBar;
