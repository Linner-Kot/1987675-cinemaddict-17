import { render, remove, replace } from '../framework/render.js';
import CardView from '../view/card-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmPresenter {
  #filmsContainerComponent = null;
  #bodyContainer = null;
  #card = null;
  #cardComponent = null;
  #openedPopup = null;
  #setOpenedPopup = null;
  #handleFilmChange = null;

  constructor(filmsContainerComponent, bodyContainer, setOpenedPopup, handleFilmChange) {
    this.#filmsContainerComponent = filmsContainerComponent;
    this.#bodyContainer = bodyContainer;
    this.#setOpenedPopup = setOpenedPopup;
    this.#handleFilmChange = handleFilmChange;
  }

  init = (card) => {
    this.#card = card;

    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#openedPopup;

    this.#cardComponent = new CardView(this.#card);
    if (prevPopupComponent !== null && this.#bodyContainer.contains(prevPopupComponent.element)) {
      this.#renderPopup(this.#card);
    }

    this.#cardComponent.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#cardComponent.setWatchedClickHandler(this.#handleWatchedClick);
    this.#cardComponent.setFavoriteClickHandler(this.#handleFavoriteClick);
    this.#cardComponent.setCardClickHandler(() => this.#renderPopup(this.#card));

    if (prevCardComponent === null) {
      render(this.#cardComponent, this.#filmsContainerComponent);
      return;
    }

    if (this.#filmsContainerComponent.contains(prevCardComponent.element)) {
      replace(this.#cardComponent, prevCardComponent);
    }

    remove(prevCardComponent);
    remove(prevPopupComponent);
  };

  destroy = () => {
    remove(this.#cardComponent);
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
    this.#handleFilmChange({...this.#card, userDetails: {...this.#card.userDetails, watchlist: !this.#card.userDetails.watchlist}});
  };

  #handleWatchedClick = () => {
    this.#handleFilmChange({...this.#card, userDetails: {...this.#card.userDetails, alreadyWatched: !this.#card.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#handleFilmChange({...this.#card, userDetails: {...this.#card.userDetails, favorite: !this.#card.userDetails.favorite}});
  };

  #renderPopup = () => {
    this.#setOpenedPopup(this);

    this.#openedPopup = new PopupView(this.#card);
    render(this.#openedPopup, this.#bodyContainer);
    this.#openedPopup.setPopupCloseButtonClickHandler(this.closePopup);
    this.#openedPopup.setWatchlistClickHandler(this.#handleWatchlistClick);
    this.#openedPopup.setWatchedClickHandler(this.#handleWatchedClick);
    this.#openedPopup.setFavoriteClickHandler(this.#handleFavoriteClick);

    this.#bodyContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
