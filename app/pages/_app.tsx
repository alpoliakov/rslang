import '../styles/global.css';

import { ApolloProvider } from '@apollo/client';
import type { AppProps } from 'next/app';
import React from 'react';

import Layout from '../components/Layout';
import { useApollo } from '../lib/apollo';
import { AuthProvider } from '../lib/useAuth';

function MyApp({ Component, pageProps }: AppProps) {
  const apolloClient = useApollo(pageProps.initialApolloState);

  return (
    <ApolloProvider client={apolloClient}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </ApolloProvider>
  );
}

export default MyApp;
