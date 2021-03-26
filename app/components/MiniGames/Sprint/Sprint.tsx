import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import { changePicture, extraPoints } from 'components/MiniGames/helpers/utils';
import { egg } from 'components/MiniGames/helpers/constants';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { RiMusic2Fill } from 'react-icons/ri';
import useSound from 'use-sound';

const Sprint = ({ counter, setCounter }) => {
  const [isSoundOn, setSound] = useState(true);
  const [isMusicOn, setMusic] = useState(true);
  const [correctAnswersArr, setCorrectAnswersArr] = useState([]);
  const [pic, setPic] = useState(egg);

  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  const handleAnswer = () => {
    const currentAnswers = [...correctAnswersArr, true];
    const correctInRow =
      currentAnswers.reverse().findIndex((el) => !el) < 0 && currentAnswers.length;

    setCounter(counter + extraPoints(pic));
    setCorrectAnswersArr(currentAnswers);
    changePicture(correctInRow, setPic);
    console.log(correctInRow);

    if (isMusicOn) {
      correct();
    }
  };
  useHotkeys('left, right', handleAnswer, [counter, correctAnswersArr]);

  const onSwitchSound = () => {
    setSound(!isSoundOn);
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  return (
    <>
      <div className="sprint-board-outer">
        <div className="sprint-board-head">
          <div key="counter" className="sprint-counter">
            {counter ? `+ ${counter}` : counter}
          </div>
          <IconButton
            className="sprint-music"
            variant="ghost"
            colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
            aria-label="Switch sound"
            onClick={onSwitchMusic}
            icon={<RiMusic2Fill />}
          />
        </div>
        <div className="sprint-board-inner">
          <div className="sprint-icons">
            <div className="sprint-result-icons">
              {correctAnswersArr
                .slice(-(correctAnswersArr.length % 4 || 4))
                .map((isCorrectAnswer, i) =>
                  isCorrectAnswer ? <CheckCircleIcon key={i} /> : <NotAllowedIcon key={i} />,
                )}
            </div>
            <IconButton
              className="sprint-sound"
              variant="ghost"
              colorScheme="whiteAlpha"
              aria-label="Switch sound"
              onClick={onSwitchSound}
              icon={isSoundOn ? <GiSpeaker /> : <GiSpeakerOff />}
            />
          </div>
          <div className="sprint-pics">
            <img src={pic} alt="dino-baby" />
          </div>
          <div className="sprint-english">daily</div>
          <div className="sprint-translation">высокомерный</div>
          <div className="sprint-buttons">
            <ButtonGroup size="lg" spacing="12">
              <Button colorScheme="red" onClick={handleAnswer}>
                Неверно
              </Button>
              <Button colorScheme="green" className="green-button" onClick={handleAnswer}>
                Верно
              </Button>
            </ButtonGroup>
          </div>
          <div className="sprint-arrows">
            <ArrowBackIcon />
            <ArrowForwardIcon />
          </div>
        </div>
      </div>
    </>
  );
};

export { Sprint };
