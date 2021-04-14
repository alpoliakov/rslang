import { Heading, ListItem, Text, UnorderedList } from '@chakra-ui/layout';
import React from 'react';

const Promo = () => {
  return (
    <>
      <Heading as="h3" textAlign="center" mb={3}>
        Hello friend! (Привет друг!)
      </Heading>
      <Text fontSize={[15, 18, 25]}>
        Мы знаем почему ты оказался здесь, у тебя такие же проблемы как были у нас:
      </Text>
      <UnorderedList fontSize={[15, 18, 25]}>
        <ListItem>Страшно ехать заграницу</ListItem>
        <ListItem>Не дают повышение на работе</ListItem>
        <ListItem>Не можешь сказать иностранцу, как пройти в библиотеку</ListItem>
        <ListItem>(Подставьте свой вариант)</ListItem>
      </UnorderedList>
      <Text fontSize={[15, 18, 25]} mb={3}>
        Чтобы решить эти проблемы, мы и придумали данный сайт.
      </Text>
      <Text fontSize={[15, 18, 25]} mb={5}>
        У нас есть готовые наборы слов с разным уровнем сложности. Чтобы начать тренировать
        интересующий набор слов, выбери игру и начни изучение. После игры слова окажутся в твоем
        словаре. В словаре есть статистика изучения слов. Так же на сайте есть статистика за
        короткий период и за все время обучения.
      </Text>
      <Text fontSize={[15, 18, 25]}>
        <b>Главное:</b> лучше занимайся каждый день по чуть-чуть, чем раз в неделю
      </Text>
    </>
  );
};

export default Promo;
