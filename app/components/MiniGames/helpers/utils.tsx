import { dino, dinoEgg, dragon, egg } from './constants';

// ------- SPRINT -------
export const changePicture = (num, setPic) => {
  if (num >= 5 && num < 9) {
    setPic(dinoEgg);
  } else if (num > 8 && num < 13) {
    setPic(dino);
  } else if (num > 12) {
    setPic(dragon);
  } else if (num < 5) {
    setPic(egg);
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

export const checkAnswerSprint = (answer, mainWord, translation) => {
  return answer === (mainWord.word === translation.word);
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

// ------- NEWGAME -------
export const checkAnswerNewGame = (wordToCheck, answer, user) => {
  return (
    (user ? wordToCheck.word.word : wordToCheck.word).toLowerCase().trim() ===
    answer.toLowerCase().trim()
  );
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

export const getStrike = (arr) => {
  let streak = 0;
  let maxStreak = 0;

  for (let i = 0; i <= arr.length; i++) {
    if (arr[i] === true) {
      streak += 1;
    } else {
      if (streak > maxStreak) {
        maxStreak = streak;
        streak = 0;
      }
      streak = 0;
    }
  }
  return maxStreak;
};
