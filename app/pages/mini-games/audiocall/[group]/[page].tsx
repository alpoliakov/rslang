import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { Audiocall } from 'components/MiniGames/Audiocall/Audiocall';
import { ModalAudiocall } from 'components/MiniGames/Audiocall/AudiocallModal';
import {
  fetchCurrentWordsAudiocall,
  userFetchAudiocall,
} from 'components/MiniGames/helpers/fetchWords';
import { getStrike } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { RiMusic2Fill } from 'react-icons/ri';

import EditLocalStatistics from '../../../../context/statistic/operations/mutations/editStatistics';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useAuth } from '../../../../lib/useAuth';

export default function AudiocallGamePage({ group, page }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [learnedWords, setLearnedWord] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentGroup, setGroup] = useState(group);
  const [isPaused, setPause] = useState(false);
  const { user } = useAuth();
  const [answersArr, setAnswersArr] = useState([]);

  const { data } = useQuery(GET_LOCAL_STATISTIC);

  useEffect(() => {
    if (endGame) {
      const { wordsCount, rightAnswers, audioCall } = data.localStatistics;
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);

      const args = {
        ...data?.localStatistics,
        wordsCount: wordsCount + learnedWords.length,
        rightAnswers: rightAnswers + totalTrue,
        audioCall: {
          wordsCount: audioCall.wordsCount + learnedWords.length,
          rightAnswers: audioCall.rightAnswers + totalTrue,
          series: audioCall.series + strike,
        },
      };
      EditLocalStatistics(args);
      console.log(data?.localStatistics);
    }
  }, [endGame]);

  const fetchWords = async () => {
    if (user) {
      userFetchAudiocall(currentGroup, currentPage, setLoading, setWords);
    }

    if (!user) {
      fetchCurrentWordsAudiocall(currentGroup, currentPage, setLoading, setWords);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [currentGroup, showGame, currentPage]);

  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(0);
    }
  }, []);

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    setPause(true);
    fullScreen.exit();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  useEffect(() => {
    if (learnedWords.length === 10) {
      setEndGame(true);
    }
  }, [learnedWords]);

  return (
    <>
      <Head>
        <title>Аудиовызов</title>
      </Head>
      {showGame ? (
        <FullScreen handle={fullScreen} className="audiocall-container">
          <Progress
            size="sm"
            value={learnedWords.length * 10}
            colorScheme="green"
            className="audiocall-progress"
          />
          <IconButton
            className="savanna-music"
            variant="ghost"
            colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
            aria-label="Switch sound"
            onClick={onSwitchMusic}
            icon={<RiMusic2Fill />}
          />
          {!loading && (
            <Audiocall
              counter={counter}
              setCounter={setCounter}
              isMusicOn={isMusicOn}
              words={words}
              learnedWords={learnedWords}
              setLearnedWord={setLearnedWord}
              user={user}
              fetchWords={fetchWords}
              answersArr={answersArr}
              setAnswersArr={setAnswersArr}
            />
          )}
          <div className="savanna-close-full">
            <IconButton
              colorScheme="whiteAlpha"
              aria-label="Close game"
              variant="ghost"
              onClick={onQuitGame}
              icon={<CloseIcon />}
            />
            {fullScreen.active ? (
              <IconButton
                colorScheme="whiteAlpha"
                aria-label="Full screen game"
                variant="ghost"
                onClick={fullScreen.exit}
                icon={<BiExitFullscreen />}
              />
            ) : (
              <IconButton
                colorScheme="whiteAlpha"
                aria-label="Full screen game"
                variant="ghost"
                onClick={fullScreen.enter}
                icon={<BiFullscreen />}
              />
            )}
          </div>
        </FullScreen>
      ) : (
        <ModalAudiocall
          setShowGame={setShowGame}
          showGame={showGame}
          chooseLevel={chooseLevel}
          group={group}
          setGroup={setGroup}
        />
      )}
      {quitGame && (
        <ModalQuit
          setQuitGame={setQuitGame}
          quitGame={quitGame}
          isPaused={isPaused}
          setPause={setPause}
        />
      )}
      {endGame && (
        <ModalEndGame counter={counter} learnedWords={learnedWords} answersArr={answersArr} />
      )}
    </>
  );
}

AudiocallGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  console.log(group);

  return {
    group,
    page,
  };
};
