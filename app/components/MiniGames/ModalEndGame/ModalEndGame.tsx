import { CircularProgress, CircularProgressLabel } from '@chakra-ui/react';
import React from 'react';

const ModalEndGame = () => {
  return (
    <div className="modal-container">
      <div className="modal">
        <div className="modalEnd-result">
          Поздравляю! Твой результат <br />
          <CircularProgress isIndeterminate value={100} color="pink" thickness="2px" size="200px">
            <CircularProgressLabel size="40px">60</CircularProgressLabel>
          </CircularProgress>
          <br /> баллов!
        </div>
      </div>
    </div>
  );
};

export { ModalEndGame };
