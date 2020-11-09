'use strict';

(() => {
  const pinListElement = document.querySelector(`.map__pins`);
  const mapFilters = document.querySelector(`.map__filters`);
  const filterHousingType = document.querySelector(`#housing-type`);
  const MAX_PIN = 5;
  const anyValue = `any`;

  let load = [];
  window.load.dataRetrivial((data) => {
    load = data;
  });

  const onFilterPins = (arr) => {
    return arr.slice(0, MAX_PIN);
  };

  const onFilterHousingType = (element) => {
    return element.offer.type === filterHousingType.value || filterHousingType.value === anyValue;
  };

  const onFilterMapAd = () => {
    return onFilterPins(load.filter((ad) => {
      return onFilterHousingType(ad);
    }));
  };

  const onCreatePins = () => {
    const fragmentPin = document.createDocumentFragment();
    onFilterMapAd();
    for (let pin of onFilterMapAd()) {
      const pinElement = window.pins.getRenderPin(pin);
      window.card.onPinOpenCard(pinElement, pin);
      fragmentPin.appendChild(pinElement);
    }
    window.util.createPin(pinListElement, fragmentPin);
  };

  mapFilters.addEventListener(`change`, () => {
    window.util.onPinsRemove();
    window.util.onCardRemove();
    onCreatePins();
  });


  window.render = {
    onCreatePins,
  };
})();
