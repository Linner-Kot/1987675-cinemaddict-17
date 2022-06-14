import { nanoid } from 'nanoid';
import { getRandomInteger, getRandomNumber } from '../utils/common';
import { generateComment } from './comments';

const generateTitle = () => {
  const titles = [
    'Made for Each Other',
    'Popeye the Sailor meets Sinbad the Sailor',
    'Sagebrush Trail',
    'Santa Claus Conquers the Martians',
    'The Dance of Life',
  ];

  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateTotalRating = () => getRandomNumber(0, 10).toFixed(1);

const generatePhoto = () => {
  const path = '/images/posters/';

  const photos = [
    'made-for-each-other.png',
    'popeye-meets-sinbad.png',
    'sagebrush-trail.jpg',
    'santa-claus-conquers-the-martians.jpg',
    'the-dance-of-life.jpg',
    'the-great-flamarion.jpg',
    'the-man-with-the-golden-arm.jpg',
  ];

  const randomIndex = getRandomInteger(0, photos.length - 1);

  return path + photos[randomIndex];
};

const generateAgeRating = () => getRandomInteger(0, 18);

const generateRuntime = () => getRandomInteger(30, 200);

const generateDirector = () => {
  const directors = [
    'Guy Ritchie',
    'Steven Spielberg',
    'George Lucas',
    'Christopher Nolan',
    'Quentin Tarantino',
  ];

  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateWriters = () => {
  const writersList = [
    'Asghar Farhadi',
    'Eric Roth',
    'Aaron Sorkin',
    'Woody Allen',
    'Lee Chang-dong',
    'Richard Linklater',
    'Lars von Trier',
    'Quentin Tarantino',
    'Sion Sono',
    'Kenneth Lonergan',
    'James Cameron',
    'Ingmar Bergman',
    'Charlie Kaufman',
    'Alejandro Amenábar',
    'Paul Haggis',
  ];

  const writers = [];

  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    const randomIndex = getRandomInteger(0, writersList.length - 1);
    if (!writers.includes(writersList[randomIndex])) {
      writers.push(writersList[randomIndex]);
    } else {
      i--;
    }
  }

  return writers.join(', ');
};

const generateDate = () => {
  const maxDate = Date.now();
  const timestamp = Math.floor(Math.random() * maxDate);

  return new Date(timestamp);
};

const generateActors = () => {
  const actorsList = [
    'Jack Nicholson',
    'Marlon Brando',
    'Robert De Niro',
    'Al Pacino',
    'Daniel Day-Lewis',
    'Dustin Hoffman',
    'Tom Hanks',
    'Anthony Hopkins',
    'Paul Newman',
    'Denzel Washington',
    'Spencer Tracy',
    'Laurence Olivier',
    'Jack Lemmon',
    'Michael Caine',
    'James Stewart',
  ];

  const actors = [];

  for (let i = 0; i < getRandomInteger(1, 3); i++) {
    const randomIndex = getRandomInteger(0, actorsList.length - 1);
    if (!actors.includes(actorsList[randomIndex])) {
      actors.push(actorsList[randomIndex]);
    } else {
      i--;
    }
  }
  return actors.join(', ');
};

const generateReleaseCountry = () => {
  const countries = [
    'Russia',
    'USA',
    'England',
    'Finland',
    'Spain',
    'Italy',
    'Germany',
  ];

  const randomIndex = getRandomInteger(0, countries.length - 1);

  return countries[randomIndex];
};

const generateGenres = () => {
  const genresList = [
    'Action',
    'Adventure',
    'Comedy',
    'Crime',
    'Mistery',
    'Fantasy',
  ];

  const genres = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = getRandomInteger(0, genresList.length - 1);
    if (!genres.includes(genresList[randomIndex])) {
      genres.push(genresList[randomIndex]);
    } else {
      i--;
    }
  }

  return genres;
};

const generateDescription = () => {
  const descriptionList = [
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    'Cras aliquet varius magna, non porta ligula feugiat eget.',
    'Fusce tristique felis at fermentum pharetra.',
    'Aliquam id orci ut lectus varius viverra.',
    'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.',
    'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.',
    'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.',
    'Sed sed nisi sed augue convallis suscipit in sed felis.',
    'Aliquam erat volutpat. Nunc fermentum tortor ac porta dapibus.',
    'In rutrum ac purus sit amet tempus.',
  ];

  const description = [];

  for (let i = 0; i < 3; i++) {
    const randomIndex = getRandomInteger(0, descriptionList.length - 1);
    if (!description.includes(descriptionList[randomIndex])) {
      description.push(descriptionList[randomIndex]);
    } else {
      i--;
    }
  }

  return description;
};

const comments = [];
const randomCommentsCount = getRandomInteger(1, 100);
for (let i = 0; i < randomCommentsCount; i++) {
  comments.push(generateComment());
}


export const generateFilm = () => {
  const id = nanoid();

  return {
    id,
    comments: Array.from({length: getRandomInteger(1, 10)}, () => generateComment(id)),
    filmInfo: {
      title: generateTitle(),
      alternativeTitle: generateTitle(),
      totalRating: generateTotalRating(),
      poster: generatePhoto(),
      ageRating: generateAgeRating(),
      director: generateDirector(),
      writers: generateWriters(),
      actors: generateActors(),
      release: {
        date: generateDate(),
        releaseCountry: generateReleaseCountry(),
      },
      runtime: generateRuntime(),
      genre: generateGenres(),
      description: generateDescription(),
    },
    userDetails: {
      watchlist: Boolean(getRandomInteger(0, 1)),
      alreadyWatched: Boolean(getRandomInteger(0, 1)),
      watchingDate: '2019-04-12T16:12:32.554Z',
      favorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
