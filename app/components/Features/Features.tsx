import { Box, Flex, Grid, Heading, Text } from '@chakra-ui/layout';
import { useColorModeValue } from '@chakra-ui/react';
import React from 'react';
import { BsAlarm, BsController, BsExclamationTriangleFill, BsFillCursorFill } from 'react-icons/bs';

import { ACTIVE } from '../../constants';

const FEATURE_ICON_SIZE = 50;

const FeatureCard = ({ description, children }) => {
  const borderColor = useColorModeValue(ACTIVE.LIGHT, ACTIVE.DARK);

  return (
    <Flex
      align="center"
      justify="center"
      direction="column"
      minH={200}
      p={2}
      border="1px"
      borderColor={borderColor}
      _hover={{ bg: borderColor }}
      borderRadius="xl">
      {children}
      <Text textAlign="center" fontSize={25}>
        {description}
      </Text>
    </Flex>
  );
};

const Features = () => {
  return (
    <Box p={[5, 10]}>
      <Heading as="h2" textAlign="center" mb={5}>
        Начинаем изучать прямо сейчас!
      </Heading>
      <Grid templateColumns="repeat(3, 1fr)" gap={10}>
        <FeatureCard description="Покажем куда расти">
          <BsFillCursorFill fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Всего 15 минут в день">
          <BsAlarm fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Обучение в игровой форме, скучно не будет!">
          <BsController fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Осторожно! Вызывает привыкание :)">
          <BsExclamationTriangleFill fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Покажем куда расти">
          <BsFillCursorFill fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
        <FeatureCard description="Покажем куда расти">
          <BsFillCursorFill fontSize={FEATURE_ICON_SIZE} />
        </FeatureCard>
      </Grid>
    </Box>
  );
};

export default Features;
