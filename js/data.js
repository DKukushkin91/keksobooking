'use strict';

(() => {
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
    PinSize,
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
    offerType,
    MapX,
    MapY
  };
})();
