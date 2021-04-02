import { checkAnswerSavanna, getNextWordSavanna } from '../utils';

describe('utils, savanna', () => {
  it('should return "true"', () => {
    const wordToCheck = { word: 'cat', wordTranslate: 'кот' };
    const answer = { word: 'cat', wordTranslate: 'кот' };
    expect(checkAnswerSavanna(wordToCheck, answer)).toBe(true);
  });

  it('should return "true"', () => {
    const wordToCheck = { word: 'cat', wordTranslate: 'кот' };
    const answer = { word: 'cap', wordTranslate: 'кепка' };
    expect(checkAnswerSavanna(wordToCheck, answer)).toBe(false);
  });
});

// export const getNextWordSavanna = (arr, learnedWords) => {
//     const [mainWord] = arr
//       .filter((word) => !learnedWords.includes(word))
//       .sort(() => Math.random() - 0.5);
//     const translations = arr
//       .filter(({ word }) => word !== mainWord?.word)
//       .sort(() => Math.random() - 0.5)
//       .slice(0, 3)
//       .concat([mainWord])
//       .sort(() => Math.random() - 0.5);

//     return { mainWord, translations };
//   };

describe('utils, savanna', () => {
  it('translations length should be 4', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordSavanna(arr, learnedWords)).toHaveLength(4);
  });

  it('should not contain elements from learnedWords', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordSavanna(arr, learnedWords));
  });

  it('translations should contain mainWord', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordSavanna(arr, learnedWords));
  });
});
