// import '@/styles/globals.css'
// import Head from 'next/Head'
import '../styles/nprogress.css'

import { useRouter } from 'next/router';
import { useEffect } from 'react';

import NProgress from 'nprogress';
import { ChakraProvider, Spinner } from "@chakra-ui/react";

import Layout from '../components/Layout';


export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    NProgress.configure({showSpinner: false})
    router.events.on('routeChangeStart', () =>  NProgress.start());
    router.events.on('routeChangeComplete', () =>  NProgress.done());
    router.events.on('routeChangeError', () =>  NProgress.done());
  }, []);
  
  return (
      <ChakraProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ChakraProvider>
  )

}
