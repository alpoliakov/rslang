import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React from 'react';

export const ModalNewGame = ({ setShowGame, showGame }) => {
  const handleClick = () => setShowGame(!showGame);
  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>НАПИСАНИЕ</h1>
        <div className="modalEntrance-box">
          <div>
            Напиши услышанное слово
            <br /> Чтобы дать ответ, кликни на кнопку "Проверить" или нажми Enter
          </div>
          <ChooseLevelModal />
        </div>
        <Button colorScheme="whiteAlpha" variant="outline" onClick={handleClick}>
          начать
        </Button>
      </div>
    </div>
  );
};
