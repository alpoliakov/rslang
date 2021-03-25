import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';

import useSound from 'use-sound';

const Savanna = ({ counter, setCounter, isMusicOn }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  const handleAnswer = () => {
    if (isMusicOn) {
      correct();
    }
  };
  // useHotkeys('1, 2, 3, 4', handleAnswer, [counter, correctAnswersArr]);

  return (
    <div className="savanna-outer">
      <div className="savanna-english">barbecue</div>
      <div className="savanna-translation">
        <div className="savanna-variants">1 слово</div>
        <div className="savanna-variants">2 перевод</div>
        <div className="savanna-variants">3 слон</div>
        <div className="savanna-variants">4 барбекю</div>
      </div>
    </div>
  );
};

export { Savanna };
