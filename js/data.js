'use strict';

const PinStart = {
  X: `${570}px`,
  Y: `${375}px`
};

const PinSize = {
  WIDTH: 65,
  HEIGHT: 65,
};

const TailSize = {
  WIDTH: 10,
  HEIGHT: 22
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
  MIN: 10000,
  MAX: 50000,
};

const Room = {
  MIN: 1,
  MAX: 3,
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
  Price,
  Room,
  MinPrice,
  offerType,
  MapX,
  MapY,
  PinStart,
  TailSize
};

