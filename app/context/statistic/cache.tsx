import { InMemoryCache, makeVar, ReactiveVar } from '@apollo/client';

import { LocalStatistics } from './models/LocalStatistics';

export const cache = new InMemoryCache({
  typePolicies: {
    Query: {
      fields: {
        localStatistics: {
          read() {
            return statisticVar();
          },
        },
      },
    },
  },
});

const statisticInitialValue: LocalStatistics = {
  wordsCount: 0,
  rightAnswers: 0,
  localRate: 0,
  date: new Date(),
  savanna: {
    wordsCount: 0,
    rightAnswers: 0,
    series: 0,
  },
  audioCall: {
    wordsCount: 0,
    rightAnswers: 0,
    series: 0,
  },
  sprint: {
    wordsCount: 0,
    rightAnswers: 0,
    series: 0,
  },
  newGame: {
    wordsCount: 0,
    rightAnswers: 0,
    series: 0,
  },
};

export const statisticVar = makeVar(statisticInitialValue);
