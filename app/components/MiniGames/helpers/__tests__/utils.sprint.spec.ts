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
  it('translations length should be 2', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordSprint(arr, learnedWords)).toHaveLength(1);
  });

  it('should not contain elements from learnedWords', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordSprint(arr, learnedWords));
  });
});
