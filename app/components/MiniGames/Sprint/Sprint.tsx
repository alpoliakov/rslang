import React, { useState } from 'react';
import { Timer } from './Timer';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import {
  ArrowForwardIcon,
  ArrowBackIcon,
  CheckCircleIcon,
  NotAllowedIcon,
  BellIcon,
  CloseIcon,
  WarningIcon,
} from '@chakra-ui/icons';
import { ModalQuit } from '../ModalQuit/ModalQuit';
import { RiMusic2Fill } from 'react-icons/ri';

const Sprint = () => {
  const [isSoundOn, setSound] = useState(true);
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);

  const handleAnswer = () => {
    setCounter(counter + 10);
  };

  const onSwitchSound = () => {
    setSound(!isSoundOn);
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
              size="lg"
              colorScheme={isSoundOn ? 'whiteAlpha' : 'red'}
              aria-label="Switch sound"
              onClick={onSwitchSound}
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
                colorScheme={isSoundOn ? 'green' : 'red'}
                aria-label="Switch sound"
                onClick={onSwitchSound}
                icon={<BellIcon />}
              />
            </div>
            <div className="sprint-pics">
              <img src="https://img.icons8.com/fluent/50/000000/osprey.png" />
              <img src="https://img.icons8.com/fluent/50/000000/falcon.png" />
              <img src="https://img.icons8.com/fluent/50/000000/peacock.png" />
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
