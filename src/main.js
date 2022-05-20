import CardsModel from './model/cards-model.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';

const siteMainElement = document.querySelector('.main');
const siteHeaderElement = document.querySelector('.header');

const cardsModel = new CardsModel();

const headerPresenter = new HeaderPresenter();
headerPresenter.init(siteHeaderElement);

const mainPresenter = new MainPresenter();
mainPresenter.init(siteMainElement, cardsModel);
