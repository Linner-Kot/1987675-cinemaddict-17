import { render } from '../render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  #popupContainer;
  #cardsModel;
  #popupCards;

  init = (popupContainer, cardsModel) => {
    this.#popupContainer = popupContainer;
    this.#cardsModel = cardsModel;
    this.#popupCards = [...this.#cardsModel.cards];

    render(new PopupView(this.#popupCards[0]), this.#popupContainer);
  };
}
