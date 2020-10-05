'use strict';

const WIDTH_PIN = 40;
const HEIGHT_PIN = 40;
const MIN_PRICE = 10000;
const MAX_PRICE = 50000;
const MIN_ROOMS = 1;
const MAX_ROOMS = 3;
const MIN_GUEST = 1;
const MAX_GUEST = 2;
const MIN_XY = 130;
const MAX_X = 1100;
const MAX_Y = 630;
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

const getRandomNumbers = (min, max) => Math.random() * (max - min) + min;

const mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);
const pinListElement = mapBooking.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

const getArrPin = () => {
  const arrPin = [];
  for (let i = 1; i <= MAX_PINS; i++) {
    const avatarAuthor = `img/avatars/user0${i}.png`;
    const priceOffer = getRandomNumbers(MIN_PRICE, MAX_PRICE);
    const roomsOffer = getRandomNumbers(MIN_ROOMS, MAX_ROOMS);
    const guestsOffer = getRandomNumbers(MIN_GUEST, MAX_GUEST);
    const locationX = getRandomNumbers(MIN_XY, MAX_X);
    const locationY = getRandomNumbers(MIN_XY, MAX_Y);
    const typeOffer = TYPES_OFFER[Math.floor(Math.random() * TYPES_OFFER.length)];

    arrPin.push({
      author: {
        avatar: avatarAuthor,
      },

      offer: {
        title: TITLE_OFFER,
        address: ADDRESS_OFFER,
        price: priceOffer,
        type: typeOffer,
        rooms: roomsOffer,
        guests: guestsOffer,
        checkin: CHECKIN_OFFER,
        checkout: CHECKOUT_OFFER,
        features: FEATURES_OFFER,
        description: DESCRIPTION_OFFER,
        photos: PHOTOS_OFFER
      },

      location: {
        x: locationX,
        y: locationY
      },
    });
  }
  return arrPin;
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

for (let pin of getArrPin()) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinListElement.appendChild(fragmentPin);
