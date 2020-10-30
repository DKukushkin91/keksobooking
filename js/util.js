'use strict';

(() => {
  const getRandomNumbers = (min, max) => Math.round(Math.random() * (max - min) + min);
  const getRandomItem = (items) => items[Math.round(Math.floor(Math.random() * items.length))];
  const getRandom = (arr) => arr.slice(0, getRandomNumbers(1, arr.length));
  const writeAddress = (addressX, addressY) => {
    document.querySelector.addressField.value = `${addressX}, ${addressY}`;
  };
  const setDisabled = (element, shouldDisable) => {
    for (let value of element) {
      value.disabled = shouldDisable;
    }
  };
  const createElement = (fragment) => {
    const pinListElement = document.querySelector(`.map__pins`);
    pinListElement.appendChild(fragment);
  };
  const setElementAttribute = (element, attribute, value) => {
    element.setAttribute(attribute, value);
  };

  const fragmentPin = () => document.createDocumentFragment();

  window.util = {
    getRandomNumbers,
    getRandomItem,
    getRandom,
    writeAddress,
    setDisabled,
    createElement,
    setElementAttribute,
    fragmentPin,
  };
})();
