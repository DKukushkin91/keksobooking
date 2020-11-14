'use strict';

const getRandomNumbers = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomItem = (items) => items[Math.round(Math.floor(Math.random() * items.length))];
const getRandom = (arr) => arr.slice(0, getRandomNumbers(1, arr.length));
const createElement = (element, fragment) => element.appendChild(fragment);
const setDisabled = (element, shouldDisable) => {
  for (let value of element) {
    value.disabled = shouldDisable;
  }
};

const Url = {
  POST: `https://21.javascript.pages.academy/keksobooking`,
  GET: `https://21.javascript.pages.academy/keksobooking/data`
};

window.util = {
  getRandomNumbers,
  getRandomItem,
  getRandom,
  createElement,
  setDisabled,
  Url,
};
