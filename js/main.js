'use strict';

const cardListElement = document.querySelector(`.map__filters-container`);
const mapElement = document.querySelector(`.map`);
const mapPinListElement = document.querySelector(`.map__pins`);

const setMapActive = () => {
  mapElement.classList.remove(`map--faded`);
};
window.filter.getFilteredData();
const createElements = () => {
  const fragmentPin = document.createDocumentFragment();
  for (let pin of window.filter.getFilteredData()) {
    const pinElement = window.pins.getRenderElement(pin);
    pinOpenCardHandler(pinElement, pin);
    fragmentPin.appendChild(pinElement);
  }
  window.util.createElement(mapPinListElement, fragmentPin);
};

const pinOpenCardHandler = (element, pin) => {
  element.addEventListener(`click`, () => {
    const popupElement = window.card.getRenderElement(pin);
    if (document.querySelector(`.map__card`)) {
      window.card.popupCloseHandler();
    }
    document.addEventListener(`keydown`, window.card.escPressHandler);
    window.pins.removeActiveElement();
    element.classList.add(`map__pin--active`);
    mapElement.insertBefore(popupElement, cardListElement);
  });
};

const setActivePage = () => {
  createElements();
  setMapActive();
  window.util.setDisabled(document
    .querySelector(`.ad-form`)
    .querySelectorAll(`fieldset`), false);
  window.util.setDisabled(document
    .querySelector(`.map__filters`), false);
  window.form.setActiveElement();
  window.form.buttonRestartHandler();
  window.form.priceValidationHandler();
};

window.main = {
  setActivePage,
  createElements,
};

