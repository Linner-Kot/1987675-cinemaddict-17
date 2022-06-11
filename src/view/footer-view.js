import AbstractView from '../framework/view/abstract-view.js';

const createFooterTemplate = (cardsCount) => (
  `<footer class="footer">
    <section class="footer__logo logo logo--smaller">
      Cinemaddict
    </section>
    <section class="footer__statistics">
      <p>${cardsCount} movies inside</p>
    </section>
  </footer>`
);

export default class FooterView extends AbstractView {
  constructor(cardsCount) {
    super();
    this.cardsCount = cardsCount;
  }

  get template() {
    return createFooterTemplate(this.cardsCount);
  }
}
