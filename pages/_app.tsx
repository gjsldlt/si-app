import type { AppProps } from 'next/app';
import { useEffect } from 'react';
import React from 'react';
import { useRouter } from 'next/router';
import '../styles/globals.css';
import Layout from '../components/layout/layout.component';
import { accessUserInSession } from '../services/user.service';

// Theme Material UI
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { CacheProvider, EmotionCache } from '@emotion/react';
import theme from '../config/theme';
import createEmotionCache from '../config/createEmotionCache';
import Head from 'next/head';

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();
interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

export default function MyApp(props: MyAppProps) {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props;

  const user = accessUserInSession();
  const router = useRouter();
  const noLayoutFlag =
    router.pathname === '/login' || router.pathname === '/_error';

  useEffect(() => {
    if (user === null && router.pathname !== '/login') {
      router.replace('/login');
    } else if (user !== null && router.pathname === '/login') {
      router.replace('/');
    }
  }, [router, user]);

  return (
    <CacheProvider value={emotionCache}>
      <Head>
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>
      <ThemeProvider theme={theme}>
        {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
        <CssBaseline />
        <>
          {!noLayoutFlag ? (
            <Layout>
              <Component {...pageProps} />
            </Layout>
          ) : (
            <Component {...pageProps} />
          )}
        </>
      </ThemeProvider>
    </CacheProvider>
  );
}
