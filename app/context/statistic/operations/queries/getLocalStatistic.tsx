import { gql } from '@apollo/client';

export const GET_LOCAL_STATISTIC = gql`
  query GetLocalStatistics {
    localStatistics @client {
      wordsCount
      rightAnswers
      localRate
      savanna
      audioCall
      sprint
      newGame
    }
  }
`;
