import { Text } from '@chakra-ui/react';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const LongTermStatistics = ({ statistics }) => {
  return (
    <>
      <Text>Количество выученных слов по дням</Text>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart data={statistics}>
          <Line type="monotone" dataKey="words" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <Text>Словарный запас</Text>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart data={statistics}>
          <Line type="monotone" dataKey="words" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="day" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
    </>
  );
};

export default LongTermStatistics;