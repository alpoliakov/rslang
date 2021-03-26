
import React from 'react';
import { Flex, Grid, GridItem, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { ACTIVE_BUTTON_COLOR, PASSIVE_BUTTON_COLOR } from '../../constants';

const StatItem = ({ title, count }) => {
  const borderColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);
  return (
    <GridItem h={200} border="1px" borderColor={borderColor} borderRadius="xl" p={2}>
      <Flex h="100%" direction="column" align="center" justify="space-around">
        <Heading textAlign="center" pt={2} as="h3" fontSize="xl">
          {title}
        </Heading>
        <Text fontSize="2xl">{count} %</Text>
      </Flex>
    </GridItem>
  );
};

const ShortTermStatistics = () => {
  const mainBorderColor = useColorModeValue(PASSIVE_BUTTON_COLOR.LIGHT, PASSIVE_BUTTON_COLOR.DARK);
  const learnedTodayWords = 12412;
  const correctAnswers = 2121;
  const longSeriesGame1 = 11;
  const correctAnswersPercent = Math.round((correctAnswers * 100) / learnedTodayWords);

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={4}
      border="2px"
      borderRadius="xl"
      borderColor={mainBorderColor}
      mb={10}
      p={4}>
      <StatItem count={learnedTodayWords} title="Количество изученных слов сегодня" />
      <StatItem count={correctAnswersPercent} title="Процент правильных ответов сегодня" />
      <StatItem count={longSeriesGame1} title="Самая длинная серия по игре 1" />
      <StatItem count={longSeriesGame1} title="Самая длинная серия по игре 1" />
      <StatItem count={longSeriesGame1} title="Самая длинная серия по игре 1" />
      <StatItem count={longSeriesGame1} title="Самая длинная серия по игре 1" />
      <StatItem count={learnedTodayWords} title="Количество изученных слов за все время" />
      <StatItem count={correctAnswersPercent} title="Процент правильных ответов за все время" />
    </Grid>
  );
};

export default ShortTermStatistics;
