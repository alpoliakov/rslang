import { Container } from '@chakra-ui/layout';
import {
  Flex,
  HStack,
  IconButton,
  Input,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tab,
  TabList,
  Tabs,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { RiSettings4Line } from 'react-icons/ri';

export default function Navigation({ group, page }) {
  return (
    <Flex alignItems="center" justifyContent="space-between" borderWidth={0}>
      <Tabs defaultIndex={group} borderBottomColor="transparent">
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
      <Spacer />
      <HStack spacing={3} alignItems="center">
        <Tabs defaultIndex={5} borderBottomColor="transparent">
          <TabList>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              <NextLink href={`/mini-games/savanna?textbook=true`}>Саванна</NextLink>
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              <NextLink href={`/mini-games/sprint?textbook=true`}>Спринт</NextLink>
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              <NextLink href={`/mini-games/audiocall?textbook=true`}>Аудиовызов</NextLink>
            </Tab>
            <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
              <NextLink href={`/mini-games/new-game?textbook=true`}>Написание</NextLink>
            </Tab>
          </TabList>
        </Tabs>
        <IconButton aria-label="Search database" icon={<RiSettings4Line />} />
      </HStack>
    </Flex>
  );
}
