import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalNewGame = ({ setShowGame, showGame }) => {
  const [level, setLevel] = useState('');
  const handleClick = () => setShowGame(!showGame);
  useHotkeys('enter', handleClick);

  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>НАПИСАНИЕ</h1>
        <div className="modalEntrance-box">
          <div>
            Напиши услышанное слово
            <br /> Чтобы дать ответ, кликни на кнопку "Проверить" или нажми Enter
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
