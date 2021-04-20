import { ArrowForwardIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import { editWord, fetchCurrentWord } from 'components/MiniGames/helpers/fetchWords';
import { checkAnswerNewGame, getNextWordSavanna } from 'components/MiniGames/helpers/utils';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';

import { LOCAL_HOST } from '../../../constants/index';
import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';

const NewGame = ({
  counter,
  setCounter,
  isMusicOn,
  words,
  setLives,
  setEndGame,
  endGame,
  user,
  answersArr,
  setAnswersArr,
  learnedWords,
  setLearnedWord,
  setCurrentPage,
  currentPage,
  chooseLevel,
}) => {
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [colorAnswer, setColorAnswer] = useState('');
  const [combination, setCombination] = useState(getNextWordSavanna(words, learnedWords, []));
  const audio = `${LOCAL_HOST}${
    user ? combination.mainWord?.word?.audio : combination.mainWord?.audio
  }`;
  const [wordAudioUrl, setWordAudioUrl] = useState(audio);
  const inputRef = React.createRef<HTMLInputElement>();

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  useEffect(() => {
    setWordAudioUrl(audio);
  }, [combination, user]);

  const [playWord] = useSound(wordAudioUrl);

  const handlePlayWord = () => {
    playWord();
  };

  const handleOnChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleAnswer = async (event?) => {
    event?.preventDefault();
    setIsAnswered(true);
    const isUserAnswerCorrect = checkAnswerNewGame(combination.mainWord, inputValue, user);

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
      setColorAnswer('red');
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
      setColorAnswer('green');
      isMusicOn && correct();
    }
    const currentAnswers = [...answersArr, isUserAnswerCorrect];

    setAnswersArr(currentAnswers);
    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    inputRef.current?.blur();
  };

  const callNextWord = () => {
    setInputValue('');
    setCombination(getNextWordSavanna(words, learnedWords, []));
    setIsAnswered(false);
  };

  useHotkeys(
    'right',
    () => {
      isAnswered && callNextWord();
    },
    [learnedWords, setLearnedWord, isMusicOn, isAnswered],
  );
  useHotkeys(
    'enter',
    () => {
      !isAnswered && handleAnswer();
    },
    [learnedWords, setLearnedWord, isMusicOn, isAnswered],
  );

  useHotkeys(
    'space',
    () => {
      playWord();
    },
    [playWord],
  );

  useEffect(() => {
    if (!combination.mainWord?.word) {
      if (chooseLevel) {
        setCurrentPage(currentPage + 1);
      }
      if (!chooseLevel && currentPage !== 0) {
        setCurrentPage(currentPage - 1);
      } else {
        setEndGame(!endGame);
      }
    }
  }, [combination]);

  if (!combination.mainWord?.word) {
    return null;
  }

  return (
    <div className="newgame-board-outer">
      <div className="newgame-board-head">
        <div key="counter" className="newgame-counter">
          {counter ? `+ ${counter}` : counter}
        </div>
      </div>
      <div className="newgame-board-inner">
        {!isAnswered ? (
          <div className="newgame-sound-box">
            <Button
              w={32}
              h={32}
              borderRadius="100px"
              variant="outline"
              _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
              className="audiocall-button-sound"
              onClick={handlePlayWord}>
              <Icon
                className="newgame-sound"
                as={GiSpeaker}
                w={20}
                h={20}
                color="whiteAlpha"
                _hover={{
                  color: 'rgba(212, 211, 211, 0.253)',
                }}
              />
            </Button>
          </div>
        ) : (
          <div className="newgame-answer" style={{ textShadow: `3px 3px 3px ${colorAnswer}` }}>
            {user ? combination.mainWord.word.word : combination.mainWord.word}
          </div>
        )}
        <form
          onSubmit={(e) => {
            handleAnswer(e);
          }}
          className="newgame-form">
          <Input
            width="240px"
            placeholder="Введи услышанное слово"
            className="newgame-input"
            value={inputValue}
            onChange={handleOnChange}
            ref={inputRef}
          />
          <div className="newgame-buttons">
            <ButtonGroup size="md" spacing="8">
              <Button
                colorScheme="whiteAlpha"
                type="submit"
                variant="outline"
                isDisabled={isAnswered}>
                не знаю
              </Button>
              {isAnswered ? (
                <Button w={100} colorScheme="whiteAlpha" variant="outline" onClick={callNextWord}>
                  <ArrowForwardIcon />
                </Button>
              ) : (
                <Button colorScheme="green" type="submit" isDisabled={!inputValue || isAnswered}>
                  проверить
                </Button>
              )}
            </ButtonGroup>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewGame };
