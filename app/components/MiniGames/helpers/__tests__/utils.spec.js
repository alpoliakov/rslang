import { dino, dinoEgg, dragon } from '../constants';
import { changePicture, extraPoints } from '../utils';

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

describe('utils', () => {
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
