import { Button } from '@chakra-ui/react';
import { ChooseLevelModal } from 'components/MiniGames/ChooseLevelModal/ChooseLeveloModal';
import React, { useState } from 'react';

import { MiniTimer } from './MiniTimer';

export const ModalSprint = ({ setShowGame, showGame }) => {
  const [isVocabularyEnter, setVocEnter] = useState(true);
  const handleClick = () => setShowGame(!showGame);
  return (
    <div className="modalEntrance">
      <div className="modalEntrance-container">
        <h1>СПРИНТ</h1>
        <div className="modalEntrance-box">
          {isVocabularyEnter && <MiniTimer setShowGame={setShowGame} />}
          <div>Чтобы дать ответ, кликай по нему мышкой или нажимай клавиши-стрелки</div>
          {!isVocabularyEnter && <ChooseLevelModal />}
        </div>
        {!isVocabularyEnter && (
          <Button colorScheme="whiteAlpha" variant="outline" onClick={handleClick}>
            начать
          </Button>
        )}
      </div>
    </div>
  );
};
