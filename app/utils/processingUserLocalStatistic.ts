import { DAY_IN_mSECONDS } from '../constants';
import EditLocalStatistics from '../context/statistic/operations/mutations/editStatistics';

export const processingTimeStatistics = (time, func) => {
  const dataStatistic = new Date(time).getTime();
  const currentTime = new Date().getTime();
  const difTimeInDays = (currentTime - dataStatistic) / DAY_IN_mSECONDS;

  if (difTimeInDays > 1) {
    func();
  }
};

export const nonAuthUserStatistic = (key, defaultValue, value = null) => {
  const isLocalStatistic = localStorage.getItem(key) !== null;

  if (!isLocalStatistic) {
    localStorage.setItem(key, JSON.stringify(defaultValue));
  }

  if (isLocalStatistic) {
    if (value) {
      localStorage.setItem(key, JSON.stringify(value));
    }

    const localValue = JSON.parse(localStorage.getItem(key));

    processingTimeStatistics(localValue.date, () => {
      const date = new Date();
      const newStatistic = { ...defaultValue, date };
      EditLocalStatistics(newStatistic);
      localStorage.setItem(key, JSON.stringify(newStatistic));
    });
  }

  return JSON.parse(localStorage.getItem(key));
};
