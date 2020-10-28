'use strict';

(() => {
  window.util = {
    getRandomNumbers: (min, max) => Math.round(Math.random() * (max - min) + min),
    getRandomItem: (items) => items[Math.round(Math.floor(Math.random() * items.length))],
    getRandom: (arr) => arr.slice(0, window.util.getRandomNumbers(1, arr.length)),
    setElementAttribute: (element, attribute, value) => element.setAttribute(attribute, value),
    setDisabled: (element, shouldDisable) => {
      for (let value of element) {
        value.disabled = shouldDisable;
      }
    }
  };
})();
