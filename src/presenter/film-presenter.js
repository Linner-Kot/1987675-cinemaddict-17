import { render } from '../framework/render.js';
import CardView from '../view/card-view.js';
import PopupView from '../view/popup-view.js';

export default class FilmPresenter {
  #filmsContainerComponent;
  #bodyContainer;

  #card;
  #cardComponent;
  #openedPopup;
  #setOpenedPopup;

  constructor(filmsContainerComponent, bodyContainer, setOpenedPopup) {
    this.#filmsContainerComponent = filmsContainerComponent;
    this.#bodyContainer = bodyContainer;
    this.#setOpenedPopup = setOpenedPopup;
  }

  init = (card) => {
    this.#card = card;

    this.#cardComponent = new CardView(this.#card);
    this.#cardComponent.setCardClickHandler(() => this.#renderPopup(this.#card));

    render(this.#cardComponent, this.#filmsContainerComponent);
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

  #renderPopup = () => {
    this.#setOpenedPopup(this);

    this.#openedPopup = new PopupView(this.#card);
    render(this.#openedPopup, this.#bodyContainer);
    this.#openedPopup.setPopupCloseButtonClickHandler(this.closePopup);

    this.#bodyContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#escKeyDownHandler);
  };
}
