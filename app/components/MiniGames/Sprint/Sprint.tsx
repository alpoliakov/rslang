import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { CloseButton } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';

import { ModalQuit } from '../ModalQuit/ModalQuit';
import { Timer } from './Timer';

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
            <img src="https://img.icons8.com/fluent/50/000000/osprey.png" alt="osprey" />
            <img src="https://img.icons8.com/fluent/50/000000/falcon.png" alt="falcon" />
            <img src="https://img.icons8.com/fluent/50/000000/peacock.png" alt="peacock" />
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
