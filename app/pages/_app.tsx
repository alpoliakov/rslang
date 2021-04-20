import '../styles/global.css';

import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
// import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React, { useEffect } from 'react';

import Layout from '../components/Layout';
import { AppWrapper } from '../context/ContextApp';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../lib/useAuth';
import { Chakra } from '../src/Chakra';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');
    if (jssStyles && jssStyles.parentNode) {
      jssStyles.parentNode.removeChild(jssStyles);
    }
  }, []);

  return (
    <ApolloProvider client={apolloClient}>
      <Chakra cookies={pageProps.cookies}>
        <AuthProvider>
          <AppWrapper>
            <Layout>
              <AnimatePresence exitBeforeEnter>
                <Component {...pageProps} />
              </AnimatePresence>
            </Layout>
          </AppWrapper>
        </AuthProvider>
      </Chakra>
    </ApolloProvider>
  );
}

export default MyApp;
