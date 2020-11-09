'use strict';

(() => {
  const pinListElement = document.querySelector(`.map__pins`);
  const filterHousingType = document.querySelector(`#housing-type`);

  let load = [];
  window.load.dataRetrivial((data) => {
    load = data;
  });

  const onCreatePins = () => {
    const fragmentPin = document.createDocumentFragment();
    const housingType = load.filter((element) => {
      return element.offer.type === filterHousingType.value || filterHousingType.value === `any`;
    }).slice(0, 5);
    for (let pin of housingType) {
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
