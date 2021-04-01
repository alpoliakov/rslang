import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import { MiniTimer } from './MiniTimer';

export const ModalSprint = ({ setShowGame, showGame }) => {
  const [group, setGroup] = useState('');
  const [isVocabularyEnter, setVocEnter] = useState(false);
  const handleClick = () => setShowGame(!showGame);
  useHotkeys('enter', handleClick);

  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>СПРИНТ</h1>
        <div className="modalEntrance-box">
          {isVocabularyEnter && <MiniTimer setShowGame={setShowGame} />}
          <div>Чтобы дать ответ, кликай по нему мышкой или нажимай клавиши-стрелки</div>
          {!isVocabularyEnter && <ChooseLevelModal group={group} setGroup={setGroup} />}
        </div>
        {!isVocabularyEnter && (
          <Button
            colorScheme="whiteAlpha"
            variant="outline"
            onClick={handleClick}
            isDisabled={!group}>
            начать
          </Button>
        )}
      </div>
    </div>
  );
};
