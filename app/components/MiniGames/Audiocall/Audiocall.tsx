import { Button, Icon } from '@chakra-ui/react';
import React, { useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';
import { getNextWordAudiocall, checkAnswerSavanna } from 'components/MiniGames/helpers/utils';
import { LOCAL_HOST } from '../../../constants/index';
import { ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';

const Audiocall = ({ counter, setCounter, isMusicOn, words }) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [isAnswered, setIsAnswered] = useState(false);
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [wordPicUrl, setWordPicUrl] = useState('');
  const [learnedWords, setLearnedWord] = useState([]);
  const [combination, setCombination] = useState(getNextWordAudiocall(words, learnedWords));

  const [playWord] = useSound(wordAudioUrl);
  const handleSound = () => {
    playWord();
  };

  const handleAnswer = (answer) => {
    setIsAnswered(true);
    // const timer = setInterval(()=> )
    if (!checkAnswerSavanna(combination.mainWord, answer)) {
      isMusicOn && incorrect();
    } else {
      setCounter(counter + 10);
      isMusicOn && correct();
    }

    // {isAnswered &&
    //   (learnedWords[learnedWords.length - 1] ? (
    //     <CheckCircleIcon color="green" />
    //   ) : (
    //     <NotAllowedIcon color="red" />
    //   ))}

    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
  };

  // setCombination(getNextWordAudiocall(words, seenWords));

  useHotkeys(
    '1, 2, 3, 4, 5',
    (_, handler) => {
      handleAnswer(combination.translations[Number(handler.key) - 1]);
    },
    [learnedWords, setLearnedWord, isMusicOn],
  );

  return (
    <div className="savanna-outer">
      {isAnswered ? (
        <div className="audiocall-answer-container">
          <div>
            <img className="audiocall-pic" src={wordPicUrl} alt="answer" />
          </div>
          <div className="audiocall-answer-box">
            <div className="audiocall-small-sound-box">
              <Button
                w={10}
                h={10}
                borderRadius="100px"
                variant="outline"
                _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
                className="audiocall-button-sound"
                onMouseDown={() => {
                  setWordAudioUrl(LOCAL_HOST + combination.mainWord.audio);
                  setWordPicUrl(LOCAL_HOST + combination.mainWord.image);
                }}
                onClick={handleSound}>
                <Icon
                  className="audiocall-sound"
                  as={GiSpeaker}
                  w={6}
                  h={6}
                  color="whiteAlpha"
                  _hover={{
                    color: 'rgba(212, 211, 211, 0.253)',
                  }}
                />
              </Button>
            </div>
            <div className="audiocall-answer">{combination.mainWord.word}</div>
          </div>
        </div>
      ) : (
        <div className="audiocall-sound-box">
          <Button
            w={32}
            h={32}
            borderRadius="100px"
            // mr="5"
            variant="outline"
            _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
            className="audiocall-button-sound"
            onMouseDown={() => {
              setWordAudioUrl(LOCAL_HOST + combination.mainWord.audio);
              setWordPicUrl(LOCAL_HOST + combination.mainWord.image);
            }}
            onClick={handleSound}>
            <Icon
              className="audiocall-sound"
              as={GiSpeaker}
              w={20}
              h={20}
              color="whiteAlpha"
              // className="shadow__item hover__item"
              _hover={{
                color: 'rgba(212, 211, 211, 0.253)',
              }}
            />
          </Button>
        </div>
      )}
      <div className="savanna-translation">
        {combination.translations.map((word, key) => (
          <div
            key={word._id}
            className="savanna-variants"
            onMouseDown={() => {
              setWordAudioUrl(LOCAL_HOST + combination.mainWord.audio);
              setWordPicUrl(LOCAL_HOST + combination.mainWord.image);
            }}
            onClick={() => handleAnswer(word)}>
            {key + 1} {word.wordTranslate}
          </div>
        ))}
      </div>
      <div className="audiocall-button">
        <Button
          w={100}
          colorScheme="whiteAlpha"
          variant="outline"
          // onClick={() => handleAnswer(null)}
        >
          {isAnswered ? <ArrowForwardIcon /> : 'не знаю'}
        </Button>
      </div>
    </div>
  );
};

export { Audiocall };
