'use strict';

(() => {
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
    const pinElement = window.data.pinTemplate.cloneNode(true);
    const pinElementSelector = pinElement.querySelector(`img`);
    pinElementSelector.src = pin.author.avatar;
    pinElementSelector.alt = pin.offer.title;
    pinElement.style.left = `${pin.location.x - (window.data.WIDTH_PIN / 2)}px`;
    pinElement.style.top = `${pin.location.y - window.data.HEIGHT_PIN}px`;

    return pinElement;
  };

  const pins = getPins();

  window.pins = {
    getRenderPin,
    pins
  };
})();
