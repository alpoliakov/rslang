import { Box, Flex, Heading, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FcRating, FcRatings } from 'react-icons/fc';
import { MdUpdate } from 'react-icons/md';

import Loading from '../../../components/Loading';
import { useStatisticQuery } from '../../../lib/graphql/statistic.graphql';
import { useAuth } from '../../../lib/useAuth';

export default function UserRate() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);

  const {
    data: { statistic },
  } = useStatisticQuery();

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <Loading />;
  }

  const { name, avatar } = userData;

  const currentData = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(statistic.optional.createDate).getTime());

  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>User Rate</title>
      </Head>
      <Box
        w="sm"
        mx="auto"
        bg={useColorModeValue('white', 'gray.800')}
        shadow="lg"
        rounded="lg"
        overflow="hidden">
        <Image w="full" h={56} fit="cover" objectPosition="center" src={avatar} alt="avatar" />

        <Flex alignItems="center" px={6} py={3} bg="gray.900">
          <Icon as={FcRating} h={6} w={6} color="white" />
          <Heading mx={3} color="white" fontWeight="bold" fontSize="lg">
            Рейтинг
          </Heading>
        </Flex>

        <Box py={4} px={6}>
          <Heading fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
            {name}
          </Heading>

          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdUpdate} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              {currentData}
            </Heading>
          </Flex>

          <Text py={2} color={useColorModeValue('gray.700', 'gray.400')}>
            Набрано баллов:
          </Text>

          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={FcRatings} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              за последний день: {statistic.optional.localRate}
            </Heading>
          </Flex>
          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={FcRatings} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              за все время: {statistic.globalRate}
            </Heading>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
