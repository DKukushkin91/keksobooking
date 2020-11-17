/* eslint-disable no-console */
'use strict';

const mainBlockElement = document.querySelector(`main`);
const errorTemplate = document.querySelector(`#error`)
  .content;
const successTemplate = document.querySelector(`#success`)
  .content;

const messageHideHandler = (element, foo) => {
  if (element) {
    element.remove();
  }
  document.removeEventListener(`click`, foo);
  document.removeEventListener(`keydown`, escPressHandler);
  window.form.restartPage();
};

const errorHideHandler = () => {
  const messageErrorElement = document.querySelector(`.error`);
  messageHideHandler(messageErrorElement, errorHideHandler);
};

const successHideHandler = () => {
  const messageSuccessElement = document.querySelector(`.success`);
  messageHideHandler(messageSuccessElement, successHideHandler);
};

const escPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    evt.preventDefault();
    if (document.querySelector(`.error`)) {
      errorHideHandler();
    } else if (document.querySelector(`.success`)) {
      successHideHandler();
    }
  }
};

const errorShowHandler = () => {
  const errorCloneNode = errorTemplate.cloneNode(true);
  mainBlockElement.append(errorCloneNode);
  document.addEventListener(`click`, errorHideHandler);
  document.addEventListener(`keydown`, escPressHandler);
};


const successShowHandler = () => {
  const successCloneNode = successTemplate.cloneNode(true);
  mainBlockElement.append(successCloneNode);
  document.addEventListener(`click`, successHideHandler);
  document.addEventListener(`keydown`, escPressHandler);
};

window.message = {
  errorShowHandler,
  successShowHandler,
  successHideHandler
};
