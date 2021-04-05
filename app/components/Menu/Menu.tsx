import { Flex, Grid, Link, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import NextLink from 'next/link';
import React from 'react';
import { BiRun, BiStats } from 'react-icons/bi';
import { BsBook } from 'react-icons/bs';
import { FaGamepad } from 'react-icons/fa';
import { GiPalmTree } from 'react-icons/gi';
import { GiSoundWaves } from 'react-icons/gi';
import { RiBook3Line } from 'react-icons/ri';

import { ACTIVE_BUTTON_COLOR, MenuTitle, PASSIVE_BUTTON_COLOR } from '../../constants';
import { useAuth } from '../../lib/useAuth';

const MENU_ICON_SIZE = 30;

const Menu = () => {
  const menuItemColor = useColorModeValue(PASSIVE_BUTTON_COLOR.LIGHT, PASSIVE_BUTTON_COLOR.DARK);
  const menuItemHoverColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);

  const { user } = useAuth();

  const MenuItem = ({ menuItem, children }) => {
    const { title, url } = menuItem;
    return (
      <Link as={NextLink} href={url}>
        <a>
          <Flex
            h={70}
            p={5}
            justify="center"
            align="center"
            gap="20px"
            direction="row"
            bg={menuItemColor}
            _hover={{ bg: menuItemHoverColor }}
            style={{ transition: 'all 200ms linear' }}
            borderRadius="xl">
            {children}
            <Text ml={5} fontSize="xl">
              {title}
            </Text>
          </Flex>
        </a>
      </Link>
    );
  };

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={6}
      mx="auto">
      <MenuItem menuItem={MenuTitle.TEXT_BOOK}>
        <BsBook fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      {user && (
        <MenuItem menuItem={MenuTitle.DICTIONARY}>
          <RiBook3Line fontSize={MENU_ICON_SIZE} />
        </MenuItem>
      )}
      <MenuItem menuItem={MenuTitle.STATISTICS}>
        <BiStats fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuItem={MenuTitle.GAME_SAVANNA}>
        <GiPalmTree fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuItem={MenuTitle.GAME_SPRINT}>
        <BiRun fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuItem={MenuTitle.GAME_AUDIO_CALL}>
        <GiSoundWaves fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuItem={MenuTitle.GAME_NEW_GAME}>
        <FaGamepad fontSize={MENU_ICON_SIZE} />
      </MenuItem>
    </Grid>
  );
};

export default Menu;
