import { getNextWordAudiocall } from '../utils';

describe('utils, audiocall', () => {
  it('should return array with length 10', () => {
    const data = {
      words: [
        { word: 1 },
        { word: 2 },
        { word: 3 },
        { word: 4 },
        { word: 5 },
        { word: 6 },
        { word: 7 },
        { word: 8 },
        { word: 9 },
        { word: 10 },
        { word: 11 },
        { word: 12 },
        { word: 13 },
        { word: 14 },
        { word: 15 },
        { word: 16 },
        { word: 17 },
        { word: 18 },
        { word: 19 },
        { word: 20 },
      ],
    };
    const words = [...data.words];
    expect(words.splice(9, 10)).toHaveLength(10);
  });
});

describe('utils, audiocall', () => {
  it('translations length should be 5', () => {
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
    expect(getNextWordAudiocall(words, learnedWords).translations).toHaveLength(5);
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
      expect.not.arrayContaining(getNextWordAudiocall(words, learnedWords).translations),
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
    expect(getNextWordAudiocall(words, learnedWords).translations).toContain(
      getNextWordAudiocall(words, learnedWords).mainWord,
    );
  });
});
