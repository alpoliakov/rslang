import { Select } from '@chakra-ui/react';
import React from 'react';

const ChooseLevelModal = ({ level, setLevel }) => {
  const handleChange = (e) => setLevel(e.target.value);
  return (
    <div className="chooseModal-select">
      <Select value={level} placeholder="Выбери уровень сложности" onChange={handleChange}>
        <option value="0">1 уровень</option>
        <option value="1">2 уровень</option>
        <option value="2">3 уровень</option>
        <option value="3">4 уровень</option>
        <option value="4">5 уровень</option>
        <option value="5">6 уровень</option>
      </Select>
    </div>
  );
};

export { ChooseLevelModal };
