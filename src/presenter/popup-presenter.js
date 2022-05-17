import { render } from '../render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  init = (popupContainer, popupModel) => {
    this.popupContainer = popupContainer;
    this.popupModel = popupModel;
    this.popup = [...this.popupModel.getPopup()];

    render(new PopupView(this.popup[0]), this.popupContainer);
  };
}
