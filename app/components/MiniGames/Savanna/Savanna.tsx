import { checkAnswerSavanna, getNextWordSavanna } from 'components/MiniGames/helpers/utils';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import useSound from 'use-sound';

const Savanna = ({ counter, setCounter, isMusicOn, words, setLives, setEndGame, endGame }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [learnedWords, setLearnedWord] = useState([]);
  const [combination, setCombination] = useState(getNextWordSavanna(words, learnedWords));

  useEffect(() => {
    const timeOutAnswer = setTimeout(() => handleAnswer(''), 5000);
    console.log('inside timeout useEffect');
    return () => clearTimeout(timeOutAnswer);
  }, [learnedWords]);

  const handleAnswer = (answer) => {
    if (!checkAnswerSavanna(combination.mainWord, answer)) {
      setLives((lives) => [false, ...lives.slice(0, -1)]);
      isMusicOn && incorrect();
    } else {
      setCounter(counter + 10);
      isMusicOn && correct();
    }

    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    setCombination(getNextWordSavanna(words, seenWords));
  };

  useHotkeys(
    '1, 2, 3, 4',
    (_, handler) => {
      handleAnswer(combination.translations[Number(handler.key) - 1]);
    },
    [learnedWords, setLearnedWord, isMusicOn],
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
      <div className="savanna-english">{combination.mainWord.word}</div>
      <div className="savanna-translation">
        {combination.translations.map((word, key) => (
          <div key={word._id} className="savanna-variants" onClick={() => handleAnswer(word)}>
            {key + 1} {word.wordTranslate}
          </div>
        ))}
      </div>
    </div>
  );
};

export { Savanna };
