'use strict';

(() => {
  const onPinCreate = () => {
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
      MIN: 1,
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

    window.util.createElement(window.util.fragmentPin());

    const pinTemplate = document.querySelector(`#pin`)
        .content
        .querySelector(`.map__pin`);

    const getPins = () => {
      const pins = [];
      for (let i = 1; i <= MAX_PINS; i++) {
        const avatarAuthor = `img/avatars/user0${i}.png`;
        const location = {
          x: window.util.getRandomNumbers(LocationX.MIN, LocationX.MAX),
          y: window.util.getRandomNumbers(LocationY.MIN, LocationY.MAX)
        };

        pins.push({
          author: {
            avatar: avatarAuthor,
          },

          offer: {
            title: TITLE_OFFER,
            address: `${location.x}, ${location.y}`,
            price: window.util.getRandomNumbers(Price.MIN, Price.MAX),
            type: window.util.getRandomItem(TYPES_OFFER),
            rooms: window.util.getRandomNumbers(Room.MIN, Room.MAX),
            guests: window.util.getRandomNumbers(Guest.MIN, Guest.MAX),
            checkin: window.util.getRandomItem(CHECKIN_OFFER),
            checkout: window.util.getRandomItem(CHECKOUT_OFFER),
            features: window.util.getRandom(FEATURES_OFFER),
            description: DESCRIPTION_OFFER,
            photos: window.util.getRandom(PHOTOS_OFFER)
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

    const pins = getPins();

    for (let pin of pins) {
      const pinElement = getRenderPin(pin);
      window.card.isCardEvent(pinElement, pin);
      window.util.fragmentPin().appendChild(pinElement);
    }
  };

  window.pin = {
    onPinCreate
  };
})();
