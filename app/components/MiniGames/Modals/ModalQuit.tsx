import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalQuit = ({ quitGame, setQuitGame }) => {
  const [showMod, setModal] = useState(true);
  useHotkeys('esc', () => setModal(false));
  useHotkeys('enter', () => setModal(false));

  const handleClickClose = () => {
    setModal(!showMod);
    setQuitGame(!quitGame);
  };

  const handleClickReturn = () => {
    setModal(!showMod);
    setQuitGame(!quitGame);
  };

  return (
    <>
      {showMod && (
        <div className="modal-container">
          <div className="modal">
            <div className="modal-box">
              <div className="modal-ask">Хотите выйти из игры?</div>
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
        </div>
      )}
    </>
  );
};

export { ModalQuit };
