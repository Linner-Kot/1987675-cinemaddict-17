import { nanoid } from 'nanoid';
import { humanizeFilmPopupReleaseDate, humanizeFilmRuntime, humanizeCommentDate } from '../utils/film';
import AbstractStatefulView from '../framework/view/abstract-stateful-view.js';
import he from 'he';
import { remove } from '../framework/render';

const createPopupTemplate = (film) => {
  const {poster, ageRating, title, alternativeTitle, totalRating, director, writers, actors, release, runtime, genre, description} = film.filmInfo;
  const {watchlist, alreadyWatched, favorite} = film.userDetails;
  const {comments, newCommentEmoji, newCommentText, newComment} = film;

  let newCommentEmojiMarkup = '';

  if (newComment) {
    comments.push(newComment);
  }

  if (newCommentEmoji !== '') {
    newCommentEmojiMarkup = `<img src="./images/emoji/${newCommentEmoji}.png" width="55" height="55" alt="emoji"></img>`;
  }

  let commentsMarkup = '';

  comments.forEach((comment) => {
    const commentTemplate = `
    <li class="film-details__comment">
      <span class="film-details__comment-emoji">
        <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${he.encode(comment.comment)}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${comment.author}</span>
          <span class="film-details__comment-day">${humanizeCommentDate(comment.date)}</span>
          <button class="film-details__comment-delete" data-comment-id="${comment.id}">Delete</button>
        </p>
      </div>
    </li>`;
    commentsMarkup += commentTemplate;
  });

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="film-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src="${poster}" alt="">

              <p class="film-details__age">${ageRating}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${alternativeTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${totalRating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${humanizeFilmPopupReleaseDate(release.date)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${humanizeFilmRuntime(runtime)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${release.releaseCountry}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Genres</td>
                  <td class="film-details__cell">
                    <span class="film-details__genre">${genre[0]}</span>
                    <span class="film-details__genre">${genre[1]}</span>
                    <span class="film-details__genre">${genre[2]}</span></td>
                </tr>
              </table>

              <p class="film-details__film-description">
                ${description}
              </p>
            </div>
          </div>

          <section class="film-details__controls">
            <button type="button" class="film-details__control-button film-details__control-button--watchlist ${watchlist?'film-details__control-button--active':''}" id="watchlist" name="watchlist">Add to watchlist</button>
            <button type="button" class="film-details__control-button film-details__control-button--watched ${alreadyWatched?'film-details__control-button--active':''}" id="watched" name="watched">Already watched</button>
            <button type="button" class="film-details__control-button film-details__control-button--favorite ${favorite?'film-details__control-button--active':''}" id="favorite" name="favorite">Add to favorites</button>
          </section>
        </div>


        <div class="film-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${film.comments.length}</span></h3>

            <ul class="film-details__comments-list">
              ${commentsMarkup}
            </ul>

            <div class="film-details__new-comment">
              <div class="film-details__add-emoji-label">
                ${newCommentEmojiMarkup}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder='Select reaction below and write comment here' name="comment">${he.encode(newCommentText)}</textarea>
              </label>

              <div class="film-details__emoji-list">
                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
                <label class="film-details__emoji-label" for="emoji-smile">
                  <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
                <label class="film-details__emoji-label" for="emoji-sleeping">
                  <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
                <label class="film-details__emoji-label" for="emoji-puke">
                  <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
                </label>

                <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
                <label class="film-details__emoji-label" for="emoji-angry">
                  <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
                </label>
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class PopupView extends AbstractStatefulView {
  constructor(film) {
    super();
    this._state = PopupView.parseFilmToState(film);

    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._state);
  }

  static parseFilmToState = (film) => ({
    ...film,
    newCommentEmoji: '',
    newCommentText: '',
  });

  static parseStateToFilm = (state) => {
    const film = {...state};

    return film;
  };

  setPopupCloseButtonClickHandler = (callback) => {
    this._callback.popupCloseButtonClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#popupCloseButtonClickHandler);
  };

  setWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#watchlistClickHandler);
  };

  setWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#watchedClickHandler);
  };

  setFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#favoriteClickHandler);
  };

  #popupCloseButtonClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.popupCloseButtonClick();
  };

  #watchlistClickHandler = (evt) => {
    evt.preventDefault();
    const scrollPosition = this.element.scrollTop;
    this._callback.watchlistClick();
    this.element.scrollTo('', scrollPosition); //comment не работает
  };

  #watchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  };

  #favoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  };

  #emojiClickHandler = (evt) => {
    if (!evt.target.classList.contains('film-details__emoji-item')) {
      return;
    }

    const scrollPosition = this.element.scrollTop;

    evt.preventDefault();
    this.updateElement({
      newCommentEmoji: evt.target.value,
    });

    this.element.querySelectorAll('input').forEach((input) => {input.checked = false;});
    evt.target.checked = true;
    this.element.scrollTo('', scrollPosition);
  };

  #textInputHandler = (evt) => {
    evt.preventDefault();
    this._setState({
      newCommentText: evt.target.value,
    });
  };

  #textSubmitHandler = (evt) => {
    const scrollPosition = this.element.scrollTop;

    if (evt.key === 'Enter' && evt.ctrlKey && this._state.newCommentEmoji && this._state.newCommentText) {
      this._setState({
        newComment: {
          'id': nanoid(),
          'author': 'kot',
          'comment': this._state.newCommentText,
          'date': Date.now(),
          'emotion': this._state.newCommentEmoji,
        }
      });

      this.updateElement({
        newCommentText: '',
        newCommentEmoji: '',
      });
      this._state.newComment = null;

      this.element.scrollTo('', scrollPosition);
    }
  };

  #deleteCommentClickHandler = (evt) => {
    evt.preventDefault();
    console.log(evt.target.dataset.commentId);
  };

  #setInnerHandlers = () => {
    this.element.querySelector('.film-details__new-comment').addEventListener('click', this.#emojiClickHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('input', this.#textInputHandler);
    this.element.querySelector('.film-details__comment-input').addEventListener('keydown', this.#textSubmitHandler);
    this.element.querySelectorAll('.film-details__comment-delete').forEach((elem) => elem.addEventListener('click', this.#deleteCommentClickHandler));
  };

  _restoreHandlers = () => {
    this.#setInnerHandlers();
    this.setPopupCloseButtonClickHandler(this._callback.popupCloseButtonClick);
    this.setWatchlistClickHandler(this._callback.watchlistClick);
    this.setWatchedClickHandler(this._callback.watchedClick);
    this.setFavoriteClickHandler(this._callback.favoriteClick);
  };
}
