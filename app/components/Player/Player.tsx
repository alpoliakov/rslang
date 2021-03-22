import React from 'react';
import ReactPlayer from 'react-player/youtube';

const Player = ({ videoUrl }) => {
  return (
      <ReactPlayer
        height="100%"
        width="100%"
        url={videoUrl}
        controls
        light
      />
  );
}

export default Player;
