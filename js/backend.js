
'use strict';

const URL_SAVE = `https://21.javascript.pages.academy/keksobooking`;
const URL_LOAD = `https://21.javascript.pages.academy/keksobooking/data`;
const TIMEOUT_IN_MS = 3000;
const StatusCode = {
  OK: 200,
  BAD: 400,
  NOT_FOUND: 404,
  ERROR: 500
};

const getShowErrorElement = (text) => {
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


const serverRequestHandler = (URL, method, data, onLoad, onError) => {
  let xhr = new XMLHttpRequest();
  xhr.responseType = `json`;
  xhr.timeout = TIMEOUT_IN_MS;
  xhr.open(method, URL);

  xhr.addEventListener(`load`, () => {
    switch (xhr.status) {
      case StatusCode.OK:
        onLoad(xhr.response);
        break;
      case StatusCode.BAD:
        onError(`Неправильный запрос.  Код ошибки ${xhr.status}`);
        break;
      case StatusCode.NOT_FOUND:
        onError(`Страница не найдена. Код ошибки ${xhr.status}`);
        break;
      case StatusCode.ERROR:
        onError(`Внутренняя ошибка сервера. Код ошибки ${xhr.status}`);
        break;
      default:
        onError(`При загрузке произошла ошибка ${xhr.status} . Повторите попытку позже.`);
    }
  });

  xhr.addEventListener(`error`, () => {
    onError(getShowErrorElement(`Произошла ошибка соединения`));
  });

  xhr.addEventListener(`timeout`, () => {
    onError(getShowErrorElement(`Запрос не успел выполниться за ${xhr.timeout} мс`));
  });

  xhr.send(data);

};

window.backend = {
  save: (data, onLoad, onError) => {
    serverRequestHandler(URL_SAVE, `POST`, data, onLoad, onError);
  },

  load: (onError) => {
    serverRequestHandler(URL_LOAD, `GET`, null, onError);
  }
};
