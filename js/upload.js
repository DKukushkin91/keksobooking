'use strict';

(() => {
  const mainBlock = document.querySelector(`main`);
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const errorTemplate = document.querySelector(`#error`)
                                .content;
  const successTemplate = document.querySelector(`#success`)
                                  .content;

  const hideError = () => {
    if (mainBlock.querySelector(`.error`)) {
      mainBlock.querySelector(`.error`).remove();
    }
  };

  const hideSuccess = () => {
    if (mainBlock.querySelector(`.success`)) {
      mainBlock.querySelector(`.success`).remove();
    }
  };

  const showError = () => {
    const errorElement = errorTemplate.cloneNode(true);
    mainBlock.append(errorElement);
    document.addEventListener(`click`, hideError);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        hideError();
      }
    });
  };

  const showSuccess = () => {
    const successElement = successTemplate.cloneNode(true);
    mainBlock.append(successElement);
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
        window.util.restartPage();
        showSuccess();
      } else {
        showError();
      }
    });

    xhr.addEventListener(`error`, () => {
      showError();
    });

    xhr.addEventListener(`timeout`, () => {
      showError();
    });

    xhr.timeout = window.load.TIMEOUT_IN_MS;

    xhr.open(`POST`, URL);
    xhr.send(data);
  };

  window.upload = {
    clientUpload
  };
})();
