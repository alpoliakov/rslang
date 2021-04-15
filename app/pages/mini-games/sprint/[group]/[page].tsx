import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import {
  editGlobalStatistic,
  fetchCurrentWords,
  fetchUserStatistic,
  fetchWordsFromComplexity,
  fetchWordsFromDeleted,
  fetchWordsFromStudied,
  getBackUpWords,
  userFetch,
} from 'components/MiniGames/helpers/fetchWords';
import { getStrike } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { Sprint } from 'components/MiniGames/Sprint/Sprint';
import { ModalSprint } from 'components/MiniGames/Sprint/SprintModal';
import { Timer } from 'components/MiniGames/Sprint/Timer';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

import { useAppContext } from '../../../../context/ContextApp';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useEditStatisticMutation } from '../../../../lib/graphql/editStatistic.graphql';
import { useAuth } from '../../../../lib/useAuth';
import { nonAuthUserStatistic } from '../../../../utils/processingUserLocalStatistic';

export default function SprintGamePage({ group, page }) {
  const [timeOver, setTimeOver] = useState(false);
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentGroup, setGroup] = useState(group);
  const { user } = useAuth();
  const [isPaused, setPause] = useState(false);
  const [learnedWords, setLearnedWord] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);
  const [additionalWords, setAdditionalWords] = useState([]);
  const [userStatistic, setUserStatistic] = useState(null);

  const [localState, setLocalState] = useState(null);

  const fullScreen = useFullScreenHandle();
  const { previousPageName } = useAppContext();
  const [editStatistic] = useEditStatisticMutation();

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
    if (timeOver) {
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);
      if (!user) {
        const { wordsCount, rightAnswers, sprint, localRate } = localState;

        const args = {
          ...localState,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
          localRate: localRate + counter,
          sprint: {
            wordsCount: sprint.wordsCount + learnedWords.length,
            rightAnswers: sprint.rightAnswers + totalTrue,
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

        const { wordsCountSprint, rightAnswersSprint } = sprint;

        const args = {
          globalRate: globalRate + counter,
          ...savanna,
          ...audioCall,
          ...newGame,
          wordsCountSprint: wordsCountSprint + learnedWords.length,
          rightAnswersSprint: rightAnswersSprint + totalTrue,
          seriesSprint: strike,
          localRate: localRate + counter,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
        };

        editGlobalStatistic(editStatistic, args).then((data) => setUserStatistic(data));
      }
    }
  }, [timeOver]);

  useEffect(() => {
    if (localState) {
      nonAuthUserStatistic('localStatistic', localStatistics, localState);
    }
  }, [localState]);

  const fetchWords = async () => {
    if (user) {
      if (previousPageName === 'complex') {
        fetchWordsFromComplexity(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPageName === 'deleted') {
        fetchWordsFromDeleted(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPageName === 'studied') {
        fetchWordsFromStudied(currentGroup, currentPage, setLoading, setWords);
      } else {
        userFetch(currentGroup, currentPage, setLoading, setWords);
      }
    }

    if (!user) {
      fetchCurrentWords(currentGroup, currentPage, setLoading, setWords);
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

  useEffect(() => {
    if (user && words.length < 2) {
      getBackUpWords(group, page, setLoading, setAdditionalWords);
    }
  }, [words]);

  return (
    <>
      <Head>
        <title>Спринт</title>
      </Head>
      {showGame ? (
        <FullScreen handle={fullScreen} className="sprint-container">
          <Timer setTimeOver={setTimeOver} timeOver={timeOver} isPaused={isPaused} />
          <Sprint
            counter={counter}
            setCounter={setCounter}
            words={words}
            user={user}
            timeOver={timeOver}
            setTimeOver={setTimeOver}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            chooseLevel={chooseLevel}
            answersArr={answersArr}
            setAnswersArr={setAnswersArr}
            learnedWords={learnedWords}
            setLearnedWord={setLearnedWord}
            loading={loading}
            additionalWords={additionalWords}
          />
          <div className="sprint-close-full">
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
        <ModalSprint
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
      {timeOver && (
        <ModalEndGame counter={counter} learnedWords={learnedWords} answersArr={answersArr} />
      )}
    </>
  );
}

SprintGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  return {
    group,
    page,
  };
};
