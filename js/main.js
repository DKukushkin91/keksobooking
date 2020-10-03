'use strict';

const WIDTH_PIN = 40;
const HEIGHT_PIN = 40;
const MAX_PINS = 8;
const TITLE_OFFER = ``;
const ADDRES_OFFER = `{{location.x}}, {{location.y}}`;
const TYPE_OFFER = [`palace`, `flat`, `house`, `bungalow`];
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

const getRandomAvatar = new Set();
const getUniqueRandomAvatar = (max = MAX_PINS, min = 1) => {
  const randomAvatar = Math.floor(Math.random() * (max - min) + min);
  if (getRandomAvatar.has(randomAvatar)) {
    return getUniqueRandomAvatar(max, min);
  } else {
    getRandomAvatar.add(randomAvatar);
    return randomAvatar;
  }
};

const getRandomNumbers = (min, max) => Math.random() * (max - min) + min;

const avatarAutor = `img/avatars/user0${getUniqueRandomAvatar()}.png`;
const priceOffer = getRandomNumbers();
const roomsOffer = getRandomNumbers();
const guestsOffer = getRandomNumbers();
const locationX = getRandomNumbers();
const locationY = (min = 160, max = 630) => Math.random() * (max - min) + min;

const mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);

const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

const arrPin = [];

for (let i = 0; i <= MAX_PINS; i++) {
  arrPin.push({
    author: {
      avatar: avatarAutor,
    },

    offer: {
      title: TITLE_OFFER,
      address: ADDRES_OFFER,
      price: priceOffer,
      type: TYPE_OFFER,
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

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector(`img`).src = pin.author.avatarAutor;
  pinElement.querySelector(`img`).alt = pin.offer.TITLE_OFFER;
  pinElement.style = `left: ${pin.location.x - (WIDTH_PIN / 2)}px; top: ${pin.location.y - HEIGHT_PIN}px;`;
};

const fragmentPin = document.createDocumentFragment();

for (let pin of arrPin) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinTemplate.appendChild(fragmentPin);
