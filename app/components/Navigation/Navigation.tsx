import { Container } from '@chakra-ui/layout';
import {
  Flex,
  HStack,
  IconButton,
  InputGroup,
  InputLeftElement,
  Spacer,
  Tab,
  TabList,
  Tabs,
  Text,
  useDisclosure,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { RiSettings4Line } from 'react-icons/ri';

import TextbookSettings from '../TextbookSettings/TextbookSettings';

export default function Navigation({ group, page }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [mainTextbook, setMainTextBook] = useState(null);
  const { pathname } = router;

  useEffect(() => {
    if (pathname.match('textbook')) {
      return setMainTextBook(true);
    }

    setMainTextBook(false);
  }, [pathname]);

  return (
    <>
      <TextbookSettings isOpen={isOpen} onClose={onClose} />
      <Flex alignItems="center" justifyContent="space-between" borderWidth={0}>
        {mainTextbook && (
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
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/studied/0'}>
                  <Text color="tomato" fontWeight="bold">
                    Словарь
                  </Text>
                </NextLink>
              </Tab>
            </TabList>
          </Tabs>
        )}
        {!mainTextbook && (
          <Tabs defaultIndex={0} borderBottomColor="transparent">
            <TabList>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/studied/0'}>
                  <Text fontWeight="bold">Изучаемые</Text>
                </NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/complex/0'}>
                  <Text fontWeight="bold">Сложные</Text>
                </NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/deleted/0'}>
                  <Text fontWeight="bold">Удалённые</Text>
                </NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/0/0'}>
                  <Text color="tomato" fontWeight="bold">
                    Учебник
                  </Text>
                </NextLink>
              </Tab>
            </TabList>
          </Tabs>
        )}
        <Spacer />
        <HStack spacing={3} alignItems="center">
          <Tabs defaultIndex={5} borderBottomColor="transparent">
            <TabList>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={`/mini-games/savanna/${group}/${page}`}>Саванна</NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/mini-games/sprint'}>Спринт</NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/mini-games/audiocall'}>Аудиовызов</NextLink>
              </Tab>
              <Tab py={4} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/mini-games/new-game'}>Игра</NextLink>
              </Tab>
            </TabList>
          </Tabs>
          <IconButton aria-label="Search database" icon={<RiSettings4Line />} onClick={onOpen} />
        </HStack>
      </Flex>
    </>
  );
}
