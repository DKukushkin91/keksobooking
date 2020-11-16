'use strict';

const formRoomElement = document.querySelector(`#room_number`);
const formCapacityElement = document.querySelector(`#capacity`);
const formTypeElement = document.querySelector(`#type`);
const formPriceElement = document.querySelector(`#price`);
const formElement = document.querySelector(`.ad-form`);
const formResetElement = formElement.querySelector(`.ad-form__reset`);
const formSubmitElement = formElement.querySelector(`.ad-form__submit`);

window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);

const setActiveElement = () => {
  formElement.classList.remove(`ad-form--disabled`);
};

const roomsValidationHandler = () => {
  let validationMessage = ``;
  if (formRoomElement.value < formCapacityElement.value || formRoomElement.value !== `100` && formCapacityElement.value === `0` || formRoomElement.value === `100` && formCapacityElement.value > `0`) {
    validationMessage = `Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей`;
  }
  formRoomElement.setCustomValidity(validationMessage);
};

formSubmitElement.addEventListener(`click`, roomsValidationHandler);

const setElementAttribute = (element, attribute, value) => {
  element.setAttribute(attribute, value);
};

const priceValidationHandler = () => {
  let minPrice = 0;

  switch (formTypeElement.value) {
    case `bungalow`:
      minPrice = window.data.MinPrice.BUNGALOW;
      break;
    case `flat`:
      minPrice = window.data.MinPrice.FLAT;
      break;
    case `house`:
      minPrice = window.data.MinPrice.HOUSE;
      break;
    case `palace`:
      minPrice = window.data.MinPrice.PALACE;
      break;
  }

  setElementAttribute(formPriceElement, `placeholder`, minPrice);
  setElementAttribute(formPriceElement, `min`, minPrice);
};

priceValidationHandler();
formTypeElement.addEventListener(`change`, priceValidationHandler);

const formTimeInElement = document.querySelector(`#timein`);
const formTimeOutElement = document.querySelector(`#timeout`);

const timeValidationHandler = (evt) => {
  formTimeInElement.value = evt.target.value;
  formTimeOutElement.value = evt.target.value;
};

formTimeInElement.addEventListener(`change`, timeValidationHandler);
formTimeOutElement.addEventListener(`change`, timeValidationHandler);


const removePins = () => {
  document.querySelectorAll(`.map__pins [type="button"]`)
    .forEach((button) => button.remove());
};

const removeCard = () => {
  const mapPopupElement = document.querySelector(`.map__card`);
  if (mapPopupElement) {
    mapPopupElement.remove();
  }
};

const restartPage = () => {
  const mapFilters = document.querySelector(`.map__filters`);
  formElement.reset();
  mapFilters.reset();
  formElement.classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  removePins();
  window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);
  window.util.setDisabled(mapFilters, true);
  removeCard();
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.pins.pinActivePageHandler);
  window.pins.setElementStart();
  window.pins.loadPinCoordinate();
  window.picture.removePreview();
  priceValidationHandler();
};

const buttonRestartHandler = () => {
  const restartHandler = (evt) => {
    evt.preventDefault();
    formResetElement.removeEventListener(`click`, restartHandler);
    restartPage();
  };
  formResetElement.addEventListener(`click`, restartHandler);
};

formElement.addEventListener(`submit`, (evt) => {
  formSubmitElement.removeEventListener(`click`, roomsValidationHandler);
  window.backend.save(new FormData(formElement), window.message.successShowHandler, window.message.errorShowHandler);
  evt.preventDefault();
});

window.form = {
  setActiveElement,
  priceValidationHandler,
  buttonRestartHandler,
  removePins,
  removeCard,
  restartPage
};
