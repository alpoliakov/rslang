import { useQuery } from '@apollo/client';
import {
  Box,
  Button,
  Collapse,
  Container,
  Flex,
  Grid,
  GridItem,
  Heading,
  Text,
  useColorModeValue,
} from '@chakra-ui/react';
import dynamic from 'next/dynamic';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';

import Loading from '../../components/Loading';
import ShortTermStatistics from '../../components/ShortTermStatistics';
import { GET_LOCAL_STATISTIC } from '../../context/statistic/operations/queries/getLocalStatistic';
import { initializeApollo } from '../../lib/apollo';
import { StatisticDocument } from '../../lib/graphql/statistic.graphql';
import { useAuth } from '../../lib/useAuth';
import { nonAuthUserStatistic } from '../../utils/processingUserLocalStatistic';

export default function Stat() {
  const [isButtonDayActive, setIsButtonDayActive] = useState(true);
  const [isButtonAllTimeActive, setIsButtonAllTimeActive] = useState(false);
  const [statistic, setStatistic] = useState(null);

  const { user } = useAuth();
  const [localState, setLocalState] = useState(null);

  const {
    data: { localStatistics },
    loading,
  } = useQuery(GET_LOCAL_STATISTIC);

  useEffect(() => {
    setLocalState(nonAuthUserStatistic('localStatistic', localStatistics));
  }, []);

  if (loading) {
    return <Loading />;
  }

  const fetchStatistic = async () => {
    const apollo = initializeApollo();

    try {
      const { data } = await apollo.query({
        query: StatisticDocument,
      });

      if (data.statistic._id) {
        return data.statistic;
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    if (user) {
      fetchStatistic().then((data) => setStatistic(data));
    }
  }, [user]);

  const stat = user ? statistic : localState;

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

        {user && statistic ? (
          <Button
            colorScheme="teal"
            variant="outline"
            isActive={isButtonAllTimeActive}
            onClick={handleButtonClick(isButtonAllTimeActive)}>
            Статистика за все время
          </Button>
        ) : (
          ''
        )}
      </Flex>
      {stat ? (
        <Collapse in={isButtonDayActive} animateOpacity>
          <ShortTermStatistics statistics={stat} />
        </Collapse>
      ) : (
        <Loading />
      )}

      {user && statistic ? (
        <Collapse in={isButtonAllTimeActive} animateOpacity>
          <LongTermStatistics statistics={statistic.statisticPerDay} />
        </Collapse>
      ) : (
        ''
      )}
    </Container>
  );
}
