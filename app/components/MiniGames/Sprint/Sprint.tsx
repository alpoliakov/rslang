import { ArrowBackIcon, ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Button, ButtonGroup, IconButton } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { RiMusic2Fill } from 'react-icons/ri';
import useSound from 'use-sound';
import { changePicture, egg, extraPoints } from 'components/MiniGames/utils/utils';

const Sprint = ({ counter, setCounter }) => {
  const [isSoundOn, setSound] = useState(true);
  const [isMusicOn, setMusic] = useState(true);
  // const [counter, setCounter] = useState(0);
  const [isCorrect, setIsCorrect] = useState(Boolean);
  const [resultIcons, setResultIcons] = useState([]);
  const [correctAnswersArr, setCorrectAnswersArr] = useState(0);
  const [pic, setPic] = useState(egg);

  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');

  useHotkeys('left', () => handleAnswer());
  useHotkeys('right', () => handleAnswer());

  const handleAnswer = () => {
    // if (resultIcons.length > 3) {
    //   setResultIcons([]);
    // }
    setIsCorrect(true);
    setCounter(counter + extraPoints(pic));

    isCorrect ? setCorrectAnswersArr(correctAnswersArr + 1) : setCorrectAnswersArr(0);

    changePicture(correctAnswersArr, pic, setPic);

    setResultIcons(
      isCorrect
        ? resultIcons.concat([<CheckCircleIcon />])
        : resultIcons.concat([<NotAllowedIcon />]),
    );

    if (isMusicOn) {
      correct();
    }
  };

  useEffect(() => {
    if (resultIcons.length > 3) {
      setResultIcons([]);
    }
  }, [resultIcons]);

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
              {resultIcons.map((icon, key) => (
                <React.Fragment key={key}>{icon}</React.Fragment>
              ))}
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
