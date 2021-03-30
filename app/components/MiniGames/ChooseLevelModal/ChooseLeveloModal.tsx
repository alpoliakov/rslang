import { Select } from '@chakra-ui/react';
import React from 'react';

const ChooseLevelModal = ({ level, setLevel }) => {
  const handleChange = (e) => setLevel(e.target.value);
  console.log(level);
  return (
    <div className="chooseModal-select">
      <Select value={level} placeholder="Выбери уровень сложности" onChange={handleChange}>
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
