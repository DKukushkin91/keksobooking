'use strict';

// data.js
(() => {
  const WIDTH_PIN = 40;
  const HEIGHT_PIN = 40;
  const MAX_PINS = 8;
  const TITLE_OFFER = `Лучшее предложение!`;
  const TYPES_OFFER = [`palace`, `flat`, `house`, `bungalow`];
  const CHECKIN_OFFER = [`12.00`, `13.00`, `14.00`];
  const CHECKOUT_OFFER = CHECKIN_OFFER;
  const DESCRIPTION_OFFER = `Всё включено!`;
  const PHOTOS_OFFER = [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
  ];
  const FEATURES_OFFER = [
    `wifi`,
    `dishwasher`,
    `parking`,
    `washer`,
    `elevator`,
    `conditioner`,
  ];

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

  const fragmentPin = document.createDocumentFragment();
  const mapBooking = document.querySelector(`.map`);
  const pinListElement = document.querySelector(`.map__pins`);
  const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

  const offerType = {
    flat: `Квартира`,
    house: `Дом`,
    palace: `Дворец`,
    bungalow: `Бунгало`
  };

  window.data = {
    WIDTH_PIN,
    HEIGHT_PIN,
    MAX_PINS,
    TITLE_OFFER,
    TYPES_OFFER,
    CHECKIN_OFFER,
    CHECKOUT_OFFER,
    DESCRIPTION_OFFER,
    PHOTOS_OFFER,
    FEATURES_OFFER,
    Price,
    Room,
    Guest,
    LocationX,
    LocationY,
    MinPrice,
    fragmentPin,
    mapBooking,
    pinListElement,
    pinTemplate,
    offerType
  };
})();
