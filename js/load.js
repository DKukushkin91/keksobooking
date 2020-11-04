'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  // const errorTemplate = document.querySelector(`#error`)
  // .content
  // .querySelector(`.error`);
  // const errorElement = errorTemplate.cloneNode(true);

  const showErrorElement = (text) => {
    const errorElement = document.createElement(`div`);
    errorElement.style = `
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 800px;
      height: 50%;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 15px;
      background-color: rgba(0, 0, 0, 0.9);
      color: #fff;
      font-weight: 700;
      line-height: 1.5;
      z-index: 100`;
    errorElement.textContent = text;
    document
            .querySelector(`.map`)
            .append(errorElement);
    return errorElement;
  };

  const dataRetrivial = (onSuccess, onError) => {
    const xhr = new XMLHttpRequest();
    xhr.responseType = `json`;

    xhr.addEventListener(`load`, () => {
      if (xhr.status === StatusCode.OK) {
        onSuccess(xhr.response);
      } else {
        onError(showErrorElement(`Статус ответа: ${xhr.status} ${xhr.statusText}`));
      }
    });
    xhr.addEventListener(`error`, () => {
      onError(showErrorElement(`Произошла ошибка соединения`));
    });
    xhr.addEventListener(`timeout`, () => {
      onError(showErrorElement(`Запрос не успел выполниться за ${xhr.timeout} мс`));
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  window.load = {
    dataRetrivial,
  };
})();
