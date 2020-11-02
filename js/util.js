'use strict';

(() => {
  const getRandomNumbers = (min, max) => Math.round(Math.random() * (max - min) + min);
  const getRandomItem = (items) => items[Math.round(Math.floor(Math.random() * items.length))];
  const getRandom = (arr) => arr.slice(0, getRandomNumbers(1, arr.length));
  const createPin = (element, fragment) => element.appendChild(fragment);
  const writeAddress = (addressX, addressY) => {
    document
            .querySelector(`#address`)
            .value = `${addressX}, ${addressY}`;
  };
  const setDisabled = (element, shouldDisable) => {
    for (let value of element) {
      value.disabled = shouldDisable;
    }
  };

  window.util = {
    getRandomNumbers,
    getRandomItem,
    getRandom,
    createPin,
    writeAddress,
    setDisabled
  };
})();
