import { NavigationType } from '../const.js';
import AbstractView from '../framework/view/abstract-view.js';

const createNavigationTemplate = (watchlistCount, alreadyWatchedCount, favoriteCount) => (
  `<nav class="main-navigation">
    <a href="#all" class="main-navigation__item main-navigation__item--active" data-navigation-type="${NavigationType.ALL}">All movies</a>
    <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count" data-navigation-type="${NavigationType.WATCHLIST}">${watchlistCount}</span></a>
    <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count" data-navigation-type="${NavigationType.HISTORY}">${alreadyWatchedCount}</span></a>
    <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count" data-navigation-type="${NavigationType.FAVORITES}">${favoriteCount}</span></a>
  </nav>`
);

export default class NavigationView extends AbstractView {
  constructor(films) {
    super();
    this.films = films;
  }

  get template() {
    const watchlistCount = this.films.filter((film) => film.userDetails.watchlist).length;
    const alreadyWatchedCount = this.films.filter((film) => film.userDetails.alreadyWatched).length;
    const favoriteCount = this.films.filter((film) => film.userDetails.favorite).length;

    return createNavigationTemplate(watchlistCount, alreadyWatchedCount, favoriteCount);
  }

  setNavigationTypeChangeHandler = (callback) => {
    this._callback.navigationTypeChange = callback;
    this.element.addEventListener('click', this.#NavigationTypeChangeHandler);
  };

  #NavigationTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.navigationTypeChange(evt.target.dataset.navigationType);
  };
}
