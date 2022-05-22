import { render } from '../render';
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
  #mainContainer;
  #cardsModel;
  #mainCards;
  #renderedCardCount = CARD_COUNT_PER_STEP;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  init = (mainContainer, cardsModel) => {
    this.#mainContainer = mainContainer;
    this.#cardsModel = cardsModel;
    this.#mainCards = [...this.#cardsModel.cards];

    render(new NavigationView(), this.#mainContainer);

    if (this.#mainCards.length === 0) {
      render(this.#filmsComponent, this.#mainContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);

      render(new NoFilmsView(), this.#filmsListComponent.element);
    } else {
      render(new SortView(), this.#mainContainer);

      render(this.#filmsComponent, this.#mainContainer);
      render(this.#filmsListComponent, this.#filmsComponent.element);
      render(this.#filmsContainerComponent, this.#filmsListComponent.element);

      for (let i = 0; i < Math.min(this.#mainCards.length, CARD_COUNT_PER_STEP); i++) {
        this.#renderCard(this.#mainCards[i]);
      }

      if (this.#mainCards.length > CARD_COUNT_PER_STEP) {
        render(this.#showMoreButtonComponent, this.#filmsComponent.element);

        this.#showMoreButtonComponent.element.addEventListener('click', this.#onShowMoreButtonClick);
      }
    }
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

    const onPopupCloseBtnClick = () => {
      this.#mainContainer.removeChild(popupComponent.element);
      document.querySelector('body').classList.remove('hide-overflow');
    };

    const onPopupEscape = (evt) => {
      if (evt.key === 'Escape') {
        evt.preventDefault();
        this.#mainContainer.removeChild(popupComponent.element);
        document.querySelector('body').classList.remove('hide-overflow');
      }
    };

    const onCardClick = () => {
      const popup = this.#mainContainer.querySelector('.film-details');
      if (popup) {
        this.#mainContainer.removeChild(popup);
      }

      render(popupComponent, this.#mainContainer);
      document.querySelector('body').classList.add('hide-overflow');

      document.addEventListener('keydown', onPopupEscape, {once: true});
    };

    cardComponent.element.addEventListener('click', onCardClick);

    popupComponent.element.querySelector('.film-details__close-btn').addEventListener('click', onPopupCloseBtnClick);

    render(cardComponent, this.#filmsContainerComponent.element);
  };
}
