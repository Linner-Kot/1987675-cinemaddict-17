import AbstractView from '../framework/view/abstract-view.js';
import { humanizeFilmReleaseDate, humanizeFilmRuntime } from '../utils/film';

const createFilmTemplate = (film) => {
  const {title, totalRating, release, runtime, genre, poster, description} = film.filmInfo;
  const {comments} = film;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;

  return (
    `<article class="film-card">
      <a class="film-card__link">
        <h3 class="film-card__title">${title}</h3>
        <p class="film-card__rating">${totalRating}</p>
        <p class="film-card__info">
          <span class="film-card__year">${humanizeFilmReleaseDate(release.date)}</span>
          <span class="film-card__duration">${humanizeFilmRuntime(runtime)}</span>
          <span class="film-card__genre">${genre}</span>
        </p>
        <img src="${poster}" alt="" class="film-card__poster">
        <p class="film-card__description">${description}</p>
        <span class="film-card__comments">${comments.length} comments</span>
      </a>
      <div class="film-card__controls">
        <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlist?'film-card__controls-item--active':''} " type="button">Add to watchlist</button>
        <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatched?'film-card__controls-item--active':''}" type="button">Mark as watched</button>
        <button class="film-card__controls-item film-card__controls-item--favorite ${favorite?'film-card__controls-item--active':''}" type="button">Mark as favorite</button>
      </div>
    </article>`
  );
};

export default class FilmView extends AbstractView {
  constructor(film) {
    super();
    this.film = film;
  }

  get template() {
    return createFilmTemplate(this.film);
  }

  setFilmClickHandler = (callback) => {
    this._callback.filmClick = callback;
    this.element.addEventListener('click', this.#filmClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #filmClickHandler = (evt) => {
    if (evt.target.tagName === 'BUTTON') {
      return;
    }

    evt.preventDefault();
    this._callback.filmClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };
}
