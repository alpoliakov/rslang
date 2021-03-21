import { Box, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import Loading from '../components/Loading';

export default function Home() {
  const [state, setState] = useState(false);

  if (state) {
    return <Loading />;
  }

  return (
    <Box>
      <Head>
        <title>Home Page</title>
      </Head>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
      <Heading as="h1">Home page</Heading>
    </Box>
  );
}
