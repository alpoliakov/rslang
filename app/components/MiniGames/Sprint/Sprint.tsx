import React, { useState } from 'react';
import { CloseButton } from '@chakra-ui/react';
import { Timer } from './Timer';
import { Button, ButtonGroup } from '@chakra-ui/react';
import { ArrowForwardIcon, ArrowBackIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { ModalQuit } from '../ModalQuit/ModalQuit';

const Sprint = () => {
  const [showGame, setShowGame] = useState(true);

  const onCloseGame = () => setShowGame(false);

  return (
    <>
      <div className="sprint-container">
        <Timer />
        <div className="sprint-board-outer">
          <div className="sprint-icons">
            <CheckCircleIcon />
            <CheckCircleIcon />
            <NotAllowedIcon />
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
              <Button colorScheme="red">Неверно</Button>
              <Button colorScheme="green" className="green-button">
                Верно
              </Button>
            </ButtonGroup>
          </div>
          <div className="sprint-arrows">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
        </div>
        <div className="sprint-close">
          <Button colorScheme="whiteAlpha" variant="ghost">
            X
          </Button>
          {/* <CloseButton size="lg" onClick={onCloseGame} colorScheme="whiteAlpha" /> */}
        </div>
      </div>
      <ModalQuit />
    </>
  );
};

export { Sprint };
