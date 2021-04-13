import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { fetchCurrentWords, userFetch } from 'components/MiniGames/helpers/fetchWords';
import { getStrike } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { Savanna } from 'components/MiniGames/Savanna/Savanna';
import { ModalSavanna } from 'components/MiniGames/Savanna/SavannaModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { RiMusic2Fill } from 'react-icons/ri';

import EditLocalStatistics from '../../../../context/statistic/operations/mutations/editStatistics';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useAuth } from '../../../../lib/useAuth';

export default function SavannaGamePage({ group, page }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [lives, setLives] = useState(Array(5).fill(true));
  const [endGame, setEndGame] = useState(false);
  const [currentGroup, setGroup] = useState(group);
  const [currentPage, setCurrentPage] = useState(page);
  const [isPaused, setPause] = useState(false);
  const { user } = useAuth();
  const [learnedWords, setLearnedWord] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);

  const { data } = useQuery(GET_LOCAL_STATISTIC);
  console.log(data?.localStatistics);

  useEffect(() => {
    if (endGame) {
      const { wordsCount, rightAnswers, savanna } = data.localStatistics;
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);

      const args = {
        ...data?.localStatistics,
        wordsCount: wordsCount + learnedWords.length,
        rightAnswers: rightAnswers + totalTrue,
        savanna: {
          wordsCount: savanna.wordsCount + learnedWords.length,
          rightAnswers: savanna.rightAnswers + totalTrue,
          series: savanna.series + strike,
        },
      };
      EditLocalStatistics(args);
      console.log(data?.localStatistics);
    }
  }, [endGame]);

  const fetchWords = async () => {
    if (user) {
      userFetch(currentGroup, currentPage, setLoading, setWords);
    }

    if (!user) {
      fetchCurrentWords(currentGroup, currentPage, setLoading, setWords);
    }
  };
  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(Math.floor(Math.random() * 28));
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [currentGroup, showGame, currentPage, setGroup]);

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
    !lives.includes(true) && setEndGame(true);
    if (endGame) setPause(true);
  }, [lives, endGame]);

  return (
    <>
      <Head>
        <title>Саванна</title>
      </Head>
      {showGame ? (
        <FullScreen handle={fullScreen} className="savanna-container">
          <IconButton
            className="savanna-music"
            variant="ghost"
            colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
            aria-label="Switch sound"
            onClick={onSwitchMusic}
            icon={<RiMusic2Fill />}
          />
          {!loading && (
            <Savanna
              counter={counter}
              setCounter={setCounter}
              isMusicOn={isMusicOn}
              words={words}
              setLives={setLives}
              setEndGame={setEndGame}
              endGame={endGame}
              user={user}
              isPaused={isPaused}
              answersArr={answersArr}
              setAnswersArr={setAnswersArr}
              learnedWords={learnedWords}
              setLearnedWord={setLearnedWord}
            />
          )}
          <div className="progress-hearts">
            {lives.map((isAlive, key) =>
              isAlive ? (
                <FaHeart key={key} color="red" />
              ) : (
                <FaHeartBroken key={key} color="gray" />
              ),
            )}
          </div>
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
        <ModalSavanna
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

SavannaGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  return {
    group,
    page,
  };
};
