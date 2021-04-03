import {
  Badge,
  Box,
  Button,
  Container,
  Flex,
  Grid,
  Heading,
  IconButton,
  Tab,
  TabList,
  Tabs,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import Head from 'next/head';
import NextLink from 'next/link';
import React from 'react';

export default function ComplexWords() {
  const bg = useColorModeValue('gray.50', '#223c50');

  return (
    <Flex
      width="full"
      height="full"
      alignItems="center"
      justifyContent="center"
      flexDirection="column">
      <Head>
        <title>Complex Words</title>
      </Head>
      <Grid templateRows="auto 1fr" gap={6} width="full" height="full">
        <Container
          maxW="container.xl"
          position="sticky"
          top="110"
          p={1}
          height="full"
          bg={bg}
          zIndex="10"
          width="full">
          <Flex alignItems="center" justifyContent="space-between" borderWidth={0}>
            <Tabs defaultIndex={0} borderBottomColor="transparent">
              <TabList>
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/0/0'}>Group 1</NextLink>
                </Tab>
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/1/0'}>Group 2</NextLink>
                </Tab>
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/2/0'}>Group 3</NextLink>
                </Tab>
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/3/0'}>Group 4</NextLink>
                </Tab>
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/4/0'}>Group 5</NextLink>
                </Tab>{' '}
                <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/textbook/5/0'}>Group 6</NextLink>
                </Tab>
              </TabList>
            </Tabs>
          </Flex>
        </Container>
        <Container maxW="container.xl">
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
          <Heading size="lg" p={1}>
            Complex Words
          </Heading>
        </Container>
      </Grid>
    </Flex>
  );
}
