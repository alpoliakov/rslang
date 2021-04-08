import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { fetchCurrentWords, userFetch } from 'components/MiniGames/helpers/fetchWords';
import { getStrike } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { NewGame } from 'components/MiniGames/NewGame/NewGame';
import { ModalNewGame } from 'components/MiniGames/NewGame/NewGameModal';
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

export default function NewGamePage({ group, page }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [lives, setLives] = useState(Array(5).fill(true));
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [endGame, setEndGame] = useState(false);
  const [currentGroup, setGroup] = useState(group);
  const [currentPage, setCurrentPage] = useState(page);
  const [isPaused, setPause] = useState(false);
  const { user } = useAuth();
  const [learnedWords, setLearnedWord] = useState([]);
  const [answersArr, setAnswersArr] = useState([]);

  const { data } = useQuery(GET_LOCAL_STATISTIC);

  useEffect(() => {
    if (endGame) {
      const { wordsCount, rightAnswers, newGame } = data.localStatistics;
      const totalTrue = answersArr.filter((answer) => answer === true).length;
      const strike = getStrike(answersArr);

      const args = {
        ...data?.localStatistics,
        wordsCount: wordsCount + learnedWords.length,
        rightAnswers: rightAnswers + totalTrue,
        newGame: {
          wordsCount: newGame.wordsCount + learnedWords.length,
          rightAnswers: newGame.rightAnswers + totalTrue,
          series: newGame.series + strike,
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
      setCurrentPage(0);
    }
  }, []);

  useEffect(() => {
    fetchWords();
  }, [currentGroup, showGame, currentPage]);

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    setPause(true);
    fullScreen.exit();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  useEffect(() => !lives.includes(true) && setEndGame(true), [lives]);

  return (
    <>
      <Head>
        <title>Написание</title>
      </Head>
      {showGame ? (
        <FullScreen handle={fullScreen} className="newgame-container">
          <IconButton
            className="savanna-music"
            variant="ghost"
            colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
            aria-label="Switch sound"
            onClick={onSwitchMusic}
            icon={<RiMusic2Fill />}
          />
          {!loading && (
            <NewGame
              counter={counter}
              setCounter={setCounter}
              isMusicOn={isMusicOn}
              words={words}
              setLives={setLives}
              setEndGame={setEndGame}
              endGame={endGame}
              user={user}
              fetchWords={fetchWords}
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
        <ModalNewGame
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

NewGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  console.log(group);

  return {
    group,
    page,
  };
};
