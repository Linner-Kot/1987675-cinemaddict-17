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
  #changeData = null;

  constructor(filmsContainerComponent, bodyContainer, setOpenedPopup, changeData) {
    this.#filmsContainerComponent = filmsContainerComponent;
    this.#bodyContainer = bodyContainer;
    this.#setOpenedPopup = setOpenedPopup;
    this.#changeData = changeData;
  }

  init = (card) => {
    this.#card = card;

    const prevCardComponent = this.#cardComponent;
    const prevPopupComponent = this.#openedPopup;

    this.#cardComponent = new CardView(this.#card);

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
    remove(this.#openedPopup);
  };

  closePopup = () => {
    this.#openedPopup.element.remove();
    this.#openedPopup.removeElement();

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
    this.#changeData({...this.#card, userDetails: {...this.#card.userDetails, watchlist: !this.#card.userDetails.watchlist}});
  };

  #handleWatchedClick = () => {
    this.#changeData({...this.#card, userDetails: {...this.#card.userDetails, alreadyWatched: !this.#card.userDetails.alreadyWatched}});
  };

  #handleFavoriteClick = () => {
    this.#changeData({...this.#card, userDetails: {...this.#card.userDetails, favorite: !this.#card.userDetails.favorite}});
  };

  #renderPopup = () => {
    this.#setOpenedPopup(this);

    this.#openedPopup = new PopupView(this.#card);
    render(this.#openedPopup, this.#bodyContainer);
    this.#openedPopup.setPopupCloseButtonClickHandler(this.closePopup);

    this.#bodyContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
