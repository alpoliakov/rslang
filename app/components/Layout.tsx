import { useColorModeValue } from '@chakra-ui/color-mode';
import { Box } from '@chakra-ui/layout';
import Head from 'next/head';
import React from 'react';

import Footer from './Footer';
import Header from './Header';

export default function Layout({ children }) {
  const bg = useColorModeValue('gray.50', '#223c50');

  return (
    <Box className="main_container" bg={bg}>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <Header />
      {children}
      <Footer />
    </Box>
  );
}
