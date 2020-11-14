'use strict';

const mainBlockElement = document.querySelector(`main`);
const errorTemplate = document.querySelector(`#error`)
  .content;
const successTemplate = document.querySelector(`#success`)
  .content;

const hideError = () => {
  if (mainBlockElement.querySelector(`.error`)) {
    mainBlockElement.querySelector(`.error`).remove();
  }
};

const hideSuccess = () => {
  if (mainBlockElement.querySelector(`.success`)) {
    mainBlockElement.querySelector(`.success`).remove();
  }
};

const errorShowHandler = () => {
  const errorCloneNode = errorTemplate.cloneNode(true);
  mainBlockElement.append(errorCloneNode);
  document.addEventListener(`click`, hideError);
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      hideError();
    }
  });
};

const successShowHandler = () => {
  const successElement = successTemplate.cloneNode(true);
  mainBlockElement.append(successElement);
  document.addEventListener(`click`, hideSuccess);
  document.addEventListener(`keydown`, (evt) => {
    if (evt.key === `Escape`) {
      hideSuccess();
    }
  });
};

const clientUpload = (data, onSuccess) => {
  const xhr = new XMLHttpRequest();
  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === window.load.StatusCode.OK) {
      onSuccess(xhr.response);
      window.form.restartPage();
      successShowHandler();
    } else {
      errorShowHandler();
    }
  });

  xhr.addEventListener(`error`, () => {
    errorShowHandler();
  });

  xhr.addEventListener(`timeout`, () => {
    errorShowHandler();
  });

  xhr.timeout = window.load.TIMEOUT_IN_MS;

  xhr.open(`POST`, window.util.Url.POST);
  xhr.send(data);
};

window.upload = {
  clientUpload
};
