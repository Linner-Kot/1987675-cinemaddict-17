import {render} from '../framework/render.js';
import FooterView from '../view/footer-view.js';

export default class FooterPresenter {
  #footerContainer;
  #filmsCount;

  constructor (footerContainer, filmsCount) {
    this.#footerContainer = footerContainer;
    this.#filmsCount = filmsCount;
  }

  init = () => {
    render(new FooterView(this.#filmsCount), this.#footerContainer);
  };
}
