import { CloseIcon } from '@chakra-ui/icons';
import { FaHeart, FaHeartBroken } from 'react-icons/fa';
import { IconButton } from '@chakra-ui/react';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { NewGame } from 'components/MiniGames/NewGame/NewGame';
import { ModalNewGame } from 'components/MiniGames/NewGame/NewGameModal';
import Head from 'next/head';
import React, { useEffect, useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { RiMusic2Fill } from 'react-icons/ri';
import { fetchCurrentWords } from 'components/MiniGames/helpers/utils';

export default function NewGamePage({ page, group }) {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);
  const [showGame, setShowGame] = useState(false);
  const [lives, setLives] = useState(Array(5).fill(true));
  const [loading, setLoading] = useState(true);
  const [words, setWords] = useState([]);
  const [endGame, setEndGame] = useState(false);

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
        <ModalNewGame setShowGame={setShowGame} showGame={showGame} />
      )}
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {/* {timeOver && <ModalEndGame timeOver={timeOver} setTimeOver={setTimeOver} counter={counter} />} */}
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
