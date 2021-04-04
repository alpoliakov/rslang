import { Button, ButtonGroup, useColorModeValue } from '@chakra-ui/react';
import {
  modalBoxColor,
  modalEntranceBackground,
  white,
} from 'components/MiniGames/helpers/constants';
import Link from 'next/link';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

const ModalQuit = ({ quitGame, setQuitGame }) => {
  const buttonColor = useColorModeValue(white.LIGHT, white.DARK);
  const backGroudColor = useColorModeValue(
    modalEntranceBackground.LIGHT,
    modalEntranceBackground.DARK,
  );
  const boxColor = useColorModeValue(modalBoxColor.LIGHT, modalBoxColor.DARK);

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
        <div className="modal-container" style={{ backgroundColor: `${backGroudColor}` }}>
          <div className="modal">
            <div className="modal-box" style={{ backgroundColor: `${boxColor}` }}>
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
