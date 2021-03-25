import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { Sprint } from 'components/MiniGames/Sprint/Sprint';
import { Timer } from 'components/MiniGames/Sprint/Timer';
import Head from 'next/head';
import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';

export default function SprintGamePage() {
  const [timeOver, setTimeOver] = useState(false);
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    fullScreen.exit();
  };

  return (
    <>
      <Head>
        <meta charSet="utf-8" />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
        <link rel="manifest" href="/site.webmanifest" />
      </Head>
      <FullScreen handle={fullScreen} className="sprint-container">
        <Timer setTimeOver={setTimeOver} timeOver={timeOver} />
        <Sprint counter={counter} setCounter={setCounter} />
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
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {timeOver && <ModalEndGame timeOver={timeOver} setTimeOver={setTimeOver} counter={counter} />}
    </>
  );
}
