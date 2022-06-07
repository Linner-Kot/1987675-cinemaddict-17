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

export {humanizeCommentDate, humanizeFilmPopupReleaseDate, humanizeFilmCardReleaseDate, humanizeFilmRuntime};
