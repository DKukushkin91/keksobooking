'use strict';

const PinStart = {
  X: 570,
  Y: 375
};

const SmallPin = {
  WIDTH: 50,
  HEIGHT: 70
}

const PinSize = {
  WIDTH: 65,
  HEIGHT: 65,
  POINTER: 5
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
  MIN: 138,
  MAX: 551
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
  TailSize,
  SmallPin
};

