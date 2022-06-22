import { render, remove, replace } from '../framework/render.js';
import { UserAction, UpdateType } from '../const.js';
import FilmView from '../view/film-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmPresenter {
  #filmsContainerComponent = null;
  #bodyContainer = null;
  #film = null;
  #filmComponent = null;
  #openedPopup = null;
  #setOpenedPopup = null;
  #changeData = null;

  constructor(filmsContainerComponent, bodyContainer, setOpenedPopup, changeData) {
    this.#filmsContainerComponent = filmsContainerComponent;
    this.#bodyContainer = bodyContainer;
    this.#setOpenedPopup = setOpenedPopup;
    this.#changeData = changeData;
  }

  init = (film) => {
    this.#film = film;

    const prevFilmComponent = this.#filmComponent;
    const prevPopupComponent = this.#openedPopup;

    this.#filmComponent = new FilmView(this.#film);
    if (prevPopupComponent !== null && this.#bodyContainer.contains(prevPopupComponent.element)) {
      this.#renderPopup(this.#film);
    }

    this.#filmComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#filmComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#filmComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#filmComponent.setFilmClickHandler(() => this.#renderPopup(this.#film));

    if (prevFilmComponent === null) {
      render(this.#filmComponent, this.#filmsContainerComponent);
      return;
    }

    if (this.#filmsContainerComponent.contains(prevFilmComponent.element)) {
      replace(this.#filmComponent, prevFilmComponent);
    }

    remove(prevFilmComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#filmComponent);
    this.closePopup();
  };

  closePopup = () => {
    remove(this.#openedPopup);

    this.#bodyContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  };

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.closePopup();
    }
  };

  #handleWatchlistClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, watchlist: !this.#film.userDetails.watchlist}}
    );
  };

  #handleWatchedClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, alreadyWatched: !this.#film.userDetails.alreadyWatched}}
    );
  };

  #handleFavoriteClick = () => {
    this.#changeData(
      UserAction.UPDATE_FILM,
      UpdateType.MINOR,
      {...this.#film, userDetails: {...this.#film.userDetails, favorite: !this.#film.userDetails.favorite}}
    );
  };

  #renderPopup = () => {
    this.#setOpenedPopup(this);

    this.#openedPopup = new PopupView(this.#film);
    render(this.#openedPopup, this.#bodyContainer);
    this.#openedPopup.setPopupCloseButtonClickHandler(this.closePopup);
    this.#openedPopup.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#openedPopup.setWatchedClickHandler(this.#handleWatchedClick);
    this.#openedPopup.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#bodyContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
