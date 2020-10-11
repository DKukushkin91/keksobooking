'use strict';

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
  MIN: 10000,
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

const getRandomNumbers = (min, max) => Math.round(Math.random() * (max - min) + min);
const getRandomItem = (items) => items[Math.round(Math.floor(Math.random() * items.length))];
const getRandom = (arr) => arr.slice(0, getRandomNumbers(1, arr.length));

const mapBooking = document.querySelector(`.map`);
mapBooking.classList.remove(`map--faded`);

const pinListElement = mapBooking.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

function getPins() {
  const pins = [];
  for (let i = 1; i <= MAX_PINS; i++) {
    const avatarAuthor = `img/avatars/user0${i}.png`;
    const location = {
      x: getRandomNumbers(LocationX.MIN, LocationX.MAX),
      y: getRandomNumbers(LocationY.MIN, LocationY.MAX)
    };

    pins.push({
      author: {
        avatar: avatarAuthor,
      },

      offer: {
        title: TITLE_OFFER,
        address: `${location.x}, ${location.y}`,
        price: getRandomNumbers(Price.MIN, Price.MAX),
        type: getRandomItem(TYPES_OFFER),
        rooms: getRandomNumbers(Room.MIN, Room.MAX),
        guests: getRandomNumbers(Guest.MIN, Guest.MAX),
        checkin: getRandomItem(CHECKIN_OFFER),
        checkout: getRandomItem(CHECKOUT_OFFER),
        features: getRandom(FEATURES_OFFER),
        description: DESCRIPTION_OFFER,
        photos: getRandom(PHOTOS_OFFER)
      },

      location
    });
  }
  return pins;
}

const getRenderPin = (pin) => {
  const pinElement = pinTemplate.cloneNode(true);
  const pinElementSelector = pinElement.querySelector(`img`);
  pinElementSelector.src = pin.author.avatar;
  pinElementSelector.alt = pin.offer.title;
  pinElement.style.left = `${pin.location.x - (WIDTH_PIN / 2)}px`;
  pinElement.style.top = `${pin.location.y - HEIGHT_PIN}px`;

  return pinElement;
};

const fragmentPin = document.createDocumentFragment();

for (let pin of getPins()) {
  fragmentPin.appendChild(getRenderPin(pin));
}

pinListElement.appendChild(fragmentPin);

const cardListElement = mapBooking.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`)
      .content
      .querySelector(`.map__card`);

const offerType = {
  flat: `Квартира`,
  house: `Дом`,
  palace: `Дворец`,
  bungalow: `Бунгало`
};

const getRenderCard = (card) => {

  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = offerType[card.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector(`.popup__feature`).textContent = card.offer.features;
  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
  cardElement.querySelector(`.popup__photo`).src = card.offer.photos;
  cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;
  return cardElement;
};

const fragmentCard = document.createDocumentFragment();

for (let card of getPins()) {
  fragmentCard.appendChild(getRenderCard(card));
}

mapBooking.insertBefore(fragmentCard, cardListElement);

console.log(getRenderCard());
