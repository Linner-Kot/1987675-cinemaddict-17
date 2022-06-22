import { render, remove } from '../framework/render.js';
import { sortFilmByDateUp, sortFilmByRatingUp } from '../utils/film.js';
import { SortType, UpdateType, UserAction, FilterType } from '../const.js';
import { filter } from '../utils/filter.js';
import FilmPresenter from './film-presenter.js';
import FilmsView from '../view/films-view.js';
import FilmsListView from '../view/films-list-view.js';
import FilmsListContainerView from '../view/films-list-container-view.js';
import NoFilmsView from '../view/no-films-view.js';
import ShowMoreButtonView from '../view/show-more-button-view.js';
import SortView from '../view/sort-view.js';

const FILM_COUNT_PER_STEP = 5;

export default class MainPresenter {
  #filmsModel = null;
  #filterModel = null;
  #openedPopup = null;
  #sortComponent = null;
  #mainContainer = null;
  #showMoreButtonComponent = null;
  #noFilmsComponent = null;

  #renderedFilmCount = FILM_COUNT_PER_STEP;
  #filmPresenter = new Map();
  #currentSortType = SortType.DEFAULT;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsListContainerComponent = new FilmsListContainerView();
  #filterType = FilterType.ALL;

  constructor(mainContainer, filmsModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#filmsModel = filmsModel;
    this.#filterModel = filterModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get films() {
    this.#filterType = this.#filterModel.filter;
    const films = this.#filmsModel.films;
    const filteredFilms = filter[this.#filterType](films);

    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredFilms.sort(sortFilmByDateUp);
      case SortType.RATING:
        return filteredFilms.sort(sortFilmByRatingUp);
    }

    return filteredFilms;
  }

  init = () => {
    this.#renderMain();
  };

  #renderMain = () => {
    const films = this.films;
    const filmCount = this.films.length;

    this.#renderSort();
    this.#renderFilmsComponent();
    this.#renderFilmsListComponent();

    if (filmCount === 0) {
      this.#noFilmsComponent = new NoFilmsView(this.#filterType);
      render(this.#noFilmsComponent, this.#filmsListComponent.element);
      return;
    }

    this.#renderFilmsListContainerComponent();

    this.#renderFilms(films.slice(0, Math.min(filmCount, this.#renderedFilmCount)));

    if (filmCount > this.#renderedFilmCount) {
      this.#renderShowMoreButton();
    }
  };

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);

    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);

    render(this.#sortComponent, this.#mainContainer);
  };

  #renderFilmsComponent = () => render(this.#filmsComponent, this.#mainContainer);

  #renderFilmsListComponent = () => {
    render(this.#filmsListComponent, this.#filmsComponent.element);
  };

  #renderFilmsListContainerComponent = () => render(this.#filmsListContainerComponent, this.#filmsListComponent.element);

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();

    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);

    render(this.#showMoreButtonComponent, this.#mainContainer);
  };

  #renderFilm = (films) => {
    const filmPresenter = new FilmPresenter(this.#filmsListContainerComponent.element, this.#mainContainer, this.#setOpenedPopup, this.#handleViewAction);
    filmPresenter.init(films);
    this.#filmPresenter.set(films.id, filmPresenter);
  };

  #renderFilms = (films) => {
    films.forEach((film) => this.#renderFilm(film));
  };

  #clearMain = ({resetRenderedFilmCount = false, reserSortType = false} = {}) => {
    this.#filmPresenter.forEach((presenter) => presenter.destroy());
    this.#filmPresenter.clear();

    remove(this.#sortComponent);
    remove(this.#showMoreButtonComponent);

    if (this.#noFilmsComponent) {
      remove(this.#noFilmsComponent);
    }

    if (resetRenderedFilmCount) {
      this.#renderedFilmCount = FILM_COUNT_PER_STEP;
    }

    if (reserSortType) {
      this.#currentSortType = SortType.DEFAULT;
    }
  };

  #handleViewAction = (actionType, updateType, update) => {
    //заменить на "if"
    switch (actionType) {
      case UserAction.UPDATE_FILM:
        this.#filmsModel.updateFilm(updateType, update);
        break;
    }
  };

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#filmPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMain();
        this.#renderMain();
        break;
      case UpdateType.MAJOR:
        this.#clearMain({resetRenderedFilmCount: true, reserSortType: true});
        this.#renderMain();
        break;
    }
  };

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      return;
    }

    this.#currentSortType = sortType;
    this.#clearMain({resetRenderedFilmCount: true});
    this.#renderMain();
  };

  #setOpenedPopup = (currentFilmPresenter) => {
    if (this.#openedPopup) {
      this.#openedPopup.closePopup();
    }
    this.#openedPopup = currentFilmPresenter;
  };

  #handleShowMoreButtonClick = () => {
    const filmCount = this.films.length;
    const newRenderedFilmCount = Math.min(filmCount, this.#renderedFilmCount + FILM_COUNT_PER_STEP);
    const films = this.films.slice(this.#renderedFilmCount, newRenderedFilmCount);

    this.#renderFilms(films);
    this.#renderedFilmCount = newRenderedFilmCount;

    if (this.#renderedFilmCount >= filmCount) {
      this.#showMoreButtonComponent.element.remove();
      this.#showMoreButtonComponent.removeElement();
    }
  };
}
