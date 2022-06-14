import { render, remove } from '../framework/render.js';
import { updateItem } from '../utils/common.js';
import { sortFilmByDateUp, sortFilmByRatingUp } from '../utils/film.js';
import { SortType } from '../const.js';
import FilmPresenter from './film-presenter.js';
import FilmsContainerView from '../view/films-container-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsView from '../view/films-view.js';
import MainView from '../view/main-view.js';
import NavigationView from '../view/navigation-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';

const CARD_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #bodyContainer = null;
  #cardsModel = null;
  #mainCards = [];
  #renderedCardCount = CARD_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #openedPopup = null;
  #currentSortType = SortType.DEFAULT;
  #sourcedMainCards = [];

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
    this.#sourcedMainCards = [...this.#cardsModel.cards];

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

    this.#renderCardsList();
  };

  #renderNavigation = () => {
    const navigationComponent = new NavigationView(this.#mainCards);
    render(navigationComponent, this.#mainComponent.element);
    navigationComponent.setNavigationTypeChangeHandler(this.#handleNavigationTypeChange);
  };

  #renderSort = () => {
    render(this.#sortComponent, this.#mainComponent.element);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  };

  #renderMainComponent = () => render(this.#mainComponent, this.#bodyContainer);
  #renderFilmsComponent = () => render(this.#filmsComponent, this.#mainComponent.element);
  #renderFilmsListComponent = () => render(this.#filmsListComponent, this.#filmsComponent.element);
  #renderFilmsContainerComponent = () => render(this.#filmsContainerComponent, this.#filmsListComponent.element);

  #renderShowMoreButton = () => {
    render(this.#showMoreButtonComponent, this.#mainComponent.element);

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  };

  #renderCard = (card) => {
    const filmPresenter = new FilmPresenter(this.#filmsContainerComponent.element, this.#bodyContainer, this.#setOpenedPopup, this.#handleFilmChange);
    filmPresenter.init(card);
    this.#filmPresenter.set(card.id, filmPresenter);
  };

  #renderCards = (from, to) => {
    this.#mainCards
      .slice(from, to)
      .forEach((card) => this.#renderCard(card));
  };

  #renderCardsList = () => {
    this.#renderCards(0, Math.min(this.#mainCards.length, CARD_COUNT_PER_STEP));

    if (this.#mainCards.length > CARD_COUNT_PER_STEP) {
      this.#renderShowMoreButton();
    }
  };

  #clearCardsList = () => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();
    this.#renderedCardCount = CARD_COUNT_PER_STEP;
    remove(this.#showMoreButtonComponent);
  };

  #handleFilmChange = (updatedFilm) => {
    this.#mainCards = updateItem(this.#mainCards, updatedFilm);
    this.#sourcedMainCards = updateItem(this.#sourcedMainCards, updatedFilm);
    this.#filmPresenter.get(updatedFilm.id).init(updatedFilm);
  };

  #sortCards = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#mainCards.sort(sortFilmByDateUp);
        break;
      case SortType.RATING:
        this.#mainCards.sort(sortFilmByRatingUp);
        break;
      default:
        this.#mainCards = [...this.#sourcedMainCards];
    }

    this.#currentSortType = sortType;
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#sortCards(sortType);
    this.#clearCardsList();
    this.#renderCardsList();
  };

  #setOpenedPopup = (currentFilmPresenter) => {
    if (this.#openedPopup) {
      this.#openedPopup.closePopup();
    }
    this.#openedPopup = currentFilmPresenter;
  };

  #handleNavigationTypeChange = () => {
    //
  };

  #handleShowMoreButtonClick = () => {
    this.#renderCards(this.#renderedCardCount, this.#renderedCardCount + CARD_COUNT_PER_STEP);

    this.#renderedCardCount += CARD_COUNT_PER_STEP;

    if (this.#renderedCardCount >= this.#mainCards.length) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
