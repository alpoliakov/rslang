import { CloseIcon } from '@chakra-ui/icons';
import { IconButton } from '@chakra-ui/react';
import { Audiocall } from 'components/MiniGames/Audiocall/Audiocall';
import { ModalEndGame } from 'components/MiniGames/Modals/ModalEndGame';
import { ModalQuit } from 'components/MiniGames/Modals/ModalQuit';
import Head from 'next/head';
import React, { useState } from 'react';
import { FullScreen, useFullScreenHandle } from 'react-full-screen';
import { BiExitFullscreen, BiFullscreen } from 'react-icons/bi';
import { RiMusic2Fill } from 'react-icons/ri';

export default function AudiocallGamePage() {
  const [quitGame, setQuitGame] = useState(false);
  const [counter, setCounter] = useState(0);
  const [isMusicOn, setMusic] = useState(true);

  const fullScreen = useFullScreenHandle();

  const onQuitGame = () => {
    setQuitGame(true);
    fullScreen.exit();
  };

  const onSwitchMusic = () => {
    setMusic(!isMusicOn);
  };

  return (
    <>
      <Head>
        <title>Audio Call</title>
      </Head>
      <FullScreen handle={fullScreen} className="audiocall-container">
        <IconButton
          className="savanna-music"
          variant="ghost"
          colorScheme={isMusicOn ? 'whiteAlpha' : 'red'}
          aria-label="Switch sound"
          onClick={onSwitchMusic}
          icon={<RiMusic2Fill />}
        />
        <Audiocall counter={counter} setCounter={setCounter} isMusicOn={isMusicOn} />
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
      {quitGame && <ModalQuit setQuitGame={setQuitGame} quitGame={quitGame} />}
      {/* {timeOver && <ModalEndGame timeOver={timeOver} setTimeOver={setTimeOver} counter={counter} />} */}
    </>
  );
}
