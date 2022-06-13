import { render } from '../framework/render.js';
import NavigationView from '../view/navigation-view.js';

export default class NavigationPresenter {
  #mainComponent = null;
  #mainCards = null;
  #navigationComponent = null;

  constructor(mainComponent) {
    this.#mainComponent = mainComponent;
  }

  init = (mainCards) => {
    this.#mainCards = mainCards;

    this.#navigationComponent = new NavigationView(this.#mainCards);

    render(this.#navigationComponent, this.#mainComponent);
  };
}
