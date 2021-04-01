import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { fetchCurrentWords } from 'components/MiniGames/helpers/utils';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { Savanna } from 'components/MiniGames/Savanna/Savanna';
import { ModalSavanna } from 'components/MiniGames/Savanna/SavannaModal';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { RiMusic2Fill } from 'react-icons/ri';

export default function SavannaGamePage({ page, group, passHref }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [lives, setLives] = useState(Array(5).fill(true));
  const [endGame, setEndGame] = useState(false);
  const [currentPage, setCurrentPage] = useState(null);
  const [level, setLevel] = useState('');
  // const [group, setGroup] = useState('');
  // const {events, query} = router;
  console.log(passHref, 'passHref');

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    fullScreen.exit();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  useEffect(() => {
    fetchCurrentWords(group, page, setLoading, setWords);
  }, []);

  useEffect(() => !lives.includes(true) && setEndGame(true), [lives]);

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
              // group={group}
              // page={page}
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
          // group={group}
          // setGroup={setGroup}
        />
      )}
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {endGame && (
        <ModalEndGame
          // timeOver={timeOver} setTimeOver={setTimeOver}
          counter={counter}
        />
      )}
    </>
  );
}

SavannaGamePage.getInitialProps = async ({ query }) => {
  const group = +query.group;
  const page = +query.page || 0;

  console.log(group);

  return {
    group,
    page,
  };
};
