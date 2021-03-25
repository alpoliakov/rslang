const egg = 'https://img.icons8.com/color/96/000000/kawaii-egg.png';
const dinoEgg = 'https://img.icons8.com/color/96/000000/dinosaur-egg.png';
const dino = 'https://img.icons8.com/color/96/000000/kawaii-dinosaur--v2.png';
const dragon = 'https://img.icons8.com/color/96/000000/european-dragon.png';

const changePicture = (num, setPic) => {
  if (num > 4 && num < 9) {
    setPic(dinoEgg);
  } else if (num > 8 && num < 12) {
    setPic(dino);
  } else if (num > 12) {
    setPic(dragon);
  }
};

const extraPoints = (pic) => {
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

export { changePicture, egg, extraPoints };
