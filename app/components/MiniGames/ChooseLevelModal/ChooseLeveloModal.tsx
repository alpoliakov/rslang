import { Select } from '@chakra-ui/react';
import React from 'react';

const ChooseLevelModal = ({ group, setGroup }) => {
  const handleChange = (e) => setGroup(e.target.value);
  return (
    <div className="chooseModal-select">
      <Select value={group} placeholder="Выбери уровень сложности" onChange={handleChange}>
        <option value="option1">1 уровень</option>
        <option value="option2">2 уровень</option>
        <option value="option3">3 уровень</option>
        <option value="option4">4 уровень</option>
        <option value="option5">5 уровень</option>
        <option value="option6">6 уровень</option>
      </Select>
    </div>
  );
};

export { ChooseLevelModal };
