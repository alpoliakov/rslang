import { gql } from '@apollo/client';

export const GET_LOCAL_STATISTIC = gql`
  query GetLocalStatistics @client {
    localStatistics {
      wordsCount
      rightAnswers
      words
      savanna
      audioCall
      sprint
      newGame
    }
  }
`;
