import AbstractView from '../framework/view/abstract-view.js';

const createMainTemplate = () => '<main class="main"></main>';

export default class MainView extends AbstractView {
  get template() {
    return createMainTemplate();
  }
}
