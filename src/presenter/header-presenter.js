import { render } from '../render';
import UserRankView from '../view/user-rank-view';

export default class HeaderPresenter {
  init = (headerContainer) => {
    this.headerContainer = headerContainer;

    render(new UserRankView(), this.headerContainer);
  };
}
