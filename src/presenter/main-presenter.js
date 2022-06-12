import { render } from '../framework/render.js';
import MainView from '../view/main-view.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
// import NavigationView from '../view/navigation-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';
import FilmPresenter from './film-presenter.js';
import NavigationPresenter from './navigation-presenter.js';

const CARD_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #bodyContainer;
  #cardsModel;
  #mainCards;
  #renderedCardCount = CARD_COUNT_PER_STEP;
  #openedPopup = null;

  #sortComponent = new SortView();
  #noFilmsComponent = new NoFilmsView();
  #mainComponent = new MainView();
  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  constructor(mainContainer, cardsModel) {
    this.#bodyContainer = mainContainer;
    this.#cardsModel = cardsModel;
  }

  init = () => {
    this.#mainCards = [...this.#cardsModel.cards];

    this.#renderMain();
  };

  #renderMain = () => {
    this.#renderNavigation();

    if (this.#mainCards.length === 0) {
      this.#renderMainComponent();
      this.#renderFilmsComponent();
      this.#renderFilmsListComponent();
      render(this.#noFilmsComponent, this.#filmsListComponent.element);
      return;
    }

    this.#renderSort();
    this.#renderMainComponent();
    this.#renderFilmsComponent();
    this.#renderFilmsListComponent();
    this.#renderFilmsContainerComponent();

    for (let i = 0; i < Math.min(this.#mainCards.length, CARD_COUNT_PER_STEP); i++) {
      this.#renderCard(this.#mainCards[i]);
    }

    if (this.#mainCards.length > CARD_COUNT_PER_STEP) {
      render(this.#showMoreButtonComponent, this.#filmsComponent.element);

      this.#showMoreButtonComponent.setClickHandler(this.#onShowMoreButtonClick);
    }
  };

  #renderMainComponent = () => render(this.#mainComponent, this.#bodyContainer);
  #renderFilmsComponent = () => render(this.#filmsComponent, this.#mainComponent.element);
  #renderFilmsListComponent = () => render(this.#filmsListComponent, this.#filmsComponent.element);
  #renderFilmsContainerComponent = () => render(this.#filmsContainerComponent, this.#filmsListComponent.element);

  #renderNavigation = () => {
    const navigationPresenter = new NavigationPresenter(this.#mainComponent.element);
    navigationPresenter.init(this.#mainCards);
  };

  #renderSort = () => render(this.#sortComponent, this.#mainComponent.element);

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

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmsContainerComponent.element, this.#bodyContainer, this.#setOpenedPopup);
    filmPresenter.init(card);
  };

  #setOpenedPopup = (currentFilmPresenter) => {
    if (this.#openedPopup) {
      this.#openedPopup.closePopup();
    }
    this.#openedPopup = currentFilmPresenter;
  };
}
