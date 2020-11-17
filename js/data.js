'use strict';

const MAIN_PIN_SIZE = 65;

const PinStart = {
  X: 570,
  Y: 375
};

const SmallPin = {
  WIDTH: 50,
  HEIGHT: 70
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
  MAIN_PIN_SIZE,
  Price,
  Room,
  MinPrice,
  offerType,
  MapX,
  MapY,
  PinStart,
  TailSize,
  SmallPin
};

