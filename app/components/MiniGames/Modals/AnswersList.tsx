import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import React from 'react';
import { useAuth } from '../../../lib/useAuth';

export const AnswerList = ({ learnedWords, answersArr }) => {
  const { user } = useAuth();

  const totalFalse = answersArr.filter((answer) => answer === false).length;
  const totalTrue = answersArr.filter((answer) => answer === true).length;
  const showIcons = (arr) =>
    arr.map((answer, indx) =>
      answer ? (
        <CheckCircleIcon key={indx} color="green" />
      ) : (
        <NotAllowedIcon key={indx} color="red" />
      ),
    );
  const showWords = (arr) =>
    arr.map((answer, indx) => <span key={indx}>{user ? answer.word.word : answer.word}</span>);

  return (
    <div className="answerlist">
      <div className="total-results">
        Всего выучено: {totalTrue} &nbsp;&nbsp; Всего ошибок: {totalFalse}
      </div>
      <div className="answers-container">
        <div className="answers-icons-column">{showIcons(answersArr)}</div>
        <div className="answers-words-column">{showWords(learnedWords)}</div>
      </div>
    </div>
  );
};
