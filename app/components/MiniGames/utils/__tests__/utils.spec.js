import { extraPoints, dino, dinoEgg, dragon } from '../utils';

describe('utils', () => {
  it.each`
    pic        | points
    ${dinoEgg} | ${20}
    ${dino}    | ${30}
    ${dragon}  | ${40}
  `('should return $points points for picture', ({ pic, points }) => {
    expect(extraPoints(pic)).toBe(points);
  });
});
