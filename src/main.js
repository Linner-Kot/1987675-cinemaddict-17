import CardsModel from './model/cards-model.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const siteBody = document.body;
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');

const cardsModel = new CardsModel();

const headerPresenter = new HeaderPresenter(siteHeaderElement);
headerPresenter.init();

const mainPresenter = new MainPresenter(siteMainElement, cardsModel);
mainPresenter.init();

const footerPresenter = new FooterPresenter(siteBody, cardsModel.cards.length);
footerPresenter.init();
