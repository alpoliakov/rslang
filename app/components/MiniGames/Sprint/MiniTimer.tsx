import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const MiniTimer = ({ setShowGame }) => {
  const [timeLeft, setTime] = useState(5);

  useEffect(() => {
    if (timeLeft === 0) {
      setShowGame(true);
      return;
    }

    const timer = setInterval(() => {
      setTime(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return (
    <div className="mini-timer">
      <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
        <CircularProgressLabel>{`0${timeLeft}`.slice(-2)}</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export { MiniTimer };
