import '../styles/globals.css'
import { useEffect } from 'react';
import { useRouter } from 'next/router';

import { magic } from '../lib/magic-client';

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    const checkLogin = async () => {
      const isLoggedIn = await magic.user.isLoggedIn()
      if (isLoggedIn) {
        router.push('/');
      } else {
        router.push('/login');
      }
    }; checkLogin();
  }, [])

  return <Component {...pageProps} />
}

export default MyApp
