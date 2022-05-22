import { generateFilm } from '../mock/film';

export default class CardsModel {
  #cards = Array.from({length: 12}, generateFilm);

  get cards () {
    return this.#cards;
  }
}
