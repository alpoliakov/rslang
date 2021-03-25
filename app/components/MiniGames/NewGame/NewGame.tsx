import { Button, ButtonGroup, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import useSound from 'use-sound';
import { Input } from '@chakra-ui/react';

const NewGame = ({ counter, setCounter, isMusicOn }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  const handleAnswer = () => {
    if (isMusicOn) {
      correct();
    }
  };
  // useHotkeys('enter', handleAnswer, [counter, correctAnswersArr]);

  return (
    <div className="sprint-board-outer">
      <div className="sprint-board-head">
        <div key="counter" className="sprint-counter">
          {counter ? `+ ${counter}` : counter}
        </div>
      </div>
      <div className="sprint-board-inner">
        <div className="audiocall-sound-box">
          <Button
            w={32}
            h={32}
            borderRadius="100px"
            variant="outline"
            _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
            className="audiocall-button-sound">
            <Icon
              className="audiocall-sound"
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
        <Input pr="4.5rem" placeholder="Введи услышанное слово" />
        <div className="audiocall-button">
          <Button colorScheme="whiteAlpha" variant="outline" onClick={handleAnswer}>
            не знаю
          </Button>
        </div>
      </div>
    </div>
  );
};

export { NewGame };
