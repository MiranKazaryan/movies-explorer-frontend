export const regex = /^[a-zа-яё\s-]+$/i;

export const errorLogin = 'Вы ввели некорректный логин или пароль.';
export const errorText = 'Во время запроса произошла ошибка. Подождите немного и попробуйте ещё раз, возможно проблема с соединением';
export const errorTextConflict = 'Пользователь с этим email уже существует.';


export const shortMovieDuration = 40;

export const DEVICE_PARAMS = {
  desktop: {
    width: 1100,
    cards: {
      total: 12,
      more: 3,
    },
  },
  tablet: {
    width: 520,
    cards: {
      total: 8,
      more: 2,
    },
  },
  mobile: {
    width: 320,
    cards: {
      total: 5,
      more: 2,
    },
  },
};
