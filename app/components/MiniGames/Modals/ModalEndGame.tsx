import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalEndGame = ({ timeOver, setTimeOver, counter }) => {
  const [showMod, setModal] = useState(true);
  useHotkeys('esc', () => setTimeOver(!timeOver));
  useHotkeys('enter', () => setTimeOver(!timeOver));

  const handleClickClose = () => {
    setModal(!showMod);
    setTimeOver(!timeOver);
  };

  const handleClickReturn = () => {
    setModal(!showMod);
    setTimeOver(!timeOver);
  };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modalEnd-result">
          Поздравляю! Твой результат <br />
          <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
            <CircularProgressLabel size="40px">{counter}</CircularProgressLabel>
          </CircularProgress>
          <br /> баллов!
          <div className="actions">
            <ButtonGroup size="md" spacing="12">
              <Button colorScheme="green" className="green-button" onClick={handleClickClose}>
                Да
              </Button>
              <Button colorScheme="red" onClick={handleClickReturn}>
                Нет
              </Button>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalEndGame };
