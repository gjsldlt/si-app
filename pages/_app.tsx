import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

import Layout from '../components/layout/layout.component'
import { accessUserInSession } from '../services/user.service';

function MyApp({ Component, pageProps }: AppProps) {
  let user = accessUserInSession();
  const router = useRouter();

  const renderApp = () => {
    return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
    )
  }

  useEffect(() => {
    if (user === null && router.pathname !== '/login') {
      router.replace('/login');
    } else if (user !== null && router.pathname==='/login'){
      router.replace('/');
    }
  }, [router])

  return renderApp();
}

export default MyApp
