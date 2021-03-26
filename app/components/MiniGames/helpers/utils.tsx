import { dino, dinoEgg, dragon } from './constants';

// ------- SAVANNA -------
export const changePicture = (num, setPic) => {
  if (num > 4 && num < 9) {
    setPic(dinoEgg);
  } else if (num > 8 && num < 13) {
    setPic(dino);
  } else if (num > 12) {
    setPic(dragon);
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

// ------- HEARTS -------

export const brokeHearts = (arr, el) => {
  let position = 0;
  arr.splice(position, 1, el);
  position++;
};
