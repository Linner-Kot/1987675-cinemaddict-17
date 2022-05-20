import { render } from '../render';
import CardView from '../view/card-view';
import FilterView from '../view/filter-view';
import FilmsContainerView from '../view/films-container-view';
import SortView from '../view/sort-view';
import ShowMoreButtonView from '../view/show-more-button-view';

export default class MainPresenter {
  #mainContainer;
  #cardsModel;
  #mainCards;

  init = (mainContainer, cardsModel) => {
    this.#mainContainer = mainContainer;
    this.#cardsModel = cardsModel;
    this.#mainCards = [...this.#cardsModel.cards];

    render(new FilterView(), this.#mainContainer);

    render(new SortView(), this.#mainContainer);

    render(new FilmsContainerView(), this.#mainContainer);

    const filmsListElement = document.querySelector('.films-list');
    const filmsListContainerElement = filmsListElement.querySelector('.films-list__container');

    for (let i = 0; i < this.#mainCards.length; i++) {
      render(new CardView(this.#mainCards[i]), filmsListContainerElement);
    }

    render(new ShowMoreButtonView(), filmsListElement);
  };
}
