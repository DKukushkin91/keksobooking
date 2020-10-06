'use strict';

const WIDTH_PIN = 40;
const HEIGHT_PIN = 40;
const MAX_PINS = 8;
const TITLE_OFFER = ``;
const ADDRESS_OFFER = `{{location.x}}, {{location.y}}`;
const TYPES_OFFER = [`palace`, `flat`, `house`, `bungalow`];
const CHECKIN_OFFER = [`12.00`, `13.00`, `14.00`];
const CHECKOUT_OFFER = CHECKIN_OFFER;
const FEATURES_OFFER = [
  `wifi`,
  `dishwasher`,
  `parking`,
  `washer`,
  `elevator`,
  `conditioner`,
];
const DESCRIPTION_OFFER = ``;
const PHOTOS_OFFER = [
  `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
  `http://o0.github.io/assets/images/tokyo/hotel3.jpg`,
];

const Price = {
  MIN_PRICE: 10000,
  MAX_PRICE: 50000,
};
const Rooms = {
  MIN_ROOMS: 1,
  MAX_ROOMS: 3,
};

const Guest = {
  MIN_GUEST: 1,
  MAX_GUEST: 2,
};

const LocationX = {
  MIN_X: 130,
  MAX_X: 1100,
};

const LocationY = {
  MIN_Y: 130,
  MAX_Y: 630,
};

const getRandomNumbers = (min, max) => Math.random() * (max - min) + min;
const randomFloor = Math.floor;

const mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);
const pinListElement = mapBooking.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

const getPins = () => {
  const pins = [];
  for (let i = 1; i <= MAX_PINS; i++) {
    const avatarAuthor = `img/avatars/user0${i}.png`;

    pins.push({
      author: {
        avatar: avatarAuthor,
      },

      offer: {
        title: TITLE_OFFER,
        address: ADDRESS_OFFER,
        price: getRandomNumbers(Price.MIN_PRICE, Price.MAX_PRICE),
        type: TYPES_OFFER[randomFloor(Math.random() * TYPES_OFFER.length)],
        rooms: getRandomNumbers(Rooms.MIN_ROOMS, Rooms.MAX_ROOMS),
        guests: getRandomNumbers(Guest.MIN_GUEST, Guest.MAX_GUEST),
        checkin: CHECKIN_OFFER[randomFloor(Math.random() * CHECKIN_OFFER.length)],
        checkout: CHECKOUT_OFFER[randomFloor(Math.random() * CHECKOUT_OFFER.length)],
        features: FEATURES_OFFER,
        description: DESCRIPTION_OFFER,
        photos: PHOTOS_OFFER
      },

      location: {
        x: getRandomNumbers(LocationX.MIN_X, LocationX.MAX_X),
        y: getRandomNumbers(LocationY.MIN_Y, LocationY.MAX_Y)
      },
    });
  }
  return pins;
};

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementSelector = pinElement.querySelector(`img`);
  pinElementSelector.src = pin.author.avatar;
  pinElementSelector.alt = pin.offer.title;
  pinElement.style = `left: ${pin.location.x - (WIDTH_PIN / 2)}px; top: ${pin.location.y - HEIGHT_PIN}px;`;

  return pinElement;
};

const fragmentPin = document.createDocumentFragment();

for (let pin of getPins()) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinListElement.appendChild(fragmentPin);
