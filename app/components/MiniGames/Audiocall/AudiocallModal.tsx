import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalAudiocall = ({ setShowGame, showGame }) => {
  const [level, setLevel] = useState('');
  const handleClick = () => setShowGame(!showGame);
  useHotkeys('enter', handleClick);
  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>АУДИОВЫЗОВ</h1>
        <div className="modalEntrance-box">
          <div>
            Тренировка Аудиовызов улучшает восприятие речи на слух.
            <br /> Чтобы дать ответ, кликай по нему мышкой или выбирай из клавиш 1, 2, 3, 4, 5
          </div>
          <ChooseLevelModal level={level} setLevel={setLevel} />
        </div>
        <Button
          colorScheme="whiteAlpha"
          variant="outline"
          onClick={handleClick}
          isDisabled={!level}>
          начать
        </Button>
      </div>
    </div>
  );
};
