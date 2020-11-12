'use strict';

const getRandomNumbers = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomItem = (items) => items[Math.round(Math.floor(Math.random() * items.length))];
const getRandom = (arr) => arr.slice(0, getRandomNumbers(1, arr.length));
const createPin = (element, fragment) => element.appendChild(fragment);
const writeAddress = (addressX, addressY) => {
  document
            .querySelector(`#address`)
            .value = `${addressX}, ${addressY}`;
};
const Url = {
  POST: `https://21.javascript.pages.academy/keksobooking`,
  GET: `https://21.javascript.pages.academy/keksobooking/data`
};
const setDisabled = (element, shouldDisable) => {
  for (let value of element) {
    value.disabled = shouldDisable;
  }
};

const onPinStart = () => {
  document.querySelector(`.map__pin--main`)
            .style.top = window.data.PinStart.Y;
  document.querySelector(`.map__pin--main`)
            .style.left = window.data.PinStart.X;
};

const onPinsRemove = () => {
  document.querySelectorAll(`.map__pins [type="button"]`)
            .forEach((button) => button.remove());
};

const onCardRemove = () => {
  if (document.querySelector(`.map__card`)) {
    document.querySelector(`.map__card`).remove();
  }
};

const restartPage = () => {
  document.querySelector(`.ad-form`)
            .reset();
  document.querySelector(`.map__filters`)
            .reset();

  document.querySelector(`.ad-form`)
            .classList.add(`ad-form--disabled`);
  document.querySelector(`.map`)
            .classList.add(`map--faded`);
  onPinsRemove();
  window.util.setDisabled(
      document.querySelector(`.ad-form`)
                .querySelectorAll(`fieldset`), true);
  window.util.setDisabled(
      document.querySelector(`.map__filters`), true);
  onCardRemove();
  document.querySelector(`.map__pin--main`)
            .addEventListener(`mousedown`, window.pins.onPinMainActive);
  window.util.onPinStart();
  window.pins.pinCoordinate();
  window.picture.removePreview();
};

window.util = {
  getRandomNumbers,
  getRandomItem,
  getRandom,
  createPin,
  writeAddress,
  setDisabled,
  onPinStart,
  restartPage,
  onCardRemove,
  onPinsRemove,
  Url
};
