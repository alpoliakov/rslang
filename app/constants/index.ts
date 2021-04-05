const LOCAL_HOST = 'http://localhost:8000/';
const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MenuTitle = {
  DICTIONARY: {
    title: 'Словарь',
    url: '/vocabulary/studied/0',
  },
  TEXT_BOOK: {
    title: 'Учебник',
    url: '/textbook/0/0',
  },
  STATISTICS: {
    title: 'Статистика',
    url: '/statistics',
  },
  GAME_SAVANNA: {
    title: 'Саванна',
    url: '/mini-games/savanna',
  },
  GAME_SPRINT: {
    title: 'Спринт',
    url: '/mini-games/sprint',
  },
  GAME_AUDIO_CALL: {
    title: 'Аудиовызов',
    url: '/mini-games/audiocall',
  },
  GAME_NEW_GAME: {
    title: 'Новая игра',
    url: '/mini-games/new-game',
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

const VOCABULARY_GROUP_NAV_LINKS = [
  { link: '/vocabulary/', title: 'Group 1' },
  { link: '/vocabulary/', title: 'Group 2' },
  { link: '/vocabulary/', title: 'Group 3' },
  { link: '/vocabulary/', title: 'Group 4' },
  { link: '/vocabulary/', title: 'Group 5' },
  { link: '/vocabulary/', title: 'Group 6' },
];

const WORDS_IN_PAGE = 20;

export {
  ACCORDION_TITLES,
  ACTIVE_BUTTON_COLOR,
  DEMONSTRATION_VIDEO,
  LOCAL_HOST,
  MenuTitle,
  PASSIVE_BUTTON_COLOR,
  REG_EMAIL,
  VOCABULARY_GROUP_NAV_LINKS,
  WORDS_IN_PAGE,
};
