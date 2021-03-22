import { Box, Container, Heading, Text } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import GradientContainer from '../components/GradientContainer';
import Loading from '../components/Loading';
import Player from '../components/Player';
import Promo from '../components/Promo';

export default function Home() {
  const [state, setState] = useState(false);

  if (state) {
    return <Loading />;
  }
  return (
    <Container maxW="container.xl">
      <Head>
        <title>Home Page</title>
      </Head>
      <GradientContainer mb={20}>
        <Promo />
      </GradientContainer>
      <GradientContainer>
        <Heading as="h2" textAlign={'center'}>
          Демонстрация работы с приложением
        </Heading>
        <Box h={400}>
          <Player videoUrl="https://www.youtube.com/watch?v=XqZsoesa55w" />
        </Box>
      </GradientContainer>
    </Container>
  );
}
