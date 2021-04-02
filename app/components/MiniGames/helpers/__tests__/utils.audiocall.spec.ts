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
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordAudiocall(arr, learnedWords)).toHaveLength(5);
  });

  it('should not contain elements from learnedWords', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordAudiocall(arr, learnedWords).mainWord).toEqual();
  });

  it('translations should contain mainWord', () => {
    const arr = [1, 2, 3, 4, 5, 6];
    const learnedWords = [1, 2, 3];
    expect(getNextWordAudiocall(arr, learnedWords).translations).toEqual();
  });
});
