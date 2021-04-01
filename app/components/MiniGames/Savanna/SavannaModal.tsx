import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalSavanna = ({
  setShowGame,
  showGame,
  // group, setGroup
}) => {
  // const showChooseLevel = prevPage==="/textbook";
  const [group, setGroup] = useState('');

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
          {/* {showChooseLevel&& */}
          <ChooseLevelModal group={group} setGroup={setGroup} />
          {/* } */}
        </div>
        <Button
          colorScheme="whiteAlpha"
          variant="outline"
          onClick={handleClick}
          isDisabled={!group}>
          начать
        </Button>
      </div>
    </div>
  );
};
