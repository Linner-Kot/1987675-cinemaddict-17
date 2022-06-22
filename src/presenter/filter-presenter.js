import { filter } from '../utils/filter.js';
import { FilterType, UpdateType } from '../const.js';
import { render, replace, remove } from '../framework/render.js';
import FilterView from '../view/filter-view.js';

export default class FilterPresenter {
  #filterContainer = null;
  #filterModel = null;
  #filmsModel = null;

  #filterComponent = null;

  constructor(filterContainer, filterModel, filmsModel) {
    this.#filterContainer = filterContainer;
    this.#filterModel = filterModel;
    this.#filmsModel = filmsModel;

    this.#filmsModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get filters() {
    const films = this.#filmsModel.films;

    return [
      {
        type: FilterType.ALL,
        href: '#all',
        name: 'All movies',
        count: filter[FilterType.ALL](films).length,
      },
      {
        type: FilterType.WATCHLIST,
        href: '#watchlist',
        name: 'Watchlist',
        count: filter[FilterType.WATCHLIST](films).length,
      },
      {
        type: FilterType.HISTORY,
        href: '#history',
        name: 'History',
        count: filter[FilterType.HISTORY](films).length,
      },
      {
        type: FilterType.FAVORITES,
        href: '#favorites',
        name: 'Favorites',
        count: filter[FilterType.FAVORITES](films).length,
      },
    ];
  }

  init = () => {
    const filters = this.filters;
    const prevFilterComponent = this.#filterComponent;

    this.#filterComponent = new FilterView(filters, this.#filterModel.filter);
    this.#filterComponent.setFilterTypeChangeHandler(this.#handleFilterTypeChange);

    if (prevFilterComponent === null) {
      render(this.#filterComponent, this.#filterContainer);
      return;
    }

    replace(this.#filterComponent, prevFilterComponent);
    remove(prevFilterComponent);
  };

  #handleModelEvent = () => {
    this.init();
  };

  #handleFilterTypeChange = (filterType) => {
    if (this.#filterModel.filter === filterType) {
      return;
    }

    this.#filterModel.setFilter(UpdateType.MAJOR, filterType);
  };
}
