import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';
import { getNextWordSavanna, checkAnswerNewGame } from 'components/MiniGames/helpers/utils';

import { LOCAL_HOST } from '../../../constants/index';

const NewGame = ({ counter, setCounter, isMusicOn, words, setLives, setEndGame, endGame }) => {
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [isAnswered, setIsAnswered] = useState(false);
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [learnedWords, setLearnedWord] = useState([]);
  const [combination, setCombination] = useState(getNextWordSavanna(words, learnedWords));

  const [playWord] = useSound(wordAudioUrl);
  const handleSound = () => {
    playWord();
  };
  const handleOnChange = (e) => {
    setInputValue(e.target.value);
    console.log(inputValue);
  };

  const handleAnswer = () => {
    console.log(inputValue, 'inputValue in handleAnswer');
    // checkAnswerNewGame(combination.mainWord, inputValue);

    if (!checkAnswerNewGame(combination.mainWord, inputValue)) {
      setLives((lives) => [false, ...lives.slice(0, -1)]);
      isMusicOn && incorrect();
    } else {
      setCounter(counter + 10);
      if (isMusicOn) {
        correct();
      }
    }
    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    setCombination(getNextWordSavanna(words, seenWords));
  };

  useHotkeys('enter', handleAnswer, [learnedWords, setLearnedWord, isMusicOn]);

  if (!combination.mainWord?.word) {
    setEndGame(!endGame);
    return <div />;
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
                setWordAudioUrl(LOCAL_HOST + combination.mainWord.audio);
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
          <div
            className="newgame-answer"
            color={checkAnswerNewGame(combination.mainWord, inputValue) ? 'green' : 'red'}>
            {combination.mainWord.audio}
          </div>
        )}
        <form onSubmit={handleAnswer} className="newgame-input">
          <Input
            width="240px"
            placeholder="Введи услышанное слово"
            className="newgame-input"
            value={inputValue}
            onChange={(e) => handleOnChange(e)}
          />
          <div className="newgame-button">
            <Button colorScheme="green" type="submit" isDisabled={!inputValue}>
              проверить
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export { NewGame };
