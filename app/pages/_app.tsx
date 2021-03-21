import '../styles/global.css';

import { ApolloProvider } from '@apollo/client';
import { AnimatePresence } from 'framer-motion';
// import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import React from 'react';

import Layout from '../components/Layout';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../lib/useAuth';
import { Chakra } from '../src/Chakra';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Chakra cookies={pageProps.cookies}>
          <AnimatePresence exitBeforeEnter>
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </AnimatePresence>
        </Chakra>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
