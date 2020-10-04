'use strict';

const WIDTH_PIN = 40;
const HEIGHT_PIN = 40;
const MAX_PINS = 8;
const TITLE_OFFER = ``;
const ADDRESS_OFFER = `600, 350`;
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

/* const createRandomAvatar = new Set();
const getUniqueRandomAvatar = (max = MAX_PINS, min = 1) => {
  const randomAvatar = Math.floor(Math.random() * (max - min) + min);
  if (createRandomAvatar.has(randomAvatar)) {
    return getUniqueRandomAvatar(max, min);
  } else {
    createRandomAvatar.add(randomAvatar);
    return randomAvatar;
  }
};*/

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
    const priceOffer = getRandomNumbers(10000, 50000);
    const roomsOffer = getRandomNumbers(1, 3);
    const guestsOffer = getRandomNumbers(1, 2);
    const locationX = getRandomNumbers(130, 1100);
    const locationY = getRandomNumbers(130, 630);

    arrPin.push({
      author: {
        avatar: avatarAuthor,
      },

      offer: {
        title: TITLE_OFFER,
        address: ADDRESS_OFFER,
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
  return arrPin;
};

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  pinElement.querySelector(`img`).src = pin.author.avatar.avatarAuthor;
  pinElement.querySelector(`img`).alt = pin.offer.title.TITLE_OFFER;
  pinElement.style = `left: ${pin.location.x - (WIDTH_PIN / 2)}px; top: ${pin.location.y - HEIGHT_PIN}px;`;

  return pinElement;
};

const fragmentPin = document.createDocumentFragment();

for (let pin of getArrPin()) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinListElement.appendChild(fragmentPin);
