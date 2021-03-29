import { Container } from '@chakra-ui/layout';
import {
  Avatar,
  Box,
  Button,
  Flex,
  Heading,
  Icon,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Spacer,
  useColorMode,
  useColorModeValue,
  WrapItem,
} from '@chakra-ui/react';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import { IoInvertModeOutline, IoInvertModeSharp } from 'react-icons/io5';
import {
  RiListSettingsLine,
  RiLoginCircleLine,
  RiLogoutCircleLine,
  RiMoonLine,
  RiProfileLine,
  RiSettings4Line,
  RiSunLine,
} from 'react-icons/ri';

import { MenuTitle } from '../constants';
import { useAuth } from '../lib/useAuth';
import Navigation from './Navigation/Navigation';

const transition = {
  duration: 1,
  ease: [0.43, 0.13, 0.23, 0.96],
};

const backVariants = {
  exit: { x: -100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
};

const backVariantsRight = {
  exit: { x: 100, opacity: 0, transition },
  enter: { x: 0, opacity: 1, transition: { delay: 1, ...transition } },
};

export default function Header() {
  const { colorMode, toggleColorMode } = useColorMode();
  const color = useColorModeValue('gray.400', 'red.500');
  const bg = useColorModeValue('gray.50', '#223c50');
  const hoverColor = useColorModeValue('#223c50', 'red.600');
  const [showNav, setShowNav] = useState(false);
  const [group, setGroup] = useState(null);

  const { user, signOut } = useAuth();

  const router = useRouter();
  const { pathname } = router;

  useEffect(() => {
    if (pathname.match('textbook')) {
      const { group } = router.query;
      setGroup(+group);
      return setShowNav(true);
    }
    setShowNav(false);
  }, [pathname]);

  return (
    <Box bg={bg} position="sticky" top="0" p={1} height="full" zIndex="10" width="full">
      <Container maxW="95%" w="100%">
        <Flex alignItems="center" justifyContent="space-between">
          <Link p="1">
            <NextLink href="/">
              <Heading size="md" p={1}>
                RS Lang
              </Heading>
            </NextLink>
          </Link>
          <Spacer />
          <Flex alignItems="center" p="1">
            <Button w={0} h={0} onClick={toggleColorMode} mr="5">
              {colorMode === 'light' ? (
                <Icon
                  as={RiMoonLine}
                  w={7}
                  h={7}
                  color="gray.400"
                  className="shadow__item hover__item"
                  _hover={{
                    color: '#223c50',
                  }}
                />
              ) : (
                <Icon
                  as={RiSunLine}
                  w={7}
                  h={7}
                  color={color}
                  _hover={{
                    color: 'red.600',
                  }}
                />
              )}
            </Button>
            {user && (
              <Menu>
                <MenuButton>
                  <Flex alignItems="center">
                    <Avatar size="md" name="avatar" src={user.avatar} mr="10px" />
                    <Heading size="md">Hi, {user.name}</Heading>
                  </Flex>
                </MenuButton>
                <MenuList>
                  <MenuItem onClick={() => router.push(`/user/profile/${user._id}`)}>
                    <Icon
                      as={RiProfileLine}
                      w={6}
                      h={6}
                      mr={5}
                      color={color}
                      _hover={{
                        color: colorMode === 'light' ? '#223c50' : 'red.600',
                      }}
                      className="shadow__item hover__item"
                    />{' '}
                    Профиль
                  </MenuItem>
                  <MenuItem onClick={() => router.push(`/user/statistics/${user._id}`)}>
                    <Icon
                      as={RiListSettingsLine}
                      w={6}
                      h={6}
                      mr={5}
                      color={color}
                      _hover={{
                        color: colorMode === 'light' ? '#223c50' : 'red.600',
                      }}
                      className="shadow__item hover__item"
                    />{' '}
                    Статистика
                  </MenuItem>
                  <MenuItem onClick={() => router.push(`/user/settings/${user._id}`)}>
                    <Icon
                      as={RiSettings4Line}
                      w={6}
                      h={6}
                      mr={5}
                      color={color}
                      _hover={{
                        color: colorMode === 'light' ? '#223c50' : 'red.600',
                      }}
                      className="shadow__item hover__item"
                    />{' '}
                    Настройки
                  </MenuItem>
                  <MenuItem onClick={() => signOut()}>
                    <Icon
                      as={RiLogoutCircleLine}
                      w={6}
                      h={6}
                      mr={5}
                      color={color}
                      _hover={{
                        color: colorMode === 'light' ? '#223c50' : 'red.600',
                      }}
                      className="shadow__item hover__item"
                    />{' '}
                    Выйти
                  </MenuItem>
                </MenuList>
              </Menu>
            )}
            {!user && (
              <WrapItem>
                <NextLink href={'/auth/signin'}>
                  <Button mr="5" w={0} h={0}>
                    <Icon
                      as={RiLoginCircleLine}
                      w={7}
                      h={7}
                      color={color}
                      _hover={{
                        color: colorMode === 'light' ? '#223c50' : 'red.600',
                      }}
                      className="shadow__item hover__item"
                    />
                  </Button>
                </NextLink>
              </WrapItem>
            )}
            <Menu>
              <MenuButton as={Button} rightIcon={<BiChevronDown />}>
                <Icon
                  as={BiMenu}
                  w={7}
                  h={7}
                  color={color}
                  aria-label="Кнопка меню"
                  _hover={{
                    color: colorMode === 'light' ? '#223c50' : 'red.600',
                  }}
                />
              </MenuButton>
              {/*<MenuList>*/}
              {/*  {Object.values(MenuTitle).map((title, index) => {*/}
              {/*    return <MenuItem key={index + 1}>{title}</MenuItem>;*/}
              {/*  })}*/}
              {/*</MenuList>*/}
              <MenuList>
                <Link href="/statistics" as={NextLink}>
                  <MenuItem>{MenuTitle.STATISTICS.title}</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {showNav && <Navigation group={group} />}
      </Container>
    </Box>
  );
}
