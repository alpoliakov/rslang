import { Flex, Link, Square, Text } from '@chakra-ui/layout';
import React from 'react';

import { MENU_ITEMS } from '../../constants';

const MenuItem = ({ menuItem }) => (
  <Link>
    <Square size={150} bg="#FF0088" _hover={{ bg: '#0055FF' }} borderRadius="xl">
      <Text fontSize={20} transform={{ rotate: '45deg' }}>
        {menuItem}
      </Text>
    </Square>
  </Link>
);

const MenuItems = () => {
  return MENU_ITEMS.map((item, idx) => {
    return <MenuItem menuItem={item} key={idx} />;
  });
};

const Menu = () => {
  return (
    <Flex p={5} justify="space-around" templateColumns="repeat(4, 1fr)">
      {MenuItems()}
    </Flex>
  );
};

export default Menu;
