const LOCAL_HOST = 'http://localhost:8000/';
const REG_EMAIL = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

const MenuTitle = {
  DICTIONARY: {
    title: 'Словарь',
    url: '/vocabulary/studied/1',
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
    url: '/mini-games/savanna/0/0$menu=true',
  },
  GAME_SPRINT: {
    title: 'Спринт',
    url: '/mini-games/sprint/0/0$menu=true',
  },
  GAME_AUDIO_CALL: {
    title: 'Аудиовызов',
    url: '/mini-games/audiocall/0/0$menu=true',
  },
  GAME_NEW_GAME: {
    title: 'Написание',
    url: '/mini-games/new-game/0/0$menu=true',
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
