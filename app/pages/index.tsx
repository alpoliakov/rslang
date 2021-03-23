import { Box, Container, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import AboutTeam from '../components/AboutTeam';
import Loading from '../components/Loading';
import MainAccordion from '../components/MainAccordion/';
import Player from '../components/Player';
import Promo from '../components/Promo';
import Menu from "../components/Menu";

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
      <Menu />
      <MainAccordion>
        <Box p={[1, 5, 20]}>
          <Promo />
        </Box>
        <Box p={5}>
          <Heading as="h2" textAlign={'center'}>
            Демонстрация работы с приложением
          </Heading>
          <Box h={400}>
            <Player videoUrl="https://www.youtube.com/watch?v=XqZsoesa55w" />
          </Box>
        </Box>
        <Box pb={5}>
          <AboutTeam />
        </Box>
      </MainAccordion>
    </Container>
  );
}
