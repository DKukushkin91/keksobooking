'use strict';

(() => {
  const cardListElement = document.querySelector(`.map__filters-container`);
  const cardTemplate = document.querySelector(`#card`)
      .content
      .querySelector(`.map__card`);

  const onPinOpenCard = (element, pin) => {
    element.addEventListener(`click`, () => {
      const popupElement = getRenderCard(pin);
      const onPopupEscPress = (evt) => {
        if (evt.key === `Escape`) {
          closePopup();
        }
      };

      const closePopup = () => {
        document.querySelector(`.map__card`).remove();
        document.removeEventListener(`keydown`, onPopupEscPress);
      };

      document.addEventListener(`keydown`, onPopupEscPress);

      if (document.querySelector(`.map__card`)) {
        closePopup();
      }
      document
              .querySelector(`.map`)
              .insertBefore(popupElement, cardListElement);

      const closeMapCard = popupElement.querySelector(`.popup__close`);

      closeMapCard.addEventListener(`click`, () => {
        closePopup();
      });
    });
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
    cardElement.querySelector(`.popup__type`).textContent = window.data.offerType[card.offer.type];
    cardElement.querySelector(`.popup__text--capacity`).textContent = `${card.offer.rooms} комнаты для ${card.offer.guests} гостей`;
    cardElement.querySelector(`.popup__text--time`).textContent = `Заезд после ${card.offer.checkin}, выезд до ${card.offer.checkout}`;
    cardElement.querySelector(`.popup__features`).appendChild(getCreatedCardFeatures(card.offer.features));
    cardElement.querySelector(`.popup__description`).textContent = card.offer.description;
    cardElement.querySelector(`.popup__photos`).appendChild(getCreatedCardPhotos(card.offer.photos));
    cardElement.querySelector(`.popup__avatar`).src = card.author.avatar;
    return cardElement;
  };

  window.card = {
    onPinOpenCard,
  };

})();
