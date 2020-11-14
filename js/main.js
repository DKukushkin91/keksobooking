'use strict';
const cardListElement = document.querySelector(`.map__filters-container`);
const mapElement = document.querySelector(`.map`);
const mapPinListElement = document.querySelector(`.map__pins`);

const setMapActive = () => {
  mapElement.classList.remove(`map--faded`);
};

const setActivePage = () => {
  createElements();
  setMapActive();
  window.util.setDisabled(document
    .querySelector(`.ad-form`)
    .querySelectorAll(`fieldset`), false);
  window.util.setDisabled(document
    .querySelector(`.map__filters`), false);
  window.form.setActiveForm();
  window.form.formRestartHandler();
  window.form.priceValidationHandler();
};

const createElements = () => {
  const fragmentPin = document.createDocumentFragment();
  window.filter.getFilterMapAd();

  for (let pin of window.filter.getFilterMapAd()) {
    const pinElement = window.pins.getRenderPin(pin);
    pinOpenCardHandler(pinElement, pin);
    fragmentPin.appendChild(pinElement);
  }
  window.util.createElement(mapPinListElement, fragmentPin);
};

const pinOpenCardHandler = (element, pin) => {
  element.addEventListener(`click`, () => {
    const popupElement = window.card.getRenderCard(pin);
    if (document.querySelector(`.map__card`)) {
      window.card.popupCloseHandler();
    }
    document.addEventListener(`keydown`, window.card.escPressHandler);
    window.pins.removeActivePin();
    element.classList.add(`map__pin--active`);
    mapElement.insertBefore(popupElement, cardListElement);
  });
};

const cardRemove = () => {
  const mapPopupElement = document.querySelector(`.map__card`);
  if (mapPopupElement) {
    mapPopupElement.remove();
  }
};

const pinsRemove = () => {
  document.querySelectorAll(`.map__pins [type="button"]`)
    .forEach((button) => button.remove());
};

window.main = {
  setActivePage,
  pinsRemove,
  cardRemove,
  createElements,
};

