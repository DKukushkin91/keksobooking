'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);

  const mapPinMain = document.querySelector(`.map__pin--main`);

  const getPins = () => {
    const pins = [];
    for (let i = 1; i <= window.data.MAX_PINS; i++) {
      const avatarAuthor = `img/avatars/user0${i}.png`;
      const location = {
        x: window.util.getRandomNumbers(window.data.LocationX.MIN, window.data.LocationX.MAX),
        y: window.util.getRandomNumbers(window.data.LocationY.MIN, window.data.LocationY.MAX)
      };

      pins.push({
        author: {
          avatar: avatarAuthor,
        },

        offer: {
          title: window.data.TITLE_OFFER,
          address: `${location.x}, ${location.y}`,
          price: window.util.getRandomNumbers(window.data.Price.MIN, window.data.Price.MAX),
          type: window.util.getRandomItem(window.data.TYPES_OFFER),
          rooms: window.util.getRandomNumbers(window.data.Room.MIN, window.data.Room.MAX),
          guests: window.util.getRandomNumbers(window.data.Guest.MIN, window.data.Guest.MAX),
          checkin: window.util.getRandomItem(window.data.CHECKIN_OFFER),
          checkout: window.util.getRandomItem(window.data.CHECKOUT_OFFER),
          features: window.util.getRandom(window.data.FEATURES_OFFER),
          description: window.data.DESCRIPTION_OFFER,
          photos: window.util.getRandom(window.data.PHOTOS_OFFER)
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
    pinElement.style.left = `${pin.location.x - (window.data.WIDTH_PIN / 2)}px`;
    pinElement.style.top = `${pin.location.y - window.data.HEIGHT_PIN}px`;

    return pinElement;
  };

  const pins = getPins();

  const onPinMainCloseMouse = (evt) => {
    if (evt.button === 0) {
      window.main.setActivePage();
      window.util.writeAddress(evt.x, evt.y);
      mapPinMain.removeEventListener(`mousedown`, onPinMainCloseMouse);
    }
  };

  mapPinMain.addEventListener(`mousedown`, onPinMainCloseMouse);

  const onPinMainCloseKeyboard = (evt) => {
    if (evt.key === `Enter`) {
      window.main.setActivePage();
      window.util.writeAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
      mapPinMain.removeEventListener(`keydown`, onPinMainCloseKeyboard);
    }
  };

  mapPinMain.addEventListener(`keydown`, onPinMainCloseKeyboard);

  window.pins = {
    getRenderPin,
    pins
  };
})();
