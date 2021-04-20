import { useQuery } from '@apollo/client';
import { Flex, Grid, GridItem, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

import { ACTIVE_BUTTON_COLOR, PASSIVE_BUTTON_COLOR } from '../../constants';
import { GET_LOCAL_STATISTIC } from '../../context/statistic/operations/queries/getLocalStatistic';
import { useAuth } from '../../lib/useAuth';
import { nonAuthUserStatistic } from '../../utils/processingUserLocalStatistic';
import Loading from '../Loading';

const getPercent = (words, rightAnswers) => {
  const percent = (rightAnswers / words) * 100;
  if (Number.isNaN(percent)) {
    return 'недостаточно данных';
  }
  return `${Math.floor(percent)} %`;
};

const StatItem = ({ title, count }) => {
  const borderColor = useColorModeValue(ACTIVE_BUTTON_COLOR.LIGHT, ACTIVE_BUTTON_COLOR.DARK);
  return (
    <GridItem h={200} border="1px" borderColor={borderColor} borderRadius="xl" p={2}>
      <Flex h="100%" direction="column" align="center" justify="space-around">
        <Heading textAlign="center" pt={2} as="h3" fontSize="xl">
          {title}
        </Heading>
        <Text fontSize="2xl">{count}</Text>
      </Flex>
    </GridItem>
  );
};

const ShortTermStatistics = ({ statistics }) => {
  const mainBorderColor = useColorModeValue(PASSIVE_BUTTON_COLOR.LIGHT, PASSIVE_BUTTON_COLOR.DARK);
  let stat = {};
  // eslint-disable-next-line no-prototype-builtins
  if (statistics.hasOwnProperty('optional')) {
    stat = statistics.optional;
  } else {
    stat = statistics;
  }

  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  const { audioCall, savanna, newGame, sprint, wordsCount, rightAnswers } = stat;

  if (wordsCount === 0) {
    return <Heading>Недостаточно данных для статистики</Heading>;
  }

  return (
    <Grid
      templateColumns={['repeat(1, 1fr)', 'repeat(2, 1fr)', 'repeat(4, 1fr)']}
      gap={4}
      border="2px"
      borderRadius="xl"
      borderColor={mainBorderColor}
      mb={10}
      p={4}>
      <StatItem count={wordsCount} title="Количество изученных слов" />
      <StatItem count={getPercent(wordsCount, rightAnswers)} title="Процент правильных ответов" />
      <StatItem
        count={savanna.series >= 0 ? savanna.series : savanna.seriesSavanna}
        title="Самая длинная серия по игре 'Саванна'"
      />
      <StatItem
        count={savanna.wordsCount >= 0 ? savanna.wordsCount : savanna.wordsCountSavanna}
        title="Количество изученных слов по игре 'Саванна'"
      />
      <StatItem
        count={
          savanna.wordsCount
            ? getPercent(savanna.wordsCount, savanna.rightAnswers)
            : getPercent(savanna.wordsCountSavanna, savanna.rightAnswersSavanna)
        }
        title="Процент правильных ответов по игре 'Саванна'"
      />
      <StatItem
        count={sprint.series >= 0 ? sprint.series : sprint.seriesSprint}
        title="Самая длинная серия по игре 'Спринт'"
      />
      <StatItem
        count={sprint.wordsCount >= 0 ? sprint.wordsCount : sprint.wordsCountSprint}
        title="Количество изученных слов по игре 'Спринт'"
      />
      <StatItem
        count={
          sprint.wordsCount
            ? getPercent(sprint.wordsCount, sprint.rightAnswers)
            : getPercent(sprint.wordsCountSprint, sprint.rightAnswersSprint)
        }
        title="Процент правильных ответов по игре 'Спринт'"
      />
      <StatItem
        count={audioCall.series >= 0 ? audioCall.series : audioCall.seriesCall}
        title="Самая длинная серия по игре 'Аудиовызов'"
      />
      <StatItem
        count={audioCall.wordsCount >= 0 ? audioCall.wordsCount : audioCall.wordsCountCall}
        title="Количество изученных слов по игре 'Аудиовызов'"
      />
      <StatItem
        count={
          audioCall.wordsCount
            ? getPercent(audioCall.wordsCount, audioCall.rightAnswers)
            : getPercent(audioCall.wordsCountCall, audioCall.rightAnswersCall)
        }
        title="Процент правильных ответов по игре 'Аудиовызов'"
      />
      <StatItem
        count={newGame.series >= 0 ? newGame.series : newGame.seriesNew}
        title="Самая длинная серия по игре 'Написание'"
      />
      <StatItem
        count={newGame.wordsCount >= 0 ? newGame.wordsCount : newGame.wordsCountNew}
        title="Количество изученных слов по игре 'Написание'"
      />
      <StatItem
        count={
          newGame.wordsCount
            ? getPercent(newGame.wordsCount, newGame.rightAnswers)
            : getPercent(newGame.wordsCountNew, newGame.rightAnswersNew)
        }
        title="Процент правильных ответов по игре 'Написание'"
      />
    </Grid>
  );
};

export default ShortTermStatistics;
