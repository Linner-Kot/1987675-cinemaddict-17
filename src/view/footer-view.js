import AbstractView from '../framework/view/abstract-view.js';

const createFooterTemplate = (filmsCount) => (
  `<section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${filmsCount} movies inside</p>
    </section>`
);

export default class FooterView extends AbstractView {
  constructor(filmsCount) {
    super();
    this.filmsCount = filmsCount;
  }

  get template() {
    return createFooterTemplate(this.filmsCount);
  }
}
