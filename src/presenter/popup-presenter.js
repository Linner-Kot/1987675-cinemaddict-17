import { render } from '../render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  init = (popupContainer, cardsModel) => {
    this.popupContainer = popupContainer;
    this.cardsModel = cardsModel;
    this.popupCards = [...this.cardsModel.getCards()];

    render(new PopupView(this.popupCards[0]), this.popupContainer);
  };
}
