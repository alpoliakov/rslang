import { Heading, Text } from '@chakra-ui/layout';
import React from 'react';

const Promo = () => {
  return (
    <>
      <Heading as="h1" textAlign={'center'} mb={5}>
        Начните изучать английский язык с помощью RS Lang уже сегодня!
      </Heading>
      <Text textAlign={'center'} fontSize={20}>
        Нескучное изучение языка с помощью игр в любое удобное для вас время
      </Text>
    </>
  );
};

export default Promo;
