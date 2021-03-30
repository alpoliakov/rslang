import { Flex, Heading } from '@chakra-ui/react';
import Head from 'next/head';
import React from 'react';

export default function Settings() {
  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>User Settings</title>
      </Head>
      <Heading
        mb={4}
        fontSize={{ base: '3xl', md: '4xl' }}
        fontWeight="bold"
        lineHeight={{ base: 'shorter', md: 'none' }}
        letterSpacing={{ base: 'normal', md: 'tight' }}>
        Settings Page
      </Heading>
    </Flex>
  );
}
