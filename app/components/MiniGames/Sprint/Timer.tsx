import React, { useEffect, useState } from 'react';

const Timer = () => {
  const [timeLeft, setTime] = useState(59);

  useEffect(() => {
    if (timeLeft === 0) {
      // setTimeOver(!timeOver);
      // setTimer(!showTimer);
      return;
    }

    const timer = setInterval(() => {
      setTime(timeLeft - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft]);

  return <div className="timer">{`0${timeLeft}`.slice(-2)}</div>;
};

export { Timer };
