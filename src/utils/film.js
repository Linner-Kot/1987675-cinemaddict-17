import dayjs from 'dayjs';

const humanizeFilmReleaseDate = (date) => dayjs(date).format('YYYY');

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

const sortFilmByDateUp = (filmA, filmB) => filmB.filmInfo.release.date - filmA.filmInfo.release.date;

const sortFilmByRatingUp = (filmA, filmB) => filmB.filmInfo.totalRating - filmA.filmInfo.totalRating;

export {humanizeCommentDate, humanizeFilmPopupReleaseDate, humanizeFilmReleaseDate, humanizeFilmRuntime, sortFilmByDateUp, sortFilmByRatingUp};
