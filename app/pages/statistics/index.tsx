import {
  Box,
  Container,
  Button,
  Collapse,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useState } from 'react';

import ShortTermStatistics from '../../components/ShortTermStatistics';

export default function Stat() {
  const [isButtonDayActive, setIsButtonDayActive] = useState(true);
  const [isButtonAllTimeActive, setIsButtonAllTimeActive] = useState(false);

  const wordsLearnedByDay = [
    {
      day: '10 апреля',
      words: 10,
    },
    {
      day: '11 апреля',
      words: 15,
    },
    {
      day: '12 апреля',
      words: 25,
    },
    {
      day: '13 апреля',
      words: 20,
    },
    {
      day: '14 апреля',
      words: 0,
    },
  ];

  const handleButtonClick = (buttonType) => () => {
    if (!buttonType) {
      setIsButtonDayActive(!isButtonDayActive);
      setIsButtonAllTimeActive(!isButtonAllTimeActive);
    }
  };

  const LongTermStatistics = dynamic(
    () => {
      return import('../../components/LongTermStatistics');
    },
    { ssr: false },
  );

  return (
    <Container maxW="container.xl" p={2}>
      <Head>
        <title>Статистика</title>
      </Head>
      <Heading as="h1" fontSize="4xl" mb={2}>
        Статистика
      </Heading>
      <Flex direction={['column', 'row']} mb={5}>
        <Button
          colorScheme="teal"
          variant="outline"
          mr={[0, 5]}
          mb={5}
          isActive={isButtonDayActive}
          onClick={handleButtonClick(isButtonDayActive)}>
          Статистика за день
        </Button>
        <Button
          colorScheme="teal"
          variant="outline"
          isActive={isButtonAllTimeActive}
          onClick={handleButtonClick(isButtonAllTimeActive)}>
          Статистика за все время
        </Button>
      </Flex>
      <Collapse in={isButtonDayActive} animateOpacity>
        <ShortTermStatistics />
      </Collapse>
      <Collapse in={isButtonAllTimeActive} animateOpacity>
        <LongTermStatistics statistics={wordsLearnedByDay} />
      </Collapse>
    </Container>
  );
}
