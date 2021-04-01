import { dino, dinoEgg, dragon } from './constants';
import { initializeApollo } from '../../../lib/apollo';
import { WordsDocument } from '../../../lib/graphql/words.graphql';
import { GiConsoleController } from 'react-icons/gi';

// ------- SPRINT -------
export const changePicture = (num, setPic) => {
  if (num > 4 && num < 9) {
    setPic(dinoEgg);
  } else if (num > 8 && num < 13) {
    setPic(dino);
  } else if (num > 12) {
    setPic(dragon);
  }
};

export const extraPoints = (pic) => {
  let points = 10;
  if (pic === dinoEgg) {
    points = 20;
  } else if (pic === dino) {
    points = 30;
  } else if (pic === dragon) {
    points = 40;
  }
  return points;
};

export const getNextWordSprint = (arr, learnedWords) => {
  const [mainWord] = arr
    .filter((word) => !learnedWords.includes(word))
    .sort(() => Math.random() - 0.5);
  const translation = arr
    .filter(({ word }) => word !== mainWord?.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 1)
    .concat([mainWord])
    .sort(() => Math.random() - 0.5)[0];

  return { mainWord, translation };
};

export const checkAnswerSavanna = () => 

// ------- HEARTS -------

export const brokeHearts = (arr, el, wrongAnswers) => {
  // let position = 0;
  arr.splice(wrongAnswers - 1, 1, el);
  // position++;
};

// ------- SAVANNA -------

// export const mixVariants = (arr) => arr.sort(() => Math.random() - 0.5);

export const getNextWordSavanna = (arr, learnedWords) => {
  const [mainWord] = arr
    .filter((word) => !learnedWords.includes(word))
    .sort(() => Math.random() - 0.5);
  const translations = arr
    .filter(({ word }) => word !== mainWord?.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 3)
    .concat([mainWord])
    .sort(() => Math.random() - 0.5);

  return { mainWord, translations };
};

export const checkAnswerSavanna = (wordToCheck, answer) => {
  return wordToCheck.word === answer.word;
};

export const fetchCurrentWords = async (group, page, setLoading, setWords) => {
  const apollo = initializeApollo();
  setLoading(true);
  const { data } = await apollo.query({
    query: WordsDocument,
    variables: { group, page },
  });

  const words = [...data.words];
  setWords([...data.words]);
  console.log(words);
  if (words) {
    setLoading(false);
  }
  // setCurrentPage(page);
  // console.log('const words', words[0].word, words[0].wordTranslate);
  // return words;
};

// ------- NEWGAME -------
export const checkAnswerNewGame = (wordToCheck, answer) => {
  return wordToCheck.word === answer.toLowerCase().trim();
};

// ------- AUDIOCALL -------
export const getNextWordAudiocall = (arr, learnedWords) => {
  const [mainWord] = arr
    .filter((word) => !learnedWords.includes(word))
    .sort(() => Math.random() - 0.5);
  const translations = arr
    .filter(({ word }) => word !== mainWord?.word)
    .sort(() => Math.random() - 0.5)
    .slice(0, 4)
    .concat([mainWord])
    .sort(() => Math.random() - 0.5);

  return { mainWord, translations };
};
