import type { AppProps } from 'next/app'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import '../styles/globals.css'

import Layout from '../components/layout/layout.component'
import {accessUserInSession} from '../services/user.service';

function MyApp({ Component, pageProps }: AppProps) {

  const router = useRouter();

  useEffect(() => {
    let user = accessUserInSession();
    if (user === null && router.pathname !== '/login') {
      router.replace('/login');
    }
  }, [router])

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>)
}

export default MyApp
