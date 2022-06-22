import {FilterType} from '../const';

const filter = {
  [FilterType.ALL]: (films) => films.filter((film) => film),
  [FilterType.WATCHLIST]: (films) => films.filter((film) => film.userDetails.watchlist === true),
  [FilterType.HISTORY]: (films) => films.filter((film) => film.userDetails.alreadyWatched === true),
  [FilterType.FAVORITES]: (films) => films.filter((film) => film.userDetails.favorite === true),
};

export {filter};
