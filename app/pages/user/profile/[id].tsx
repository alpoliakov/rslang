import { Box, Flex, Heading, Icon, Image, Text, useColorModeValue } from '@chakra-ui/react';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { MdEmail, MdHeadset, MdLocationOn, MdSystemUpdateAlt } from 'react-icons/md';

import Loading from '../../../components/Loading';
import { useAuth } from '../../../lib/useAuth';

export default function Profile() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(user);

  useEffect(() => {
    if (user) {
      setUserData(user);
    }
  }, [user]);

  if (!userData) {
    return <Loading />;
  }

  const { name, avatar, email, registrationDate } = userData;

  const registerData = new Intl.DateTimeFormat('ru-RU', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(registrationDate).getTime());

  return (
    <Flex alignItems="center" justifyContent="center" width="100%" height=" 100%">
      <Head>
        <title>User Profile</title>
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
          <Icon as={MdHeadset} h={6} w={6} color="white" />
          <Heading mx={3} color="white" fontWeight="bold" fontSize="lg">
            Фокусировка
          </Heading>
        </Flex>

        <Box py={4} px={6}>
          <Heading fontSize="xl" fontWeight="bold" color={useColorModeValue('gray.800', 'white')}>
            {name}
          </Heading>

          <Text py={2} color={useColorModeValue('gray.700', 'gray.400')}>
            Our Liberties We Prize and Our Rights We Will Maintain.
          </Text>

          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdSystemUpdateAlt} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              {registerData}
            </Heading>
          </Flex>

          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdLocationOn} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              California
            </Heading>
          </Flex>
          <Flex alignItems="center" mt={4} color={useColorModeValue('gray.700', 'gray.200')}>
            <Icon as={MdEmail} h={6} w={6} mr={2} />

            <Heading px={2} fontSize="sm">
              {email}
            </Heading>
          </Flex>
        </Box>
      </Box>
    </Flex>
  );
}
