import {render} from '../framework/render.js';
import FooterView from '../view/footer-view.js';

export default class FooterPresenter {
  #footerContainer;
  #cardsCount;

  constructor (footerContainer, cardsCount) {
    this.#footerContainer = footerContainer;
    this.#cardsCount = cardsCount;
  }

  init = () => {
    render(new FooterView(this.#cardsCount), this.#footerContainer);
  };
}
