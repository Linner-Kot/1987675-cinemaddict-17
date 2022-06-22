import FilmsModel from './model/films-model.js';
import FooterPresenter from './presenter/footer-presenter.js';
import HeaderPresenter from './presenter/header-presenter.js';
import MainPresenter from './presenter/main-presenter.js';
import FilterPresenter from './presenter/filter-presenter.js';
import FilterModel from './model/filter-model.js';

const siteBody = document.body;
const mainElement = siteBody.querySelector('main');
const footerElement = siteBody.querySelector('footer');

const filmsModel = new FilmsModel();
const filterModel = new FilterModel();

const headerPresenter = new HeaderPresenter(siteBody);
headerPresenter.init();

const filterPresenter = new FilterPresenter(mainElement, filterModel, filmsModel);
filterPresenter.init();

const mainPresenter = new MainPresenter(mainElement, filmsModel, filterModel);
mainPresenter.init();

const footerPresenter = new FooterPresenter(footerElement, filmsModel.films.length);
footerPresenter.init();
