import React from 'react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import { Button } from '@chakra-ui/react';

export const ModalSavanna = ({ setShowGame, showGame }) => {
  const handleClick = () => setShowGame(!showGame);
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
          <ChooseLevelModal />
        </div>
        <Button colorScheme="whiteAlpha" variant="outline" onClick={handleClick}>
          начать
        </Button>
      </div>
    </div>
  );
};
