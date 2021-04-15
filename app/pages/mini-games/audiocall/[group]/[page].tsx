import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { Audiocall } from 'components/MiniGames/Audiocall/Audiocall';
import { ModalAudiocall } from 'components/MiniGames/Audiocall/AudiocallModal';
import {
  fetchCurrentWordsAudiocall,
  getBackUpWords,
  userFetchAudiocall,
  fetchWordsFromComplexity,
  fetchWordsFromStudied,
  fetchWordsFromDeleted,
  fetchUserStatistic,
  editGlobalStatistic,
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

import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useEditStatisticMutation } from '../../../../lib/graphql/editStatistic.graphql';
import { useAuth } from '../../../../lib/useAuth';
import { nonAuthUserStatistic } from '../../../../utils/processingUserLocalStatistic';
import { useAppContext } from '../../../../context/ContextApp';

export default function AudiocallGamePage({ group, page }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [additionalWords, setAdditionalWords] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [learnedWords, setLearnedWord] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentGroup, setGroup] = useState(group);
  const [isPaused, setPause] = useState(false);
  const { user } = useAuth();
  const [answersArr, setAnswersArr] = useState([]);
  const [userStatistic, setUserStatistic] = useState(null);

  const [localState, setLocalState] = useState(null);

  const fullScreen = useFullScreenHandle();
  const [editStatistic] = useEditStatisticMutation();
  const { previousPageName } = useAppContext();

  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  const {
    data: { localStatistics },
  } = useQuery(GET_LOCAL_STATISTIC);

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(Math.floor(Math.random() * 28));
    }

    if (!user) {
      setLocalState(nonAuthUserStatistic('localStatistic', localStatistics));
    }
  }, []);

  useEffect(() => {
    if (user) {
      fetchUserStatistic().then((data) => {
        setUserStatistic(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (endGame) {
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);
      if (!user) {
        const { wordsCount, rightAnswers, audioCall, localRate } = localState;

        const args = {
          ...localState,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
          localRate: localRate + counter,
          audioCall: {
            wordsCount: audioCall.wordsCount + learnedWords.length,
            rightAnswers: audioCall.rightAnswers + totalTrue,
            series: strike,
          },
        };
        setLocalState(args);
      }

      if (user) {
        const { globalRate, optional } = userStatistic;
        const {
          audioCall,
          savanna,
          sprint,
          newGame,
          localRate,
          rightAnswers,
          wordsCount,
        } = optional;

        const { wordsCountCall, rightAnswersCall } = audioCall;

        const args = {
          globalRate: globalRate + counter,
          ...savanna,
          ...newGame,
          ...sprint,
          wordsCountCall: wordsCountCall + learnedWords.length,
          rightAnswersCall: rightAnswersCall + totalTrue,
          seriesCall: strike,
          localRate: localRate + counter,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
        };

        console.log(args);

        console.log('Edit statistic');
        editGlobalStatistic(editStatistic, args).then((data) => setUserStatistic(data));
      }
    }
  }, [endGame, user]);

  useEffect(() => {
    if (localState) {
      nonAuthUserStatistic('localStatistic', localStatistics, localState);
    }
  }, [localState]);

  const fetchWords = async () => {
    if (user) {
      console.log('previousPageName', previousPageName, typeof previousPageName);
      if (previousPageName === 'complex') {
        fetchWordsFromComplexity(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPageName === 'deleted') {
        fetchWordsFromDeleted(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPageName === 'studied') {
        fetchWordsFromStudied(currentGroup, currentPage, setLoading, setWords);
      } else {
        userFetchAudiocall(currentGroup, currentPage, setLoading, setWords);
      }
    }

    if (!user) {
      fetchCurrentWordsAudiocall(currentGroup, currentPage, setLoading, setWords);
    }
  };

  useEffect(() => {
    fetchWords();
  }, [currentGroup, showGame, currentPage]);

  const onQuitGame = () => {
    setQuitGame(true);
    setPause(true);
    fullScreen.exit();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  useEffect(() => {
    if (learnedWords.length !== 0 && learnedWords.length === words.length) {
      setEndGame(true);
    }
  }, [learnedWords]);

  useEffect(() => {
    if (user && words.length < 5) {
      getBackUpWords(group, page, setLoading, setAdditionalWords);
    }
  }, [words]);

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
              answersArr={answersArr}
              setAnswersArr={setAnswersArr}
              additionalWords={additionalWords}
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

  return {
    group,
    page,
  };
};
