import { render } from '../render';
import PopupView from '../view/popup-view';

export default class PopupPresenter {
  init = (popupContainer) => {
    this.popupContainer = popupContainer;

    render(new PopupView(), this.popupContainer);
  };
}
