import { Select } from '@chakra-ui/react';
import React from 'react';

const ChooseLevelModal = () => {
  return (
    <div className="chooseModal-select">
      <Select placeholder="Выбери уровень сложности">
        <option value="option1">1 уровень</option>
        <option value="option2">2 уровень</option>
        <option value="option3">3 уровень</option>
        <option value="option1">4 уровень</option>
        <option value="option2">5 уровень</option>
        <option value="option3">6 уровень</option>
      </Select>
    </div>
  );
};

export { ChooseLevelModal };
