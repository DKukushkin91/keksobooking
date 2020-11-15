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
  if (document.querySelector(`.map--faded`)){
  formAddressElement.value = `${window.data.PinStart.X + window.data.PinSize.WIDTH / 2 - window.data.PinSize.POINTER / 2},
 ${window.data.PinStart.Y}`;
  } else {
    formAddressElement.value = `${Math.floor(addressX + window.data.TailSize.WIDTH + window.data.TailSize.HEIGHT)},
 ${Math.floor(addressY + window.data.TailSize.HEIGHT)}`;
  }
};
writeAddress();
window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);

const setActiveElement = () => {
  formElement.classList.remove(`ad-form--disabled`);
};

const restartPage = () => {
  const mapFilters = document.querySelector(`.map__filters`);
  formElement.reset();
  mapFilters.reset();
  formElement.classList.add(`ad-form--disabled`);
  document.querySelector(`.map`).classList.add(`map--faded`);
  window.main.removePins();
  window.util.setDisabled(formElement.querySelectorAll(`fieldset`), true);
  window.util.setDisabled(mapFilters, true);
  window.main.removeCard();
  document.querySelector(`.map__pin--main`).addEventListener(`mousedown`, window.pins.pinActivePageHandler);
  window.pins.setElementStart();
  window.pins.setElementCoordinate();
  window.picture.removePreview();
  priceValidationHandler();
};

const roomsValidationHandler = () => {
  let validationMessage = ``;
  formSubmitElement.removeEventListener(`click`, roomsValidationHandler);
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

const buttonRestartHandler = () => {
  const restartHandler = (evt) => {
    evt.preventDefault();
    formResetElement.removeEventListener(`click`, restartHandler);
    restartPage();
  };
  formResetElement.addEventListener(`click`, restartHandler);
};

formElement.addEventListener(`submit`, (evt) => {
  window.upload.dataSendingHandler(new FormData(formElement), () => {
  });
  evt.preventDefault();
});

window.form = {
  setActiveElement,
  priceValidationHandler,
  buttonRestartHandler,
  writeAddress,
  restartPage
};
