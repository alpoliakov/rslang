import { Flex, Grid, Link, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiStats } from 'react-icons/bi';
import { FaBook, FaGamepad } from 'react-icons/fa';

import { ACTIVE_BUTTON_COLOR, MenuTitle, PASSIVE_BUTTON_COLOR } from '../../constants';

const MENU_ICON_SIZE = 30;

const Menu = () => {
  const menuItemColor = useColorModeValue(PASSIVE_BUTTON_COLOR.LIGHT, PASSIVE_BUTTON_COLOR.DARK);
  const menuItemHoverColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);

  const MenuItem = ({ menuTitle, children }) => (
    <Link>
      <Flex
        h={70}
        p={5}
        justify="space-around"
        align="center"
        direction="row"
        bg={menuItemColor}
        _hover={{ bg: menuItemHoverColor }}
        style={{ transition: 'all 200ms linear' }}
        borderRadius="xl">
        {children}
        <Text fontSize="xl">{menuTitle}</Text>
      </Flex>
    </Link>
  );

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={6}
      mx="auto">
      <MenuItem menuTitle={MenuTitle.DICTIONARY}>
        <FaBook fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.GAME_1}>
        <FaGamepad fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.GAME_2}>
        <FaGamepad fontSize={MENU_ICON_SIZE} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.STATISTICS}>
        <BiStats fontSize={MENU_ICON_SIZE} />
      </MenuItem>
    </Grid>
  );
};

export default Menu;
