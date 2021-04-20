import { Heading, Text } from '@chakra-ui/react';
import React from 'react';
import { CartesianGrid, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';

const formatedDate = (date) => {
  const dateItem = new Date(date);
  return new Intl.DateTimeFormat().format(dateItem);
};

const LongTermStatistics = ({ statistics }) => {
  if (statistics.length === 0) {
    return <Heading>Недостаточно данных для статистики</Heading>;
  }

  const formatedStat = statistics.map(({ countWords, date }) => {
    return {
      countWords,
      date: formatedDate(date),
    };
  });

  let wordsCount = 0;
  const growDictionary = new Array(statistics.length).fill('').map((item, i) => {
    wordsCount += statistics[i].countWords;
    return {
      day: i + 1,
      words: wordsCount,
    };
  });

  return (
    <>
      <Text>Количество выученных слов по дням</Text>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart data={formatedStat}>
          <Line type="monotone" dataKey="countWords" stroke="#8884d8" />
          <CartesianGrid stroke="#ccc" />
          <XAxis dataKey="date" />
          <YAxis />
        </LineChart>
      </ResponsiveContainer>
      <Text>Словарный запас</Text>
      <ResponsiveContainer width="99%" height={300}>
        <LineChart data={growDictionary}>
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
