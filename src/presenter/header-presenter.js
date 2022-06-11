import {render, RenderPosition} from '../framework/render.js';
import HeaderView from '../view/header-view';

export default class HeaderPresenter {
  #headerContainer;

  constructor (headerContainer) {
    this.#headerContainer = headerContainer;
  }

  init = () => {
    render(new HeaderView(), this.#headerContainer, RenderPosition.AFTERBEGIN);
  };
}
