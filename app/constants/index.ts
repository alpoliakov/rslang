const LOCAL_HOST = 'http://localhost:8000/';
const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MenuTitle = {
  DICTIONARY: {
    title: 'Словарь',
    url: 'statistics',
  },
  GAME_1: {
    title: 'Учебник',
    url: 'textbook/0/0',
  },
  GAME_2: {
    title: 'Словарь',
    url: 'statistics',
  },
  STATISTICS: {
    title: 'Статистика',
    url: 'statistics',
  },
};

const ACCORDION_TITLES = [
  'Начните изучать английский язык с помощью RS Lang уже сегодня!',
  'Начинаем изучать прямо сейчас!',
  'Демонстрация работы с приложением',
  'Наша команда',
];

const ACTIVE_BUTTON_COLOR = {
  LIGHT: '#F9B9B7',
  DARK: '#F06C9B',
};

const PASSIVE_BUTTON_COLOR = {
  LIGHT: '#96C9DC',
  DARK: '#61A0AF',
};

const DEMONSTRATION_VIDEO = 'https://www.youtube.com/watch?v=XqZsoesa55w';

export {
  ACCORDION_TITLES,
  ACTIVE_BUTTON_COLOR,
  DEMONSTRATION_VIDEO,
  LOCAL_HOST,
  MenuTitle,
  PASSIVE_BUTTON_COLOR,
  REG_EMAIL,
};
