import CardsModel from './model/cards-model.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const siteBody = document.body;
const cardsModel = new CardsModel();

const headerPresenter = new HeaderPresenter(siteBody);
headerPresenter.init();

const mainPresenter = new MainPresenter(siteBody, cardsModel);
mainPresenter.init();

const footerPresenter = new FooterPresenter(siteBody, cardsModel.cards.length);
footerPresenter.init();

//коммент для отправки задания "7.4. Меняй-удаляй"
