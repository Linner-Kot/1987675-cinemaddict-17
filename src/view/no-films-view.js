import { createElement } from '../render';

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

export default class NoFilmsView {
  #element;

  get template() {
    return createNoFilmsTemplate();
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}
