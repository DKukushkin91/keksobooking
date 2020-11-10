'use strict';

(() => {
  const pinListElement = document.querySelector(`.map__pins`);

  const onCreatePins = () => {
    const fragmentPin = document.createDocumentFragment();
    window.filter.onFilterMapAd();
    for (let pin of window.filter.onFilterMapAd()) {
      const pinElement = window.pins.getRenderPin(pin);
      window.card.onPinOpenCard(pinElement, pin);
      fragmentPin.appendChild(pinElement);
    }
    window.util.createPin(pinListElement, fragmentPin);
  };

  window.render = {
    onCreatePins,
  };
})();
