import { render } from '../render';
import CardView from '../view/card-view';
import FilmsContainerView from '../view/films-container-view';
import FilmsListView from '../view/films-list-view';
import FilmsView from '../view/films-view';
import NavigationView from '../view/navigation-view';
import PopupView from '../view/popup-view';
import ShowMoreButtonView from '../view/show-more-button-view';
import SortView from '../view/sort-view';

export default class MainPresenter {
  #mainContainer;
  #cardsModel;
  #mainCards;

  #filmsComponent = new FilmsView();
  #filmsListComponent = new FilmsListView();
  #filmsContainerComponent = new FilmsContainerView();

  init = (mainContainer, cardsModel) => {
    this.#mainContainer = mainContainer;
    this.#cardsModel = cardsModel;
    this.#mainCards = [...this.#cardsModel.cards];

    render(new NavigationView(), this.#mainContainer);

    render(new SortView(), this.#mainContainer);

    render(this.#filmsComponent, this.#mainContainer);

    render(this.#filmsListComponent, this.#filmsComponent.element);

    render(this.#filmsContainerComponent, this.#filmsListComponent.element);

    for (let i = 0; i < this.#mainCards.length; i++) {
      render(new CardView(this.#mainCards[i]), this.#filmsContainerComponent.element);
    }

    render(new PopupView(this.#mainCards[0]), this.#mainContainer);

    render(new ShowMoreButtonView(), this.#filmsListComponent.element);

    // for (let i = 0; i < this.#mainCards.length; i++) {
    //   this.#renderCard(this.#mainCards[i]);
    // }
  };

  // #renderCard = (card) => {
  //   const cardComponent = new CardView(card);
  //   const popupComponent = new PopupView(card);

  //   const replaceCardToPopup = () => {

  //   };

  //   render(cardComponent, filmsListContainerElement);
  // };
}
