'use strict';

const cardTemplate = document.querySelector(`#card`)
  .content
  .querySelector(`.popup`);

const NumberOfCapacity = {
  ONE: 1,
  ZERO: 0,
  THIRTY_FIVE: 35
};

const escPressHandler = (evt) => {
  if (evt.key === `Escape`) {
    popupCloseHandler();
  }
};

const getCreatedCardPhotos = (photos) => {
  const fragment = document.createDocumentFragment();
  const template = document.querySelector(`#card`)
    .content
    .querySelector(`.popup__photo`);
  photos.forEach((photo) => {
    const photoCloneNode = template.cloneNode(true);
    photoCloneNode.src = photo;
    fragment.appendChild(photoCloneNode);
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

const getRoomsText = (card) => {
  let rooms = `комната`;
  if (card.offer.rooms !== NumberOfCapacity.ONE) {
    rooms = `комнаты`;
  } if (card.offer.rooms === NumberOfCapacity.ZERO || card.offer.rooms === NumberOfCapacity.THIRTY_FIVE) {
    rooms = `комнат`;
  }
  return rooms;
};

const getGuestText = (card) => card.offer.guests !== NumberOfCapacity.ONE ? `гостей` : `гостя`;

const getRenderCard = (card) => {
  const cardCloneNode = cardTemplate.cloneNode(true);
  const photoElement = cardCloneNode.querySelector(`.popup__photos`).querySelector(`.popup__photo`);
  const closeMapCard = cardCloneNode.querySelector(`.popup__close`);

  cardCloneNode.querySelector(`.popup__photos`).removeChild(photoElement);
  cardCloneNode.querySelector(`.popup__title`).textContent = card.offer.title;
  cardCloneNode.querySelector(`.popup__text--address`).textContent = card.offer.address;
  cardCloneNode.querySelector(`.popup__text--price`).textContent = `${card.offer.price}₽/ночь`;
  cardCloneNode.querySelector(`.popup__type`).textContent = window.data.offerType[card.offer.type];
  cardCloneNode.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} ${getRoomsText(card)} для ${card.offer.guests} ${getGuestText(card)}`;
  cardCloneNode.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
  cardCloneNode.querySelector(`.popup__features`).appendChild(getCreatedCardFeatures(card.offer.features));
  cardCloneNode.querySelector(`.popup__description`).textContent = card.offer.description;
  cardCloneNode.querySelector(`.popup__photos`).appendChild(getCreatedCardPhotos(card.offer.photos));
  cardCloneNode.querySelector(`.popup__avatar`).src = card.author.avatar;

  closeMapCard.addEventListener(`click`, () => {
    popupCloseHandler();
  });

  return cardCloneNode;
};

const popupCloseHandler = () => {
  const mapPopupElement = document.querySelector(`.map__card`);
  if (mapPopupElement) {
    window.pins.removeActivePin();
    mapPopupElement.remove();
    document.removeEventListener(`keydown`, escPressHandler);
  }
};

window.card = {
  getRenderCard,
  popupCloseHandler,
  escPressHandler
};
