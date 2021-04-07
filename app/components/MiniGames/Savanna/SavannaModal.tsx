import { Button, useColorModeValue } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLevelModal';
import {
  modalBoxColor,
  modalEntranceBackground,
  white,
} from 'components/MiniGames/helpers/constants';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalSavanna = ({ setShowGame, showGame, group, setGroup, chooseLevel }) => {
  const [level, setLevel] = useState(group);
  const buttonColor = useColorModeValue(white.LIGHT, white.DARK);
  const backGroudColor = useColorModeValue(
    modalEntranceBackground.LIGHT,
    modalEntranceBackground.DARK,
  );
  const boxColor = useColorModeValue(modalBoxColor.LIGHT, modalBoxColor.DARK);

  const handleClick = () => {
    setGroup(level);
    setShowGame(!showGame);
  };

  useHotkeys('enter', handleClick);
  return (
    <div className="modalEntrance" style={{ backgroundColor: `${backGroudColor}` }}>
      <div className="modalEntrance-container">
        <h1>САВАННА</h1>
        <div className="modalEntrance-box" style={{ backgroundColor: `${boxColor}` }}>
          <div>
            Тренировка Саванна развивает словарный запас. Чем больше слов ты знаешь, тем больше
            очков опыта получишь. <br /> Чтобы дать ответ, кликай по нему мышкой или выбирай из
            клавиш 1, 2, 3, 4
          </div>
          {chooseLevel && <ChooseLevelModal level={level} setLevel={setLevel} />}
        </div>
        <Button colorScheme={buttonColor} variant="outline" onClick={handleClick}>
          начать
        </Button>
      </div>
    </div>
  );
};
