import { CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import React from 'react';

export const AnswerList = ({ learnedWords, correctAnswersArr }) => {
  const totalFalse = correctAnswersArr.filter((answer) => answer === false).length;
  const totalTrue = correctAnswersArr.filter((answer) => answer === true).length;
  const showIcons = (arr) =>
    arr.map((answer, indx) =>
      answer ? (
        <CheckCircleIcon key={indx} color="green" />
      ) : (
        <NotAllowedIcon key={indx} color="red" />
      ),
    );
  const showWords = (arr) => arr.map((answer, indx) => <span key={indx}>{answer.word}</span>);

  return (
    <div className="answerlist">
      <div className="total-results">
        Всего выучено: {totalTrue} &nbsp;&nbsp; Всего ошибок: {totalFalse}
      </div>
      <div className="answers-container">
        <div className="answers-icons-column">{showIcons(correctAnswersArr)}</div>
        <div className="answers-words-column">{showWords(learnedWords)}</div>
      </div>
    </div>
  );
};
