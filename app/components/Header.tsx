import { MoonIcon, SunIcon } from '@chakra-ui/icons';
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
import { motion } from 'framer-motion';
import NextLink from 'next/link';
import React, { useState } from 'react';
import { BiChevronDown, BiMenu } from 'react-icons/bi';
import { IoInvertModeOutline, IoInvertModeSharp } from 'react-icons/io5';
import { RiLoginCircleLine, RiMoonLine } from 'react-icons/ri';

import { MenuTitle } from '../constants';
import { useAuth } from '../lib/useAuth';

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
  const [isOpen, setIsOpen] = useState(false);

  const { user } = useAuth();

  const MotionFlex = motion(Flex);
  const MotionBox = motion(Box);

  return (
    <Box boxShadow="md" bg={bg} position="sticky" top="0" p={1} zIndex="10" w="100%">
      <Container maxW="container.xl" w="100%">
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
                  as={SunIcon}
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
              <WrapItem>
                <Avatar size="md" name="Prospero" src="/images/hacker.png" />{' '}
              </WrapItem>
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
              <MenuList>
                <Link href="statistics" as={NextLink}>
                  <MenuItem>{MenuTitle.STATISTICS.title}</MenuItem>
                </Link>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Container>
    </Box>
  );
}
