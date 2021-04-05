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
  fetchWords,
}) => {
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [learnedWords, setLearnedWord] = useState([]);
  const [colorAnswer, setColorAnswer] = useState('');
  const [combination, setCombination] = useState(getNextWordSavanna(words, learnedWords));

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  const [playWord] = useSound(wordAudioUrl);
  const handleSound = () => {
    playWord();
  };

  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const handleAnswer = async (e) => {
    e.preventDefault();
    setIsAnswered(true);

    if (!checkAnswerNewGame(combination.mainWord, inputValue, user)) {
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
        editWord(args, complexity, deleted, editAggregatedWord, fetchWords);
      }

      setCounter(counter + 10);
      setColorAnswer('green');
      isMusicOn && correct();
    }
    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
  };

  const callNextWord = () => {
    setInputValue('');
    setCombination(getNextWordSavanna(words, learnedWords));
    setIsAnswered(false);
  };

  useHotkeys('enter', handleAnswer, [learnedWords, setLearnedWord, isMusicOn, isAnswered]);

  isAnswered
    ? useHotkeys('enter', handleAnswer, [learnedWords, setLearnedWord, isMusicOn, isAnswered])
    : useHotkeys('enter', callNextWord, [learnedWords, setLearnedWord, isMusicOn, isAnswered]);

  useEffect(() => {
    if (!combination.mainWord?.word) {
      setEndGame(!endGame);
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
              onMouseDown={() => {
                setWordAudioUrl(
                  LOCAL_HOST +
                    `${user ? combination.mainWord.word.audio : combination.mainWord.audio}`,
                );
              }}
              onClick={handleSound}>
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
          />
          <div className="newgame-button">
            {isAnswered ? (
              <Button w={100} colorScheme="whiteAlpha" variant="outline" onClick={callNextWord}>
                <ArrowForwardIcon />
              </Button>
            ) : (
              <Button colorScheme="green" type="submit" isDisabled={!inputValue || isAnswered}>
                проверить
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewGame };
