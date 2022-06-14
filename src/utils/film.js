import dayjs from 'dayjs';

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

const sortFilmByDateUp = (filmA, filmB) => {
  if (filmA.filmInfo.release.date < filmB.filmInfo.release.date) {
    return -1;
  }

  if (filmA.filmInfo.release.date > filmB.filmInfo.release.date) {
    return 1;
  }

  return 0;
};

const sortFilmByDateDown = (filmA, filmB) => {
  if (filmA.filmInfo.release.date < filmB.filmInfo.release.date) {
    return 1;
  }

  if (filmA.filmInfo.release.date > filmB.filmInfo.release.date) {
    return -1;
  }

  return 0;
};

const sortFilmByRatingUp = (filmA, filmB) => {
  if (filmA.filmInfo.totalRating < filmB.filmInfo.totalRating) {
    return 1;
  }

  if (filmA.filmInfo.totalRating > filmB.filmInfo.totalRating) {
    return -1;
  }

  return 0;
};

const sortFilmByRatingDown = (filmA, filmB) => {
  if (filmB.filmInfo.totalRating < filmA.filmInfo.totalRating) {
    return 1;
  }

  if (filmB.filmInfo.totalRating > filmA.filmInfo.totalRating) {
    return -1;
  }

  return 0;
};


export {humanizeCommentDate, humanizeFilmPopupReleaseDate, humanizeFilmCardReleaseDate, humanizeFilmRuntime, sortFilmByDateUp, sortFilmByDateDown, sortFilmByRatingUp, sortFilmByRatingDown};
