import { nanoid } from 'nanoid';
import { getRandomInteger } from '../utils/common';

const generateAuthor = () => {
  const names = [
    'Vasya',
    'Vova',
    'Keks',
  ];

  const surnames = [
    'Asafev',
    'Krejin',
    'Shestovich',
  ];

  return `${names[getRandomInteger(0, names.length - 1)]} ${surnames[getRandomInteger(0, surnames.length - 1)]}`;
};

const generateMessage = () => {
  const messages = [
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

  const randomIndex = getRandomInteger(0, messages.length - 1);

  return messages[randomIndex];
};

const generateDate = () => Date.now() - getRandomInteger(100000000, 9999999999);

const generateEmotion = () => {
  const emotions = [
    'smile',
    'sleeping',
    'puke',
    'angry'
  ];

  const randomIndex = getRandomInteger(0, emotions.length - 1);

  return emotions[randomIndex];
};


export const generateComment = () => ({
  'id': nanoid(1),
  'author': generateAuthor(),
  'comment': generateMessage(),
  'date': generateDate(),
  'emotion': generateEmotion(),
});
