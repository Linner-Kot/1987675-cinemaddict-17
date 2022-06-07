import { render } from '../framework/render.js';
import CardView from '../view/card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmsView from '../view/films-view';
import NavigationView from '../view/navigation-view';
import NoFilmsView from '../view/no-films-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';

const CARD_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #bodyContainer = document.body;
  #mainContainer;
  #cardsModel;
  #mainCards;
  #renderedCardCount = CARD_COUNT_PER_STEP;
  #openedPopup = null;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  constructor(mainContainer, cardsModel) {
    this.#mainContainer = mainContainer;
    this.#cardsModel = cardsModel;
  }

  init = () => {
    this.#mainCards = [...this.#cardsModel.cards];

    this.#renderMain();
  };

  #onShowMoreButtonClick = () => {
    this.#mainCards
      .slice(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#mainCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #closePopup = () => {
    this.#openedPopup.element.remove();
    this.#openedPopup.removeElement();

    this.#bodyContainer.classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#onPopupEscape);
  };

  #onPopupEscape = (evt) => {
    if (evt.key === 'Escape') {
      evt.preventDefault();
      this.#closePopup();
    }
  };

  #renderPopup = (card) => {
    if (this.#openedPopup) {
      this.#closePopup();
    }

    this.#openedPopup = new PopupView(card);
    render(this.#openedPopup, this.#bodyContainer);
    this.#openedPopup.setPopupCloseButtonClickHandler(this.#closePopup);

    this.#bodyContainer.classList.add('hide-overflow');
    document.addEventListener('keydown', this.#onPopupEscape);
  };

  #renderCard = (card) => {
    const cardComponent = new CardView(card);

    cardComponent.setCardClickHandler(() => this.#renderPopup(card));

    render(cardComponent, this.#filmsContainerComponent.element);
  };

  #renderMain = () => {
    render(new NavigationView(this.#mainCards), this.#mainContainer);

    if (this.#mainCards.length === 0) {
      render(this.#filmsComponent, this.#mainContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(new NoFilmsView(), this.#filmsListComponent.element);
      return;
    }

    render(new SortView(), this.#mainContainer);
    render(this.#filmsComponent, this.#mainContainer);
    render(this.#filmsListComponent, this.#filmsComponent.element);
    render(this.#filmsContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < Math.min(this.#mainCards.length, CARD_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#mainCards[i]);
    }

    if (this.#mainCards.length > CARD_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsComponent.element);

      this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
    }
  };
}
