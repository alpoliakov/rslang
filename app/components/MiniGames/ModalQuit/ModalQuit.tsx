import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalQuit = () => {
  const [showMod, setModal] = useState(true);
  useHotkeys('esc', () => setModal(false));
  useHotkeys('enter', () => setModal(false));

  const handleClickClose = () => {
    setModal(!showMod);
  };

  const handleClickReturn = () => {
    setModal(!showMod);
  };

  return (
    <>
      {showMod ? (
        <div className="modal-container">
          <div className="modal" id="modal">
            <h2>Хотите выйти из игры?</h2>
            <div className="content">Прогресс будет утерян</div>
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
      ) : null}
    </>
  );
};

export { ModalQuit };
