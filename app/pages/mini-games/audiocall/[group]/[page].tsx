import { useQuery } from '@apollo/client';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Progress } from '@chakra-ui/react';
import { Audiocall } from 'components/MiniGames/Audiocall/Audiocall';
import { ModalAudiocall } from 'components/MiniGames/Audiocall/AudiocallModal';
import {
  editGlobalStatistic,
  fetchCurrentWordsAudiocall,
  fetchUserStatistic,
  fetchWordsFromComplexity,
  fetchWordsFromDeleted,
  fetchWordsFromStudied,
  getBackUpWords,
  userFetchAudiocall,
} from 'components/MiniGames/helpers/fetchWords';
import { getStrike } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { useStatisticQuery } from 'lib/graphql/statistic.graphql';
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { RiMusic2Fill } from 'react-icons/ri';

import { useAppContext } from '../../../../context/ContextApp';
import { GET_LOCAL_STATISTIC } from '../../../../context/statistic/operations/queries/getLocalStatistic';
import { useEditStatisticMutation } from '../../../../lib/graphql/editStatistic.graphql';
import { useAuth } from '../../../../lib/useAuth';
import { nonAuthUserStatistic } from '../../../../utils/processingUserLocalStatistic';

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

  const [editStatistic] = useEditStatisticMutation();
  const { previousPageName } = useAppContext();

  // const {
  //   // data: { statistic },
  //   data,
  // } = useStatisticQuery();
  // console.log(data?.statistic, 'data from useStatisticQuery (global)');

  // useEffect(() => console.log('fetchUserStatistic', fetchUserStatistic()), []);

  const { data } = useQuery(GET_LOCAL_STATISTIC);

  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  useEffect(() => setLocalState(nonAuthUserStatistic('localStatistic', data?.localStatistics)), [
    data,
  ]);

  useEffect(() => {
    if (user) {
      fetchUserStatistic().then((data) => {
        setUserStatistic(data);
      });
    }
  }, [user]);

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(Math.floor(Math.random() * 28));
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

      if (user && userStatistic) {
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
          ...sprint,
          ...newGame,
          wordsCountCall: wordsCountCall + learnedWords.length,
          rightAnswersCall: rightAnswersCall + totalTrue,
          seriesCall: strike,
          localRate: localRate + counter,
          wordsCount: wordsCount + learnedWords.length,
          rightAnswers: rightAnswers + totalTrue,
        };

        // console.log(args);
        // setUserStatistic(args);
        editGlobalStatistic(editStatistic, args).then((data) => setUserStatistic(data));
      }
    }
  }, [endGame]);

  // useEffect(() => console.log('userStatistic ', userStatistic), [userStatistic]);

  useEffect(() => {
    if (localState) {
      nonAuthUserStatistic('localStatistic', data?.localStatistics, localState);
    }
  }, [localState]);

  // const editGlobalStatistic = async (editStatistic,userStatistic) => {
  //   try {
  //     const {data} = await editStatistic({
  //       variables: { input: userStatistic }
  //     })
  //   }catch (err) {
  //     console.error(err.message);
  //   }
  // }

  const fetchWords = async () => {
    if (user) {
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
    if (learnedWords.length !== 0 && learnedWords.length === words.length) {
      setEndGame(true);
    }
  }, [learnedWords]);

  useEffect(() => {
    if (words.length < 5) {
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
