import { render } from '../framework/render.js';
import NavigationView from '../view/navigation-view.js';

export default class NavigationPresenter {
  #mainComponent = null;
  #mainFilms = null;
  #navigationComponent = null;

  constructor(mainComponent) {
    this.#mainComponent = mainComponent;
  }

  init = (mainFilms) => {
    this.#mainFilms = mainFilms;

    this.#navigationComponent = new NavigationView(this.#mainFilms);

    render(this.#navigationComponent, this.#mainComponent);
  };
}
