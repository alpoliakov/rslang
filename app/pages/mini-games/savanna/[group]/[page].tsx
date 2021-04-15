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
import { Savanna } from 'components/MiniGames/Savanna/Savanna';
import { ModalSavanna } from 'components/MiniGames/Savanna/SavannaModal';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { RiMusic2Fill } from 'react-icons/ri';

import { useAppContext } from '../../../../context/ContextApp';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useEditStatisticMutation } from '../../../../lib/graphql/editStatistic.graphql';
import { useAuth } from '../../../../lib/useAuth';
import { nonAuthUserStatistic } from '../../../../utils/processingUserLocalStatistic';

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
  const [additionalWords, setAdditionalWords] = useState([]);
  const [userStatistic, setUserStatistic] = useState(null);

  const fullScreen = useFullScreenHandle();

  const [localState, setLocalState] = useState(null);
  const [editStatistic] = useEditStatisticMutation();
  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  useEffect(() => setLocalState(nonAuthUserStatistic('localStatistic', localStatistics)), []);

  const {
    data: { localStatistics },
  } = useQuery(GET_LOCAL_STATISTIC);

  const { previousPageName } = useAppContext();

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
        const { wordsCount, rightAnswers, savanna, localRate } = localState;

        const args = {
          ...localState,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
          localRate: localRate + counter,
          savanna: {
            wordsCount: savanna.wordsCount + learnedWords.length,
            rightAnswers: savanna.rightAnswers + totalTrue,
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

        const { wordsCountSavanna, rightAnswersSavanna } = savanna;

        const args = {
          globalRate: globalRate + counter,
          ...newGame,
          ...audioCall,
          ...sprint,
          wordsCountSavanna: wordsCountSavanna + learnedWords.length,
          rightAnswersSavanna: rightAnswersSavanna + totalTrue,
          seriesNewGame: strike,
          localRate: localRate + counter,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
        };

        console.log(args);

        console.log('Edit statistic');
        editGlobalStatistic(editStatistic, args).then((data) => setUserStatistic(data));
      }
    }
  }, [endGame]);

  useEffect(() => {
    if (localState) {
      nonAuthUserStatistic('localStatistic', localStatistics, localState);
    }
  }, [localState]);

  const fetchWords = async (previousPage) => {
    if (user) {
      if (previousPage === 'complex') {
        fetchWordsFromComplexity(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPage === 'deleted') {
        fetchWordsFromDeleted(currentGroup, currentPage, setLoading, setWords);
      } else if (previousPage === 'studied') {
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
    fetchWords(previousPageName);
  }, [currentGroup, showGame, currentPage, setGroup]);

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
    if (learnedWords.length !== 0 && learnedWords.length === words.length) {
      setEndGame(true);
    }
    if (endGame) setPause(true);
  }, [lives, endGame, learnedWords]);

  useEffect(() => {
    if (user && words.length < 5) {
      getBackUpWords(group, page, setLoading, setAdditionalWords);
    }
  }, [words]);

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
              additionalWords={additionalWords}
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
