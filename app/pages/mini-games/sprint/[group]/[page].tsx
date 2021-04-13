import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { fetchCurrentWords, userFetch } from 'components/MiniGames/helpers/fetchWords';
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

import EditLocalStatistics from '../../../../context/statistic/operations/mutations/editStatistics';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useAuth } from '../../../../lib/useAuth';

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

  const fullScreen = useFullScreenHandle();

  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  const { data } = useQuery(GET_LOCAL_STATISTIC);

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(Math.floor(Math.random() * 28));
    }
  }, []);

  useEffect(() => {
    if (timeOver) {
      const { wordsCount, rightAnswers, sprint } = data.localStatistics;
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);

      const args = {
        ...data?.localStatistics,
        wordsCount: wordsCount + learnedWords.length,
        rightAnswers: rightAnswers + totalTrue,
        sprint: {
          wordsCount: sprint.wordsCount + learnedWords.length,
          rightAnswers: sprint.rightAnswers + totalTrue,
          series: sprint.series + strike,
        },
      };
      EditLocalStatistics(args);
      console.log(data?.localStatistics);
    }
  }, [timeOver]);

  const fetchWords = async () => {
    if (user) {
      userFetch(currentGroup, currentPage, setLoading, setWords);
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
