import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React, { useEffect, useState } from 'react';

const Timer = ({ setTimeOver, timeOver, isPaused }) => {
  const [timeLeft, setTime] = useState(59);

  useEffect(() => {
    let timer;
    if (timeLeft === 0) {
      setTimeOver(!timeOver);
      return;
    }
    if (!isPaused) {
      timer = setInterval(() => {
        setTime(timeLeft - 1);
      }, 1000);
    } else if (isPaused) {
      clearInterval(timer);
    }
    return () => clearInterval(timer);
  }, [timeLeft, isPaused]);

  return (
    <div className="timer">
      <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="70px">
        <CircularProgressLabel>{`0${timeLeft}`.slice(-2)}</CircularProgressLabel>
      </CircularProgress>
    </div>
  );
};

export { Timer };
