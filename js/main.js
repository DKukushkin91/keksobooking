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

const createPin = () => pinListElement.appendChild(fragmentPin);

const mapBooking = document.querySelector(`.map`);
const pinListElement = mapBooking.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`)
      .content
      .querySelector(`.map__pin`);

const getPins = () => {
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
};

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
const pins = getPins();

for (let pin of pins) {
  fragmentPin.appendChild(getRenderPin(pin));
}

/*
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

const getCreatedCardPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector(`#card`)
        .content
        .querySelector(`.popup__photo`);
  photos.forEach((photo) => {
    const photoTemplate = template.cloneNode(true);
    photoTemplate.src = photo;
    fragment.appendChild(photoTemplate);
  });
  return fragment;
};

const getCreatedCardFeatures = (features) => {
  const fragment = document.createDocumentFragment();

  features.forEach((feature) => {
    const featureItem = document.createElement(`li`);
    featureItem.classList.add(`popup__feature`);
    featureItem.classList.add(`popup__feature--${feature}`);
    fragment.appendChild(featureItem);
  });
  return fragment;
};

const getRenderCard = (card) => {
  const cardElement = cardTemplate.cloneNode(true);
  const photoElement = cardElement.querySelector(`.popup__photos`).querySelector(`.popup__photo`);
  cardElement.querySelector(`.popup__photos`).removeChild(photoElement);

  cardElement.querySelector(`.popup__title`).textContent = card.offer.title;
  cardElement.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardElement.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  cardElement.querySelector(`.popup__type`).textContent = offerType[card.offer.type];
  cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
  cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardElement.querySelector(`.popup__features`).appendChild(getCreatedCardFeatures(card.offer.features));
  cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
  cardElement.querySelector(`.popup__photos`).appendChild(getCreatedCardPhotos(card.offer.photos));
  cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;
  return cardElement;
};

mapBooking.insertBefore(getRenderCard(pins[0]), cardListElement);*/

const AD_FORM = document.querySelector(`.ad-form`);
const AD_FIELDSET = AD_FORM.querySelectorAll(`fieldset`);
const MAP_FILTERS = document.querySelector(`.map__filters`);
const MAP_PIN = document.querySelector(`.map__pin--main`);
const ADDRESS = AD_FORM.querySelector(`#address`);
const ROOM_NUMBER = AD_FORM.querySelector(`#room_number`);
const CAPACITY = AD_FORM.querySelector(`#capacity`);
const SUBMIT = AD_FORM.querySelector(`.ad-form__submit`);

const writeAddress = (addressX, addressY) => {
  ADDRESS.value = (`${addressX}, ${addressY}`);
};

const setAttribute = (element) => {
  for (let attribute of element) {
    attribute.setAttribute(`disabled`, `disabled`);
  }
};

setAttribute(AD_FIELDSET);
setAttribute(MAP_FILTERS);

const removeAttribute = (element) => {
  for (let attribute of element) {
    attribute.removeAttribute(`disabled`);
  }
};

const activeForm = () => {
  AD_FORM.classList.remove(`ad-form--disabled`);
};

const mapActive = () => {
  mapBooking.classList.remove(`map--faded`);
};

const activeMap = () => {
  mapActive();
  createPin();
  removeAttribute(AD_FIELDSET);
  removeAttribute(MAP_FILTERS);
  activeForm();
};

MAP_PIN.addEventListener(`mousedown`, (evt) => {
  if (typeof evt === `object`) {
    switch (evt.button) {
      case 0:
        activeMap();
        writeAddress(evt.x, evt.y);
        break;
    }
  }
});

MAP_PIN.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    activeMap();
    writeAddress(`${MAP_PIN.offsetLeft}, ${MAP_PIN.offsetTop}`);
  }
});

const validationOfRoomsAndGuests = () => {
  if (ROOM_NUMBER.value < CAPACITY.value || ROOM_NUMBER.value === `100` && CAPACITY.value !== `0`) {
    ROOM_NUMBER.setCustomValidity(`Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей`);
  } else {
    ROOM_NUMBER.setCustomValidity(``);
  }
};

SUBMIT.addEventListener(`click`, () => {
  validationOfRoomsAndGuests();
});
