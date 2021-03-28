import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';

const ModalEndGame = ({ timeOver, setTimeOver, counter }) => {
  const [showMod, setModal] = useState(true);
  useHotkeys('esc', () => setTimeOver(!timeOver));
  useHotkeys('enter', () => setTimeOver(!timeOver));

  // const handleClickClose = () => {
  //   setModal(!showMod);
  //   setTimeOver(!timeOver);
  // };

  // const handleClickReturn = () => {
  //   setModal(!showMod);
  //   setTimeOver(!timeOver);
  // };

  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modalEnd-result">
          {counter > 0 ? 'Поздравляю!' : 'Очень жаль.'} Твой результат <br />
          <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
            <CircularProgressLabel size="40px">{counter}</CircularProgressLabel>
          </CircularProgress>
          <br /> баллов!
          <div className="actions">
            <ButtonGroup size="md" spacing="12">
              {/* <Button colorScheme="green" className="green-button" onClick={handleClickClose}>
                еще круг
              </Button> */}
              <Link href="/">
                <Button colorScheme="red">закрыть</Button>
              </Link>
            </ButtonGroup>
          </div>
        </div>
      </div>
    </div>
  );
};

export { ModalEndGame };
