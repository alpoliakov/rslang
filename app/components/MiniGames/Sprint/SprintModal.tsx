import { Button, useColorModeValue } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLevelModal';
import {
  modalBoxColor,
  modalEntranceBackground,
  white,
} from 'components/MiniGames/helpers/constants';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { MiniTimer } from './MiniTimer';

export const ModalSprint = ({ setShowGame, showGame, group, setGroup, chooseLevel }) => {
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
        <h1>СПРИНТ</h1>
        <div className="modalEntrance-box" style={{ backgroundColor: `${boxColor}` }}>
          {!chooseLevel && <MiniTimer setShowGame={setShowGame} />}
          <div>Чтобы дать ответ, кликай по нему мышкой или нажимай клавиши-стрелки</div>
          {chooseLevel && <ChooseLevelModal level={level} setLevel={setLevel} />}
        </div>
        <Button colorScheme={buttonColor} variant="outline" onClick={handleClick}>
          начать
        </Button>
      </div>
    </div>
  );
};
