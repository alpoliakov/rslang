import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLevelModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalSavanna = ({ setShowGame, showGame, group, setGroup, chooseLevel }) => {
  const [level, setLevel] = useState(group);

  const handleClick = () => {
    setGroup(level);
    setShowGame(!showGame);
  };

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
          {chooseLevel && <ChooseLevelModal level={level} setLevel={setLevel} />}
        </div>
        {chooseLevel ? (
          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            onClick={handleClick}
            isDisabled={!level}>
            начать
          </Button>
        ) : (
          <Button colorScheme="whiteAlpha" variant="outline" onClick={handleClick}>
            начать
          </Button>
        )}
      </div>
    </div>
  );
};
