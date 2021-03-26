import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import { Input } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';

const NewGame = ({ counter, setCounter, isMusicOn }) => {
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  const handleAnswer = () => {
    const currentAnswers = [...correctAnswersArr, true];
    const correctInRow =
      currentAnswers.reverse().findIndex((el) => !el) < 0 && currentAnswers.length;

    setCorrectAnswersArr(currentAnswers);

    setCounter(counter + 10);
    if (isMusicOn) {
      correct();
    }
  };
  // useHotkeys('enter', handleAnswer, [counter, correctAnswersArr]);

  return (
    <div className="newgame-board-outer">
      <div className="newgame-board-head">
        <div key="counter" className="newgame-counter">
          {counter ? `+ ${counter}` : counter}
        </div>
      </div>
      <div className="newgame-board-inner">
        <div className="newgame-sound-box">
          <Button
            w={32}
            h={32}
            borderRadius="100px"
            variant="outline"
            _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
            className="audiocall-button-sound">
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
        <Input width="240px" placeholder="Введи услышанное слово" className="newgame-input" />
        <div className="newgame-button">
          <Button colorScheme="green" onClick={handleAnswer}>
            проверить
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NewGame };
