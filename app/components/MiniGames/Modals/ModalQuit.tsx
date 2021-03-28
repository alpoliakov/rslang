import { Button, ButtonGroup } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import Link from 'next/link';

const ModalQuit = ({ quitGame, setQuitGame }) => {
  const [showMod, setModal] = useState(true);
  useHotkeys('esc', () => setModal(false));
  useHotkeys('enter', () => setModal(false));

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
                  <Link href="/">
                    <Button colorScheme="green" className="green-button">
                      Да
                    </Button>
                  </Link>
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
