'use strict';

const mainBlockElement = document.querySelector(`main`);
const errorTemplate = document.querySelector(`#error`)
  .content;
const successTemplate = document.querySelector(`#success`)
  .content;

const errorHideHandler = () => {
  const messageErrorElement = document.querySelector(`.error`);
  if (messageErrorElement) {
    messageErrorElement.remove();
  }
};

const successHideHandler = () => {
  const messageSuccessElement = document.querySelector(`.success`);
  if (messageSuccessElement) {
    messageSuccessElement.remove();
  }
};

const errorShowHandler = () => {
  const errorCloneNode = errorTemplate.cloneNode(true);
  mainBlockElement.append(errorCloneNode);
  document.removeEventListener(`click`, errorHideHandler);
  document.removeEventListener(`keydown`, escPressHandler);
};

const successShowHandler = () => {
  window.form.restartPage();
  const successCloneNode = successTemplate.cloneNode(true);
  mainBlockElement.append(successCloneNode);
  document.removeEventListener(`click`, successHideHandler);
  document.removeEventListener(`keydown`, escPressHandler);
};

const escPressHandler = (evt) => {
  if (evt.key === `Escape` && document.querySelector(`.error`)) {
    evt.preventDefault();
    errorHideHandler();
  } else if (evt.key === `Escape` && document.querySelector(`.success`)) {
    evt.preventDefault();
    successHideHandler();
  }
};


window.message = {
  escPressHandler,
  errorShowHandler,
  successShowHandler,
  successHideHandler
};
