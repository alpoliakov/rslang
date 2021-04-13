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
            очков опыта получишь. На ответ у тебя есть 5 секунд!
            <br />
            <br />
            Чтобы играть с помощью клавиатуры, используй клавиши
            <br /> 1, 2, 3, 4
          </div>
          {chooseLevel && <ChooseLevelModal level={level} setLevel={setLevel} />}
        </div>
        <Button colorScheme="whiteAlpha" variant="outline" onClick={handleClick}>
          начать
        </Button>
      </div>
    </div>
  );
};
