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
  #bodyContainer = document.querySelector('body');
  #mainContainer;
  #cardsModel;
  #mainCards;
  #renderedCardCount = CARD_COUNT_PER_STEP;

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

  #onShowMoreButtonClick = (evt) => {
    evt.preventDefault();
    this.#mainCards
      .slice(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP)
      .forEach((card) => this.#renderCard(card));

    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#mainCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };

  #renderCard = (card) => {
    const cardComponent = new CardView(card);
    const popupComponent = new PopupView(card);

    const onPopupCloseButtonClick = () => {
      this.#bodyContainer.removeChild(popupComponent.element); //old
      // popupComponent.element.remove(); //new; не срабатывает второй раз кнопка "закрыть" на одной и той же карточке
      // popupComponent.removeElement(); //new
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onPopupEscape = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#bodyContainer.removeChild(popupComponent.element); //old
        // popupComponent.element.remove(); //new не срабатывает второй раз кнопка "закрыть" на одной и той же карточке
        // popupComponent.removeElement(); //new
        document.querySelector('body').classList.remove('hide-overflow');
      }
    };

    const onCardClick = () => {
      const popup = this.#bodyContainer.querySelector('.film-details');
      if (popup) {
        this.#bodyContainer.removeChild(popup);
        // popupComponent.element.remove(); //new вообще не работает...
        // popupComponent.removeElement(); //new
      }

      render(popupComponent, this.#bodyContainer);
      // render(new PopupView(card), this.#bodyContainer);//!! разобраться позже...
      document.querySelector('body').classList.add('hide-overflow');

      document.addEventListener('keydown', onPopupEscape, {once: true});
    };

    cardComponent.setCardClickHandler(onCardClick);

    popupComponent.setPopupCloseButtonClickHandler(onPopupCloseButtonClick);

    render(cardComponent, this.#filmsContainerComponent.element);
  };

  #renderMain = () => {
    render(new NavigationView(), this.#mainContainer);

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
