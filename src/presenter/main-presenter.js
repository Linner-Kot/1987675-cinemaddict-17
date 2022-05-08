import { render } from '../render';
import CardView from '../view/card-view';
import FilterView from '../view/filter-view';
import FilmsContainerView from '../view/films-container-view';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class MainPresenter {
  init = (mainContainer) => {
    this.mainContainer = mainContainer;

    render(new FilterView(), this.mainContainer);

    render(new SortView(), this.mainContainer);

    render(new FilmsContainerView(), this.mainContainer);

    const filmsListElement = document.querySelector('.films-list');
    const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

    for (let i = 0; i < 5; i++) {
      render(new CardView(), filmsListContainerElement);
    }

    render(new ShowMoreButtonView(), filmsListElement);
  };
}
