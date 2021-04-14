import { editWord, fetchCurrentWord } from 'components/MiniGames/helpers/fetchWords';
import { checkAnswerSavanna, getNextWordSavanna } from 'components/MiniGames/helpers/utils';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useSound from 'use-sound';

import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';

const Savanna = ({
  counter,
  setCounter,
  isMusicOn,
  words,
  setLives,
  setEndGame,
  endGame,
  user,
  isPaused,
  answersArr,
  setAnswersArr,
  learnedWords,
  setLearnedWord,
  additionalWords,
}) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [combination, setCombination] = useState(
    getNextWordSavanna(words, learnedWords, additionalWords),
  );

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  useEffect(() => {
    const timeOutAnswer = setTimeout(() => handleAnswer(''), 5000);
    if (isPaused) {
      clearTimeout(timeOutAnswer);
    }
    return () => clearTimeout(timeOutAnswer);
  }, [learnedWords, isPaused]);

  const handleAnswer = async (answer) => {
    const isUserAnswerCorrect = checkAnswerSavanna(combination.mainWord, answer);

    if (!isUserAnswerCorrect) {
      if (user) {
        const word = await fetchCurrentWord(combination.mainWord._id);
        const { optional, complexity, deleted } = word;
        const { repeat, rightAnswers, wrongAnswers } = optional;
        const args = {
          id: combination.mainWord._id,
          repeat: repeat + 1,
          rightAnswers: rightAnswers,
          wrongAnswers: wrongAnswers + 1,
          studied: true,
        };
        await editWord(args, complexity, deleted, editAggregatedWord);
      }

      setLives((lives) => [false, ...lives.slice(0, -1)]);
      isMusicOn && incorrect();
    } else {
      if (user) {
        const word = await fetchCurrentWord(combination.mainWord._id);
        const { optional, complexity, deleted } = word;
        const { repeat, rightAnswers, wrongAnswers } = optional;

        const args = {
          id: combination.mainWord._id,
          repeat: repeat + 1,
          rightAnswers: rightAnswers + 1,
          wrongAnswers: wrongAnswers,
          studied: true,
        };
        editWord(args, complexity, deleted, editAggregatedWord);
      }

      setCounter(counter + 10);
      isMusicOn && correct();
    }

    setAnswersArr([...answersArr, isUserAnswerCorrect]);

    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    setCombination(getNextWordSavanna(words, seenWords, additionalWords));
  };

  useHotkeys(
    '1, 2, 3, 4',
    (_, handler) => {
      handleAnswer(combination.translations[Number(handler.key) - 1]);
    },
    [learnedWords, setLearnedWord, isMusicOn, combination],
  );

  useEffect(() => {
    if (!combination.mainWord?.word) {
      setEndGame(!endGame);
    }
  }, [combination]);

  if (!combination.mainWord?.word) {
    return null;
  }

  return (
    <div className="savanna-outer">
      <div className="savanna-english" key={combination.mainWord._id}>
        {user ? combination.mainWord.word.word : combination.mainWord.word}
      </div>
      <div className="savanna-translation">
        {combination.translations.map((word, key) => (
          <div
            key={word._id}
            role="presentation"
            className="savanna-variants"
            onClick={() => handleAnswer(word)}>
            {key + 1} {user ? word.word.wordTranslate : word.wordTranslate}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Savanna };
