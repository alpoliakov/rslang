import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React from 'react';

export const ModalAudiocall = ({ setShowGame, showGame }) => {
  const handleClick = () => setShowGame(!showGame);
  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>АУДИОВЫЗОВ</h1>
        <div className="modalEntrance-box">
          <div>
            Тренировка Аудиовызов улучшает восприятие речи на слух.
            <br /> Чтобы дать ответ, кликай по нему мышкой или выбирай из клавиш 1, 2, 3, 4, 5
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
