import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { egg } from 'components/MiniGames/helpers/constants';
import { editWord, fetchCurrentWord } from 'components/MiniGames/helpers/fetchWords';
import {
  changePicture,
  checkAnswerSprint,
  extraPoints,
  getNextWordSprint,
} from 'components/MiniGames/helpers/utils';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import { RiMusic2Fill } from 'react-icons/ri';
import useSound from 'use-sound';

import { LOCAL_HOST } from '../../../constants/index';
import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';

const Sprint = ({
  counter,
  setCounter,
  words,
  user,
  fetchWords,
  timeOver,
  setTimeOver,
  setCurrentPage,
  currentPage,
  chooseLevel,
  answersArr,
  setAnswersArr,
  learnedWords,
  setLearnedWord,
  loading,
}) => {
  const [isMusicOn, setMusic] = useState(true);
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);

  const [pic, setPic] = useState(egg);
  const [combination, setCombination] = useState(getNextWordSprint(words, learnedWords));
  const audio = `${LOCAL_HOST}${
    user ? combination.mainWord?.word?.audio : combination.mainWord?.audio
  }`;
  const [wordAudioUrl, setWordAudioUrl] = useState(audio);
  const [editAggregatedWord] = useEditAggregatedWordMutation();

  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  useEffect(() => {
    setWordAudioUrl(audio);
  }, [combination, user]);

  const [playWord] = useSound(wordAudioUrl);

  const handleAnswer = async (answer) => {
    const isUserAnswerCorrect = checkAnswerSprint(
      answer,
      combination.mainWord,
      combination.translation,
    );

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
        await editWord(args, complexity, deleted, editAggregatedWord, fetchWords);
      }

      setCorrectAnswersArr([]);
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
        editWord(args, complexity, deleted, editAggregatedWord, fetchWords);
      }

      setCorrectAnswersArr([...correctAnswersArr, isUserAnswerCorrect]);
      setCounter(counter + extraPoints(pic));
      isMusicOn && correct();
    }

    setAnswersArr([...answersArr, isUserAnswerCorrect]);

    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    setCombination(getNextWordSprint(words, seenWords));
  };

  useEffect(() => changePicture(correctAnswersArr.length, setPic), [correctAnswersArr]);

  useHotkeys('left', () => handleAnswer(false), [
    counter,
    correctAnswersArr,
    isMusicOn,
    combination,
  ]);
  useHotkeys('right', () => handleAnswer(true), [
    counter,
    correctAnswersArr,
    isMusicOn,
    combination,
  ]);

  const handleSound = () => {
    playWord();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  useEffect(() => {
    if (!combination.mainWord?.word) {
      if (chooseLevel) {
        setCurrentPage(currentPage + 1);
      }
      if (!chooseLevel && currentPage !== 0) {
        setCurrentPage(currentPage - 1);
      } else {
        setTimeOver(!timeOver);
      }
    }
  }, [combination]);

  useEffect(() => {
    setCombination(getNextWordSprint(words, learnedWords));
  }, [words]);

  if (!combination.mainWord?.word || loading) {
    return null;
  }

  return (
    <>
      <div className="sprint-board-outer">
        <div className="sprint-board-head">
          <div key="counter" className="sprint-counter">
            {counter ? `+ ${counter}` : counter}
          </div>
          <IconButton
            className="sprint-music"
            variant="ghost"
            colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
            aria-label="Switch sound"
            onClick={onSwitchMusic}
            icon={<RiMusic2Fill />}
          />
        </div>
        <div className="sprint-board-inner">
          <div className="sprint-icons">
            <div className="sprint-result-icons">
              {correctAnswersArr
                .slice(-(correctAnswersArr.length % 4 || 4))
                .map((isCorrectAnswer, i) =>
                  isCorrectAnswer ? <CheckCircleIcon key={i} /> : <NotAllowedIcon key={i} />,
                )}
            </div>
            <IconButton
              className="sprint-sound"
              variant="ghost"
              colorScheme="whiteAlpha"
              aria-label="Switch sound"
              onClick={handleSound}
              icon={<GiSpeaker />}
            />
          </div>
          <div className="sprint-pics">
            <img src={pic} alt="dino-baby" />
          </div>
          <div className="sprint-english">
            {user ? combination.mainWord.word.word : combination.mainWord.word}
          </div>
          <div className="sprint-translation">
            {user
              ? combination.translation.word.wordTranslate
              : combination.translation.wordTranslate}
          </div>
          <div className="sprint-buttons">
            <ButtonGroup size="lg" spacing="12">
              <Button colorScheme="red" onClick={() => handleAnswer(false)}>
                Неверно
              </Button>
              <Button
                colorScheme="green"
                className="green-button"
                onClick={() => handleAnswer(true)}>
                Верно
              </Button>
            </ButtonGroup>
          </div>
          <div className="sprint-arrows">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export { Sprint };
