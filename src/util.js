import dayjs from 'dayjs';

const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));

  return Math.floor(lower + Math.random() * (upper - lower + 1));
};

const getRandomNumber = (a = 0, b = 1) => {
  const lower = Math.min(a, b);
  const upper = Math.max(a, b);

  // return (Math.random() * (upper - lower) + lower).toFixed(1);
  return Math.random() * (upper - lower) + lower;
};

const humanizeFilmCardReleaseDate = (date) => dayjs(date).format('YYYY');

const humanizeFilmPopupReleaseDate = (date) => dayjs(date).format('D MMMM YYYY');

const humanizeFilmRuntime = (runtime) => {
  if (runtime >= 60) {
    const integer = Math.floor(runtime/60);
    const remainder = runtime%60;
    return `${integer}h ${remainder}m`;
  }

  return `${runtime}m`;
};

const humanizeCommentDate = (date) => dayjs(date).format('YYYY/MM/DD H:mm');

export {getRandomInteger, getRandomNumber, humanizeFilmCardReleaseDate, humanizeFilmPopupReleaseDate, humanizeFilmRuntime, humanizeCommentDate};
