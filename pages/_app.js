import '../styles/globals.css'
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';

import { magic } from '../lib/magic-client';

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

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

  useEffect(() => {
    const handleComplete = () => {
      setIsLoading(false);
    }
    router.events.on('routeChangeComplete', handleComplete);
    router.events.on('routeChangeError', handleComplete);

    return () => {
      router.events.off('routeChangeComplete', handleComplete);
      router.events.off('routeChangeError', handleComplete);
    }
  }, [router]);

  return isLoading ? <div>Loading...</div> : <Component {...pageProps} />
}

export default MyApp
