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
import { useAppContext } from '../context/ContextApp';
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
  const [page, setPage] = useState(null);
  const [showColorModeButton, setShowColorModeButton] = useState(true);

  const { user, signOut } = useAuth();
  const { vocabularyPage } = useAppContext();

  const router = useRouter();
  const { pathname, query } = router;

  useEffect(() => {
    const { group, page } = query;
    setGroup(+group);

    if (!isNaN(+page)) {
      setPage(+page);
    } else {
      setPage(vocabularyPage);
    }

    if (pathname.match('textbook') || pathname.match('vocabulary')) {
      return setShowNav(true);
    }

    setShowNav(false);
  }, [pathname, query, vocabularyPage]);

  useEffect(() => {
    if (pathname.match('mini-games')) {
      return setShowColorModeButton(false);
    }
    setShowColorModeButton(true);
  }, [pathname]);

  return (
    <Box bg={bg} position="sticky" top="0" p={1} height="full" zIndex="10" width="full">
      <Container maxW="container.xl" px={0}>
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
            {showColorModeButton && (
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
            )}
            {user && (
              <Menu>
                <MenuButton>
                  <Flex alignItems="center" mr={7}>
                    <Avatar size="md" name="avatar" src={user.avatar} mr="10px" />
                    <Heading
                      size="sm"
                      style={{
                        maxWidth: '100px',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}>
                      Hi, {user.name}
                    </Heading>
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
                    ??????????????
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
                    ????????????????????
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
                    ??????????????????
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
                    ??????????
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
                  aria-label="???????????? ????????"
                  _hover={{
                    color: colorMode === 'light' ? '#223c50' : 'red.600',
                  }}
                />
              </MenuButton>
              <MenuList>
                {Object.values(MenuTitle).map(({ title, url }) => {
                  if (user) {
                    return (
                      <Link href={url} key={title} as={NextLink}>
                        <MenuItem>{title}</MenuItem>
                      </Link>
                    );
                  }
                  if (!user && title !== '??????????????') {
                    return (
                      <Link href={url} key={title} as={NextLink}>
                        <MenuItem>{title}</MenuItem>
                      </Link>
                    );
                  }
                })}
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
        {showNav && <Navigation group={group} page={page} />}
      </Container>
    </Box>
  );
}
