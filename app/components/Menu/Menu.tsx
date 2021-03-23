import { Center, Flex, Link, Square, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiStats } from 'react-icons/bi';
import { FaBook, FaGamepad } from 'react-icons/fa';

import { MenuTitle } from '../../constants';

const Menu = () => {
  const menuItemColor = useColorModeValue('#FF0088', '#AF004B');
  const menuItemHoverColor = useColorModeValue('#59BAB7', '#006B69');

  const MenuItem = ({ menuTitle, children }) => (
    <Link>
      <Square
        size={150}
        bg={menuItemColor}
        _hover={{ bg: menuItemHoverColor }}
        style={{ transition: 'all 200ms linear' }}
        borderRadius="xl">
        <Text fontSize={20} transform={{ rotate: '45deg' }}>
          <Center>{children}</Center>
          {menuTitle}
        </Text>
      </Square>
    </Link>
  );

  return (
    <Flex p={5} justify="space-around" templateColumns="repeat(4, 1fr)">
      <MenuItem menuTitle={MenuTitle.DICTIONARY}>
        <FaBook fontSize={30} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.GAME_1}>
        <FaGamepad fontSize={30} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.GAME_2}>
        <FaGamepad fontSize={30} />
      </MenuItem>
      <MenuItem menuTitle={MenuTitle.STATISTICS}>
        <BiStats fontSize={30} />
      </MenuItem>
    </Flex>
  );
};

export default Menu;
