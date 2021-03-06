import { checkAnswerNewGame } from '../utils';
describe('utils, newGame', () => {
  it('should return true', () => {
    const wordToCheck = { word: 'apple', wordTranslate: 'яблоко' };
    const answer = ' AppLe  ';
    expect(checkAnswerNewGame(wordToCheck, answer, false)).toBe(true);
  });

  it('should return false', () => {
    const wordToCheck = { word: 'apple', wordTranslate: 'яблоко' };
    const answer = 'яблоко';
    expect(checkAnswerNewGame(wordToCheck, answer, false)).toBe(false);
  });

  it('should return false', () => {
    const wordToCheck = { word: 'apple', wordTranslate: 'яблоко' };
    const answer = 'car';
    expect(checkAnswerNewGame(wordToCheck, answer, false)).toBe(false);
  });
});
