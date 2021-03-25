import React from 'react';
import { AiFillHeart } from 'react-icons/ai';

const ProgressHearts = () => {
  return (
    <div className="progress-hearts">
      <AiFillHeart
        color="red"
        height="20px"
        width="20px"
        // color={isCorrect ? 'red' : 'transparent'}
      />
    </div>
  );
};

export { ProgressHearts };
