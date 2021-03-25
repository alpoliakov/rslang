export const egg = 'https://img.icons8.com/color/96/000000/kawaii-egg.png';
export const dinoEgg = 'https://img.icons8.com/color/96/000000/dinosaur-egg.png';
export const dino = 'https://img.icons8.com/color/96/000000/kawaii-dinosaur--v2.png';
export const dragon = 'https://img.icons8.com/color/96/000000/european-dragon.png';

export const changePicture = (num, setPic) => {
  if (num > 4 && num < 9) {
    setPic(dinoEgg);
  } else if (num > 8 && num < 12) {
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
