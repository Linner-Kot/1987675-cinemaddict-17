import {render} from '../framework/render.js';
import UserRankView from '../view/user-rank-view';

export default class HeaderPresenter {
  #headerContainer;

  constructor (headerContainer) {
    this.#headerContainer = headerContainer;
  }

  init = () => {
    render(new UserRankView(), this.#headerContainer);
  };
}
