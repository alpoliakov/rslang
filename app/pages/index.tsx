import { Box, Container, Flex, Heading } from '@chakra-ui/layout';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import AboutTeam from '../components/AboutTeam';
import Features from '../components/Features';
import Loading from '../components/Loading';
import MainAccordion from '../components/MainAccordion';
import Menu from '../components/Menu';
import Player from '../components/Player';
import Promo from '../components/Promo';
import { DAY_IN_mSECONDS, DEMONSTRATION_VIDEO } from '../constants';
import { initializeApollo } from '../lib/apollo';
import { useClearDayStatisticMutation } from '../lib/graphql/clearDayStatistic.graphql';
import { StatisticDocument } from '../lib/graphql/statistic.graphql';
import { useAuth } from '../lib/useAuth';

export default function Home() {
  const [state, setState] = useState(false);
  const [statistic, setStatistic] = useState(null);

  const [clearStatistic] = useClearDayStatisticMutation();

  const { user } = useAuth();

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

  const processingTimeStatistics = async () => {
    const dataStatistic = new Date(statistic.optional.createDate).getTime();
    const currentTime = new Date().getTime();
    const difTimeInDays = (currentTime - dataStatistic) / DAY_IN_mSECONDS;

    if (difTimeInDays > 1) {
      const { data } = await clearStatistic();
      if (data.clearDayStatistic._id) {
        toast.success('Дневная статистика очищена');
      }
    }
  };

  useEffect(() => {
    if (statistic) {
      processingTimeStatistics();
    }
  }, [statistic]);

  useEffect(() => {
    if (user) {
      fetchStatistic().then((data) => setStatistic(data));
    }
  }, [user]);

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
