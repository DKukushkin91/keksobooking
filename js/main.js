'use strict';

const getRandomAvatar = new Set();
const getUniqueRandomAvatar = function (max = 8, min = 1) {
  const randomAvatar = Math.floor(Math.random() * (max - min) + min);
  if (getRandomAvatar.has(randomAvatar)) {
    return getUniqueRandomAvatar(max, min);
  } else {
    getRandomAvatar.add(randomAvatar);
    return randomAvatar;
  }
};

const getRandomNumbers = function (min, max) {
  return Math.random() * (max - min) + min;
};

const AVATAR_AUTHOR = `img/avatars/user0${getUniqueRandomAvatar()}.png`;
const TITLE_OFFER = ``;
const ADDRES_OFFER = `{{location.x}}, {{location.y}}`;
const PRICE_OFFER = getRandomNumbers();
const TYPE_OFFER = [`palace`, `flat`, `house`, `bungalow`];
const ROOMS_OFFER = getRandomNumbers();
const GUESTS_OFFER = getRandomNumbers();
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
const LOCATION_X = getRandomNumbers();
const LOCATION_Y = function getRandomY(min = 160, max = 630) {
  return Math.random() * (max - min) + min;
};

const mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

const arrPin = [];

for (let i = 0; i <= 8; i++) {
  arrPin.push({
    author: {
      avatar: AVATAR_AUTHOR,
    },

    offer: {
      title: TITLE_OFFER,
      address: ADDRES_OFFER,
      price: PRICE_OFFER,
      type: TYPE_OFFER,
      rooms: ROOMS_OFFER,
      guests: GUESTS_OFFER,
      checkin: CHECKIN_OFFER,
      checkout: CHECKOUT_OFFER,
      features: FEATURES_OFFER,
      description: DESCRIPTION_OFFER,
      photos: PHOTOS_OFFER
    },

    location: {
      x: LOCATION_X,
      y: LOCATION_Y
    },
  });
}

const getRenderPin = (style, img, alt) => {
  const pinElement = pinTemplate.cloneNode(true);

  pinElement.getAttribute(style);
  pinElement.setAttribute(img, AVATAR_AUTHOR);
  pinElement.setAttribute(alt, TITLE_OFFER);
  return pinElement;
};

const fragmentPin = document.createDocumentFragment();

for (let pin of arrPin) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinTemplate.appendChild(fragmentPin);
