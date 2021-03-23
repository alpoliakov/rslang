import {
  ArrowBackIcon,
  ArrowForwardIcon,
  CheckCircleIcon,
  CloseIcon,
  NotAllowedIcon,
} from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { RiMusic2Fill } from 'react-icons/ri';
import useSound from 'use-sound';

import { ModalQuit } from '../ModalQuit/ModalQuit';
import { Timer } from './Timer';

const Sprint = () => {
  const [isSoundOn, setSound] = useState(true);
  const [isMusicOn, setMusic] = useState(true);
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);

  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  useHotkeys('left', () => handleAnswer());
  useHotkeys('right', () => handleAnswer());

  const handleAnswer = () => {
    setCounter(counter + 10);

    if (isMusicOn) {
      incorrect();
    }
  };

  const onSwitchSound = () => {
    setSound(!isSoundOn);
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  const onQuitGame = () => {
    setQuitGame(true);
  };
  return (
    <>
      <div className="sprint-container">
        <Timer />
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
                <CheckCircleIcon />
                <CheckCircleIcon />
                <NotAllowedIcon />
              </div>
              <IconButton
                className="sprint-sound"
                variant="ghost"
                colorScheme="whiteAlpha"
                aria-label="Switch sound"
                onClick={onSwitchSound}
                icon={isSoundOn ? <GiSpeaker /> : <GiSpeakerOff />}
              />
            </div>
            <div className="sprint-pics">
              {/* <img src="https://img.icons8.com/color/48/000000/kawaii-egg.png" alt="egg" />
              <img src="https://img.icons8.com/color/48/000000/dinosaur-egg.png" alt="dino-egg" /> */}
              <img
                src="https://img.icons8.com/color/96/000000/kawaii-dinosaur--v2.png"
                alt="dino-baby"
              />
              {/* <img src="https://img.icons8.com/color/96/000000/european-dragon.png" alt="dragon" /> */}
            </div>
            <div className="sprint-english">daily</div>
            <div className="sprint-translation">высокомерный</div>
            <div className="sprint-buttons">
              <ButtonGroup size="lg" spacing="12">
                <Button colorScheme="red" onClick={handleAnswer}>
                  Неверно
                </Button>
                <Button colorScheme="green" className="green-button" onClick={handleAnswer}>
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
        <IconButton
          className="sprint-close"
          colorScheme="whiteAlpha"
          aria-label="Close game"
          variant="ghost"
          onClick={onQuitGame}
          icon={<CloseIcon />}
        />
      </div>
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
    </>
  );
};

export { Sprint };
