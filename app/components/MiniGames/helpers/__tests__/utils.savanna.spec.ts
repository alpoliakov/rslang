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

describe('utils, savanna', () => {
  it('translations length should be 4', () => {
    const words = [
      { word: 'test1', wordTranslation: 'тест1' },
      { word: 'test2', wordTranslations: 'тест2' },
      { word: 'test3', wordTranslations: 'тест3' },
      { word: 'test4', wordTranslations: 'тест4' },
      { word: 'test5', wordTranslations: 'тест5' },
      { word: 'test6', wordTranslations: 'тест6' },
      { word: 'test7', wordTranslations: 'тест7' },
      { word: 'test8', wordTranslations: 'тест8' },
      { word: 'test9', wordTranslations: 'тест9' },
      { word: 'test10', wordTranslations: 'тест10' },
    ];
    const learnedWords = words.slice(0, 3);
    expect(getNextWordSavanna(words, learnedWords).translations).toHaveLength(4);
  });

  it('should not contain elements from learnedWords', () => {
    const words = [
      { word: 'test1', wordTranslation: 'тест1' },
      { word: 'test2', wordTranslations: 'тест2' },
      { word: 'test3', wordTranslations: 'тест3' },
      { word: 'test4', wordTranslations: 'тест4' },
      { word: 'test5', wordTranslations: 'тест5' },
      { word: 'test6', wordTranslations: 'тест6' },
      { word: 'test7', wordTranslations: 'тест7' },
      { word: 'test8', wordTranslations: 'тест8' },
      { word: 'test9', wordTranslations: 'тест9' },
      { word: 'test10', wordTranslations: 'тест10' },
    ];
    const learnedWords = words.slice(0, 3);
    expect(learnedWords).toEqual(
      expect.not.arrayContaining(getNextWordSavanna(words, learnedWords).translations),
    );
  });

  it('translations should contain mainWord', () => {
    const words = [
      { word: 'test1', wordTranslation: 'тест1' },
      { word: 'test2', wordTranslations: 'тест2' },
      { word: 'test3', wordTranslations: 'тест3' },
      { word: 'test4', wordTranslations: 'тест4' },
      { word: 'test5', wordTranslations: 'тест5' },
      { word: 'test6', wordTranslations: 'тест6' },
      { word: 'test7', wordTranslations: 'тест7' },
      { word: 'test8', wordTranslations: 'тест8' },
      { word: 'test9', wordTranslations: 'тест9' },
      { word: 'test10', wordTranslations: 'тест10' },
    ];
    const learnedWords = words.slice(0, 3);
    expect(getNextWordSavanna(words, learnedWords).translations).toContain(
      getNextWordSavanna(words, learnedWords).mainWord,
    );
  });
});
