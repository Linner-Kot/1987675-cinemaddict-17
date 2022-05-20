import { generateFilm } from '../mock/film';

export default class CardsModel {
  #cards = Array.from({length: 7}, generateFilm);

  get cards () {
    return this.#cards;
  }
}
