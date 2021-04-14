import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLevelModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

export const ModalNewGame = ({ setShowGame, showGame, group, setGroup, chooseLevel }) => {
  const [level, setLevel] = useState(group);

  const handleClick = () => {
    setGroup(level);
    setShowGame(!showGame);
  };

  useHotkeys('enter', handleClick);

  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>НАПИСАНИЕ</h1>
        <div className="modalEntrance-box">
          <div>
            Напиши услышанное слово
            <br />
            <br />
            Чтобы играть с помощью клавиатуры, используй клавиши:
            <br />
            space - для воспроизведения звука,
            <br />
            enter - чтобы пропустить вопрос или дать ответ,
            <br />
            стрелка-вправо - чтобы перейти к следующему вопросу.
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
