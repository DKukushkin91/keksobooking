'use strict';

(() => {
  const URL = `https://21.javascript.pages.academy/keksobooking/data`;
  const StatusCode = {
    OK: 200
  };
  const TIMEOUT_IN_MS = 10000;
  const errorTemplate = document.querySelector(`#error`)
  .content
  .querySelector(`.error`);

  const showErrorElement = (text) => {
    const errorElement = errorTemplate.cloneNode(true);
    errorElement
                .querySelector(`.error__message`)
                .textContent = text;
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
    xhr.addEventListener(`timeout`, function () {
      onError(showErrorElement(`Запрос не успел выполниться за ${xhr.timeout} мс`));
    });

    xhr.timeout = TIMEOUT_IN_MS;

    xhr.open(`GET`, URL);
    xhr.send();
  };

  const PinSize = {
    WIDTH: 65,
    HEIGHT: 65
  };

  const MapX = {
    MIN: 0,
    MAX: 1200
  };

  const MapY = {
    MIN: 130,
    MAX: 630
  };

  const Price = {
    MIN: 1,
    MAX: 50000,
  };
  const Room = {
    MIN: 1,
    MAX: 3,
  };

  const Guest = {
    MIN: 1,
    MAX: 2,
  };

  const LocationX = {
    MIN: 130,
    MAX: 1100,
  };

  const LocationY = {
    MIN: 130,
    MAX: 630,
  };

  const MinPrice = {
    BUNGALOW: 0,
    FLAT: 1000,
    HOUSE: 5000,
    PALACE: 10000,
  };

  const offerType = {
    flat: `Квартира`,
    house: `Дом`,
    palace: `Дворец`,
    bungalow: `Бунгало`
  };

  window.data = {
    dataRetrivial,
    PinSize,
    Price,
    Room,
    Guest,
    LocationX,
    LocationY,
    MinPrice,
    offerType,
    MapX,
    MapY
  };
})();
