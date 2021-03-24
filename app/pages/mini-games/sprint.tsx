import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Sprint } from 'components/MiniGames/Sprint/Sprint';
import Head from 'next/head';
import React, { useState } from 'react';
import { Timer } from 'components/MiniGames/Sprint/Timer';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';

export default function SprintGamePage() {
  const [timeOver, setTimeOver] = useState(false);
  const [quitGame, setQuitGame] = useState(false);

  const onQuitGame = () => {
    setQuitGame(true);
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
      <div className="sprint-container">
        <Timer setTimeOver={setTimeOver} timeOver={timeOver} />
        <Sprint />
        <IconButton
          className="sprint-close"
          colorScheme="whiteAlpha"
          aria-label="Close game"
          variant="ghost"
          onClick={onQuitGame}
          icon={<CloseIcon />}
        />
      </div>
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {timeOver && <ModalEndGame />}
    </>
  );
}
