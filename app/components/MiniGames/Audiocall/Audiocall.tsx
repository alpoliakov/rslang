import { ArrowForwardIcon, CheckCircleIcon, NotAllowedIcon } from '@chakra-ui/icons';
import { Button, Icon } from '@chakra-ui/react';
import { editWord, fetchCurrentWord } from 'components/MiniGames/helpers/fetchWords';
import { checkAnswerSavanna, getNextWordAudiocall } from 'components/MiniGames/helpers/utils';
import React, { useEffect, useState } from 'react';
import { useHotkeys } from 'react-hotkeys-hook';
import { GiSpeaker } from 'react-icons/gi';
import useSound from 'use-sound';

import { LOCAL_HOST } from '../../../constants/index';
import { useEditAggregatedWordMutation } from '../../../lib/graphql/editAggregatedWord.graphql';

const Audiocall = ({
  counter,
  setCounter,
  isMusicOn,
  words,
  learnedWords,
  setLearnedWord,
  user,
  fetchWords,
  answersArr,
  setAnswersArr,
}) => {
  const [correct] = useSound('/sounds/correct.mp3');
  const [incorrect] = useSound('/sounds/incorrect.mp3');
  const [isAnswered, setIsAnswered] = useState(false);
  const [wordAudioUrl, setWordAudioUrl] = useState('');
  const [wordPicUrl, setWordPicUrl] = useState('');
  const [combination, setCombination] = useState(getNextWordAudiocall(words, learnedWords));

  const [editAggregatedWord] = useEditAggregatedWordMutation();

  const [playWord] = useSound(wordAudioUrl);

  const handleSound = () => {
    playWord();
  };

  // useEffect(() => {
  //   setWordAudioUrl(LOCAL_HOST + combination.mainWord.audio);
  //   playWord();
  // }, [combination]);

  const handleAnswer = async (answer) => {
    setIsAnswered(true);
    const isUserAnswerCorrect = checkAnswerSavanna(combination.mainWord, answer);
    if (!isUserAnswerCorrect) {
      if (user) {
        const word = await fetchCurrentWord(combination.mainWord._id);
        const { optional, complexity, deleted } = word;
        const { repeat, rightAnswers, wrongAnswers } = optional;
        const args = {
          id: combination.mainWord._id,
          repeat: repeat + 1,
          rightAnswers: rightAnswers,
          wrongAnswers: wrongAnswers + 1,
          studied: true,
        };
        await editWord(args, complexity, deleted, editAggregatedWord, fetchWords);
      }

      isMusicOn && incorrect();
    } else {
      if (user) {
        const word = await fetchCurrentWord(combination.mainWord._id);
        const { optional, complexity, deleted } = word;
        const { repeat, rightAnswers, wrongAnswers } = optional;

        const args = {
          id: combination.mainWord._id,
          repeat: repeat + 1,
          rightAnswers: rightAnswers + 1,
          wrongAnswers: wrongAnswers,
          studied: true,
        };
        editWord(args, complexity, deleted, editAggregatedWord, fetchWords);
      }

      setCounter(counter + 10);
      isMusicOn && correct();
    }
    setWordPicUrl(
      LOCAL_HOST + (user ? combination.mainWord.word.image : combination.mainWord.image),
    );

    // {isAnswered &&
    //   (learnedWords[learnedWords.length - 1] ? (
    //     <CheckCircleIcon color="green" />
    //   ) : (
    //     <NotAllowedIcon color="red" />
    //   ))}

    const seenWords = [...learnedWords, combination.mainWord];
    setLearnedWord(seenWords);
    setAnswersArr([...answersArr, isUserAnswerCorrect]);
  };

  const callNextWord = () => {
    setCombination(getNextWordAudiocall(words, learnedWords));
    setIsAnswered(false);
  };

  // useEffect(() => playWord(), [combination]);

  useHotkeys(
    '1, 2, 3, 4, 5',
    (_, handler) => {
      handleAnswer(combination.translations[Number(handler.key) - 1]);
    },
    [learnedWords, setLearnedWord, isMusicOn, combination, isAnswered],
  );

  isAnswered
    ? useHotkeys('enter', callNextWord, [learnedWords, isAnswered])
    : useHotkeys('enter', () => handleAnswer(''), [learnedWords, isAnswered]);

  useHotkeys('space', () => playWord());

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
                  setWordAudioUrl(
                    LOCAL_HOST +
                      `${user ? combination.mainWord.word.audio : combination.mainWord.audio}`,
                  );
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
            <div className="audiocall-answer">
              {user ? combination.mainWord.word.word : combination.mainWord.word}
            </div>
          </div>
        </div>
      ) : (
        <div className="audiocall-sound-box">
          <Button
            w={32}
            h={32}
            borderRadius="100px"
            variant="outline"
            _hover={{ bg: 'rgba(255, 255, 255, 0.089)' }}
            className="audiocall-button-sound"
            onMouseDown={() => {
              setWordAudioUrl(
                LOCAL_HOST +
                  `${user ? combination.mainWord.word.audio : combination.mainWord.audio}`,
              );
              setWordPicUrl(
                LOCAL_HOST +
                  `${user ? combination.mainWord.word.image : combination.mainWord.image}`,
              );
            }}
            onClick={handleSound}>
            <Icon
              className="audiocall-sound"
              as={GiSpeaker}
              w={20}
              h={20}
              color="whiteAlpha"
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
              setWordAudioUrl(
                LOCAL_HOST +
                  `${user ? combination.mainWord.word.audio : combination.mainWord.audio}`,
              );
              setWordPicUrl(
                LOCAL_HOST +
                  `${user ? combination.mainWord.word.image : combination.mainWord.image}`,
              );
            }}
            onClick={() => handleAnswer(word)}>
            {key + 1} {user ? word.word.wordTranslate : word.wordTranslate}
          </div>
        ))}
      </div>
      <div className="audiocall-button">
        {isAnswered ? (
          <Button w={100} colorScheme="whiteAlpha" variant="outline" onClick={callNextWord}>
            <ArrowForwardIcon />
          </Button>
        ) : (
          <Button
            w={100}
            colorScheme="whiteAlpha"
            variant="outline"
            onClick={() => handleAnswer('')}>
            не знаю
          </Button>
        )}
      </div>
    </div>
  );
};

export { Audiocall };
