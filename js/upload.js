'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking`;
  const errorTemplate = document.querySelector(`#error`)
                                .content;
  const successTemplate = document.querySelector(`#success`)
                                .content;
  const hideError = () => {
    document
            .querySelector(`main`)
            .querySelector(`.error`).remove();
  };

  const hideSuccess = () => {
    document
            .querySelector(`main`)
            .querySelector(`.success`).remove();
  };

  const showError = () => {
    const errorElement = errorTemplate.cloneNode(true);
    document.querySelector(`main`).append(errorElement);
    document.addEventListener(`click`, hideError);
    document.addEventListener(`keydown`, (evt) => {
      if (evt.key === `Escape`) {
        hideError();
      }
    });
  };

  const showSuccess = () => {
    const successElement = successTemplate.cloneNode(true);
    document.querySelector(`main`).append(successElement);
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
