import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { fetchCurrentWords } from 'components/MiniGames/helpers/fetchWords';
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

export default function SprintGamePage({ group, page }) {
  const [timeOver, setTimeOver] = useState(false);
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [currentPage, setCurrentPage] = useState(page);
  const [currentGroup, setGroup] = useState(group);

  const { query } = useRouter();
  const chooseLevel = query.page === '0$menu=true';

  useEffect(() => {
    if (chooseLevel) {
      setCurrentPage(0);
    }
  }, []);

  useEffect(() => {
    fetchCurrentWords(currentGroup, currentPage, setLoading, setWords);
  }, [currentGroup, showGame]);

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    fullScreen.exit();
  };

  return (
    <>
      <Head>
        <title>Спринт</title>
      </Head>
      {showGame ? (
        <FullScreen handle={fullScreen} className="sprint-container">
          <Timer setTimeOver={setTimeOver} timeOver={timeOver} />
          {!loading && <Sprint counter={counter} setCounter={setCounter} words={words} />}
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
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {timeOver && (
        <ModalEndGame
          // timeOver={timeOver} setTimeOver={setTimeOver}
          counter={counter}
        />
      )}
    </>
  );
}

SprintGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  console.log(group);

  return {
    group,
    page,
  };
};