import { Button, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';

const Audiocall = ({ counter, setCounter, isMusicOn }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  const handleAnswer = () => {
    if (isMusicOn) {
      correct();
    }
  };
  // useHotkeys('1, 2, 3, 4, 5', handleAnswer, [counter, correctAnswersArr]);

  return (
    <div className="savanna-outer">
      {/* <IconButton
        className="audiocall-sound"
        variant="ghost"
        colorScheme="whiteAlpha"
        aria-label="Switch sound"
        // onClick={onSwitchSound}
        icon={<GiSpeaker />}
        w={7}
        h={7}
      /> */}
      <div className="audiocall-sound-box">
        <Button
          w={32}
          h={32}
          borderRadius="100px"
          // mr="5"
          variant="outline"
          _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
          className="audiocall-button-sound">
          <Icon
            className="audiocall-sound"
            as={GiSpeaker}
            w={20}
            h={20}
            color="whiteAlpha"
            // className="shadow__item hover__item"
            _hover={{
              color: 'rgba(212, 211, 211, 0.253)',
            }}
          />
        </Button>
      </div>

      <div className="savanna-translation">
        <div className="savanna-variants">1 слово</div>
        <div className="savanna-variants">2 перевод</div>
        <div className="savanna-variants">3 слон</div>
        <div className="savanna-variants">4 барбекю</div>
        <div className="savanna-variants">5 другое</div>
      </div>
      <div className="audiocall-button">
        <Button
          colorScheme="whiteAlpha"
          variant="outline"
          // onClick={handleAnswer}
        >
          не знаю
        </Button>
      </div>
    </div>
  );
};

export { Audiocall };
