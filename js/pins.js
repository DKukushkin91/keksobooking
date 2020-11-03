'use strict';

(() => {
  const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
  const mapPinHandle = document.querySelector(`.map__pin--main`);

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
    pinElement.style.left = `${pin.location.x - (window.data.PinSize.WIDTH / 2)}px`;
    pinElement.style.top = `${pin.location.y - window.data.PinSize.HEIGHT}px`;

    return pinElement;
  };

  const pins = getPins();

  const onPinMainCloseMouse = (evt) => {
    if (evt.button === 0) {
      window.main.setActivePage();
      window.util.writeAddress(evt.x, evt.y);
      mapPinHandle.removeEventListener(`mousedown`, onPinMainCloseMouse);
    }
  };

  const checkXPin = (x) => {
    const maxX = window.data.MapX.MAX - window.data.PinSize.WIDTH;
    const minX = window.data.MapX.MIN;
    if (x > maxX) {
      return maxX;
    }

    if (x < minX) {
      return minX;
    }
    return x;
  };

  const checkYPin = (y) => {
    const minY = window.data.MapY.MIN - window.data.PinSize.HEIGHT;
    if (y > window.data.MapY.MAX) {
      return window.data.MapY.MAX;
    }

    if (y < minY) {
      return minY;
    }
    return y;
  };

  mapPinHandle.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };

    let onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      window.util.writeAddress(mapPinHandle.offsetLeft, mapPinHandle.offsetTop);

      let shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      const newX = mapPinHandle.offsetLeft - shift.x;
      const newY = mapPinHandle.offsetTop - shift.y;

      mapPinHandle.style.left = checkXPin(newX) + `px`;
      mapPinHandle.style.top = checkYPin(newY) + `px`;
    };

    let onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  mapPinHandle.addEventListener(`mousedown`, onPinMainCloseMouse);

  const onPinMainCloseKeyboard = (evt) => {
    if (evt.key === `Enter`) {
      window.main.setActivePage();
      window.util.writeAddress(mapPinHandle.offsetLeft, mapPinHandle.offsetTop);
      mapPinHandle.removeEventListener(`keydown`, onPinMainCloseKeyboard);
    }
  };

  mapPinHandle.addEventListener(`keydown`, onPinMainCloseKeyboard);

  window.pins = {
    getRenderPin,
    pins
  };
})();
