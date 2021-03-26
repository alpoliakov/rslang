import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { useState } from 'react';

import AboutTeam from '../components/AboutTeam';
import Features from '../components/Features';
import Loading from '../components/Loading';
import MainAccordion from '../components/MainAccordion';
import Menu from '../components/Menu';
import Player from '../components/Player';
import Promo from '../components/Promo';
import { DEMONSTRATION_VIDEO } from '../constants';

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
      <Box mb={10}>
        <Menu />
      </Box>
      <MainAccordion>
        <Box p={[1, 5, 20]}>
          <Promo />
        </Box>
        <Features />
        <Box p={5}>
          <Heading as="h2" textAlign={'center'}>
            Демонстрация работы с приложением
          </Heading>
          <Box h={400}>
            <Player videoUrl={DEMONSTRATION_VIDEO} />
          </Box>
        </Box>
        <Box pb={5}>
          <AboutTeam />
        </Box>
      </MainAccordion>
    </Container>
  );
}
