import { generateFilm } from '../mock/film';

export default class PopupModel {
  popup = Array.from({length: 7}, generateFilm);

  getPopup = () => this.popup;
}
