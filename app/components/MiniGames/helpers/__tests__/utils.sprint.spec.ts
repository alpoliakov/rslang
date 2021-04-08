import { dino, dinoEgg, dragon } from '../constants';
import { changePicture, checkAnswerSprint, extraPoints, getNextWordSprint } from '../utils';

describe('utils, sprint', () => {
  it.each`
    pic        | points
    ${dinoEgg} | ${20}
    ${dino}    | ${30}
    ${dragon}  | ${40}
  `('should return $points points for picture', ({ pic, points }) => {
    expect(extraPoints(pic)).toBe(points);
  });
});

describe('utils, sprint', () => {
  it.each`
    pic        | num
    ${dinoEgg} | ${5}
    ${dinoEgg} | ${8}
    ${dino}    | ${9}
    ${dino}    | ${12}
    ${dragon}  | ${13}
  `('setPic should be called with right picture for $answers answers', ({ pic, num }) => {
    const setPic = jest.fn();
    changePicture(num, setPic);
    expect(setPic).toHaveBeenCalledWith(pic);
  });
});

describe('utils, sprint', () => {
  it('should return true', () => {
    const mainWord = { word: 'cat', wordTranslate: 'кошка' };
    const translation = { word: 'cat', wordTranslate: 'кошка' };
    expect(checkAnswerSprint(true, mainWord, translation)).toBe(true);
  });

  it('should return false', () => {
    const mainWord = { word: 'cat', wordTranslate: 'кошка' };
    const translation = { word: 'cat', wordTranslate: 'кошка' };
    expect(checkAnswerSprint(false, mainWord, translation)).toBe(false);
  });

  it('should return false', () => {
    const mainWord = { word: 'cat', wordTranslate: 'кошка' };
    const translation = { word: 'car', wordTranslate: 'машина' };
    expect(checkAnswerSprint(true, mainWord, translation)).toBe(false);
  });
});

describe('utils, sprint', () => {
  it('translations length should be 1', () => {
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
    expect(getNextWordSprint(words, learnedWords).translation).toHaveProperty('word');
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
    expect(learnedWords).not.toContainEqual(getNextWordSprint(words, learnedWords).translation);
  });
});
