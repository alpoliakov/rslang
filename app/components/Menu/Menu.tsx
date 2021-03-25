import { Center, Flex, Link, Square, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiStats } from 'react-icons/bi';
import { FaBook, FaGamepad } from 'react-icons/fa';

import { ACTIVE, MenuTitle, PASSIVE } from '../../constants';

const MENU_ICON_SIZE = 30;

const Menu = () => {
  const menuItemColor = useColorModeValue(PASSIVE.LIGHT, PASSIVE.DARK);
  const menuItemHoverColor = useColorModeValue(ACTIVE.LIGHT, ACTIVE.DARK);

  const MenuItem = ({ menuTitle, children }) => (
    <Link>
      <Flex
        h={70}
        minW={200}
        p={5}
        justify="space-around"
        align="center"
        direction="row"
        bg={menuItemColor}
        _hover={{ bg: menuItemHoverColor }}
        style={{ transition: 'all 200ms linear' }}
        borderRadius="xl">
        {children}
        <Text fontSize="xl" transform={{ rotate: '45deg' }}>
          {menuTitle}
        </Text>
      </Flex>
    </Link>
  );

  return (
    <Flex p={5} wrap="wrap" justify="space-around">
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
    </Flex>
  );
};

export default Menu;
