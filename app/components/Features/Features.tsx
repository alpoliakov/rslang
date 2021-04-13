import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BiDollar, BiNavigation } from 'react-icons/bi';
import { BsController, BsExclamationTriangle, BsExclamationTriangleFill } from 'react-icons/bs';

import { ACTIVE_BUTTON_COLOR } from '../../constants';

const FEATURE_ICON_SIZE = 30;

const FeatureCard = ({ description, children }) => {
  const borderColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);

  return (
    <Flex
      align="center"
      justify="space-around"
      direction="column"
      minH={[100, 120, 150]}
      p={2}
      border="1px"
      borderColor={borderColor}
      _hover={{ bg: borderColor }}
      borderRadius="xl">
      {children}
      <Text textAlign="center" fontSize={[13, 15, 18]}>
        {description}
      </Text>
    </Flex>
  );
};

const Features = () => {
  return (
    <Box p={[5, 10]}>
      <Grid templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(3, 1fr)']} gap={10}>
        <FeatureCard description="Покажем куда расти">
          <BiNavigation fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Всего 15 минут в день">
          <BsExclamationTriangle fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Обучение в игровой форме, скучно не будет!">
          <BsController fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Осторожно! Вызывает привыкание :)">
          <BsExclamationTriangleFill fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Геймификация доказала свою эффективность для всех возрастов.">
          <BsController fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Наша миссия - сделать изучение языков доступным для всех.">
          <BiDollar fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
      </Grid>
    </Box>
  );
};

export default Features;
