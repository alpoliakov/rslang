import { Button, useColorModeValue } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLevelModal';
import {
  modalBoxColor,
  modalEntranceBackground,
  white,
} from 'components/MiniGames/helpers/constants';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalNewGame = ({ setShowGame, showGame, group, setGroup, chooseLevel }) => {
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
        <h1>НАПИСАНИЕ</h1>
        <div className="modalEntrance-box" style={{ backgroundColor: `${boxColor}` }}>
          <div>
            Напиши услышанное слово
            <br /> Чтобы дать ответ, кликни на кнопку "Проверить" или нажми Enter
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
