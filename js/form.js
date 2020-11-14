'use strict';

const formAddressElement = document.querySelector(`#address`);
const formRoomElement = document.querySelector(`#room_number`);
const formCapacityElement = document.querySelector(`#capacity`);
const formTypeElement = document.querySelector(`#type`);
const formPriceElement = document.querySelector(`#price`);
const formElement = document.querySelector(`.ad-form`);
const formResetElement = formElement.querySelector(`.ad-form__reset`);
const formSubmitElement = formElement.querySelector(`.ad-form__submit`);

const writeAddress = (addressX, addressY) => {
  formAddressElement.value = `${addressX}, ${addressY}`;
};

window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);

const setActiveForm = () => {
  formElement.classList.remove(`ad-form--disabled`);
};

const restartPage = () => {
  const mapFilters = document.querySelector(`.map__filters`);
  formElement.reset();
  mapFilters.reset();
  formElement.classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  window.main.pinsRemove();
  window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);
  window.util.setDisabled(mapFilters, true);
  window.main.cardRemove();
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.pins.pinActivePageHandler);
  window.pins.setPinStart();
  window.pins.setPinCoordinate();
  window.picture.removePreview();
  priceValidationHandler();
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

const formRestartHandler = () => {
  const restartHandler = (evt) => {
    evt.preventDefault();
    formResetElement.removeEventListener(`click`, restartHandler);
    restartPage();
  };
  formResetElement.addEventListener(`click`, restartHandler);
};

formElement.addEventListener(`submit`, (evt) => {
  window.upload.clientUpload(new FormData(formElement), () => {
  });
  evt.preventDefault();
});

window.form = {
  setActiveForm,
  priceValidationHandler,
  formRestartHandler,
  writeAddress,
  restartPage
};
