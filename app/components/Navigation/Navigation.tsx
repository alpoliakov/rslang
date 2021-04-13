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

import { useAppContext } from '../../context/ContextApp';
import { useAuth } from '../../lib/useAuth';
import TextbookSettings from '../TextbookSettings/TextbookSettings';

export default function Navigation({ group, page }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const router = useRouter();
  const [mainTextbook, setMainTextBook] = useState(null);
  const [chapter, setChapter] = useState(null);
  const { pathname } = router;

  const { showLink, setPreviousPageName } = useAppContext();

  const { user } = useAuth();

  const setCurrentChapter = () => {
    if (pathname.match('complex')) {
      return 1;
    }

    if (pathname.match('deleted')) {
      return 2;
    }

    return 0;
  };

  useEffect(() => {
    if (pathname.match('textbook')) {
      return setMainTextBook(true);
    }

    if (pathname.match('complex')) {
      setPreviousPageName('complex');
    } else if (pathname.match('deleted')) {
      setPreviousPageName('deleted');
    } else if (pathname.match('studied')) {
      setPreviousPageName('studied');
    } else {
      setPreviousPageName('');
    }

    setMainTextBook(false);
  }, [pathname]);

  return (
    <>
      <TextbookSettings isOpen={isOpen} onClose={onClose} />
      <Flex
        alignItems="center"
        direction={{ base: 'column', lg: 'row' }}
        justifyContent="space-between"
        borderWidth={0}>
        {mainTextbook && (
          <Tabs defaultIndex={group} borderBottomColor="transparent">
            <TabList flexWrap="wrap">
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/0/0'}>Group 1</NextLink>
              </Tab>
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/1/0'}>Group 2</NextLink>
              </Tab>
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/2/0'}>Group 3</NextLink>
              </Tab>
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/3/0'}>Group 4</NextLink>
              </Tab>
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/4/0'}>Group 5</NextLink>
              </Tab>
              <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/textbook/5/0'}>Group 6</NextLink>
              </Tab>
              {user && (
                <Tab py={4} px={{ base: 1, lg: 2 }} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={'/vocabulary/studied/0'}>
                    <Text color="tomato" fontWeight="bold">
                      Словарь
                    </Text>
                  </NextLink>
                </Tab>
              )}
            </TabList>
          </Tabs>
        )}
        {!mainTextbook && (
          <Tabs defaultIndex={setCurrentChapter()} borderBottomColor="transparent">
            <TabList>
              <Tab py={4} px={{ base: 2, lg: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/studied/0'}>
                  <Text fontWeight="bold">Изучаемые</Text>
                </NextLink>
              </Tab>
              <Tab py={4} px={{ base: 2, lg: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/complex/0'}>
                  <Text fontWeight="bold">Сложные</Text>
                </NextLink>
              </Tab>
              <Tab py={4} px={{ base: 2, lg: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                <NextLink href={'/vocabulary/deleted/0'}>
                  <Text fontWeight="bold">Удалённые</Text>
                </NextLink>
              </Tab>
              <Tab py={4} px={{ base: 2, lg: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
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
          {showLink && (
            <Tabs defaultIndex={5} borderBottomColor="transparent">
              <TabList flexWrap="wrap">
                <Tab py={4} px={{ base: 2, xl: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={`/mini-games/savanna/${group}/${page}`}>Саванна</NextLink>
                </Tab>
                <Tab py={4} px={{ base: 2, xl: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={`/mini-games/sprint/${group}/${page}`}>Спринт</NextLink>
                </Tab>
                <Tab py={4} px={{ base: 2, xl: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={`/mini-games/audiocall/${group}/${page}`}>Аудиовызов</NextLink>
                </Tab>
                <Tab py={4} px={{ base: 2, xl: 4 }} m={0} _focus={{ boxShadow: 'none' }}>
                  <NextLink href={`/mini-games/new-game/${group}/${page}`}>Написание</NextLink>
                </Tab>
              </TabList>
            </Tabs>
          )}
          <IconButton aria-label="Search database" icon={<RiSettings4Line />} onClick={onOpen} />
        </HStack>
      </Flex>
    </>
  );
}
