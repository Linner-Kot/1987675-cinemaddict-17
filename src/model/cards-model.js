import { generateFilm } from '../mock/film';

export default class CardsModel {
  cards = Array.from({length: 7}, generateFilm);

  getCards = () => this.cards;
}
