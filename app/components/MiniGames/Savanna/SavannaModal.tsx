import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalSavanna = ({ setShowGame, showGame }) => {
  const [level, setLevel] = useState('');
  const handleClick = () => setShowGame(!showGame);
  useHotkeys('enter', handleClick);
  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>САВАННА</h1>
        <div className="modalEntrance-box">
          <div>
            Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше
            очков опыта получишь. <br /> Чтобы дать ответ, кликай по нему мышкой или выбирай из
            клавиш 1, 2, 3, 4
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
