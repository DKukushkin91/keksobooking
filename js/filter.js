"use strict";

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const filterHousingType = document.querySelector(`#housing-type`);
  const MAX_PIN = 5;
  const anyValue = `any`;

  let load = [];
  window.load.dataRetrivial((data) => {
    load = data;
  });

  const onFilterPins = (arr) => arr.slice(0, MAX_PIN);

  const onFilterHousingType = (element) => {
    return element.offer.type === filterHousingType.value || filterHousingType.value === anyValue;
  };

  const onFilterMapAd = () => {
    return onFilterPins(load.filter((ad) => {
      return onFilterHousingType(ad);
    }));
  };

  mapFilters.addEventListener(`change`, () => {
    window.util.onPinsRemove();
    window.util.onCardRemove();
    window.render.onCreatePins();
  });


  window.filter = {
    onFilterMapAd
  };
})();
