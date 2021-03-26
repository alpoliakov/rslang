const LOCAL_HOST = 'http://localhost:8000/';
const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MenuTitle = {
  DICTIONARY: 'Словарь',
  GAME_1: 'Игра 1',
  GAME_2: 'Игра 2',
  STATISTICS: 'Статистика',
};

const ACTIVE_BUTTON_COLOR = {
  LIGHT: '#FF0088',
  DARK: '#AF004B',
};

const PASSIVE_BUTTON_COLOR = {
  LIGHT: '#59BAB7',
  DARK: '#006B69',
};

const DEMONSTRATION_VIDEO = 'https://www.youtube.com/watch?v=XqZsoesa55w';

export {
  ACTIVE_BUTTON_COLOR,
  DEMONSTRATION_VIDEO,
  LOCAL_HOST,
  MenuTitle,
  PASSIVE_BUTTON_COLOR,
  REG_EMAIL,
};
