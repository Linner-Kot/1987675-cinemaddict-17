import AbstractView from '../framework/view/abstract-view.js';

const NO_MOVIES_MESSAGES = {
  AllMovies: 'There are no movies in our database',
  Watchlist: 'There are no movies to watch now',
  History: 'There are no watched movies now',
  Favorites: 'There are no favorite movies now'
};

const createNoFilmsTemplate = () => (
  `<h2 class="films-list__title">
    ${NO_MOVIES_MESSAGES.AllMovies}
  </h2>`
);

export default class NoFilmsView extends AbstractView {
  get template() {
    return createNoFilmsTemplate();
  }
}
