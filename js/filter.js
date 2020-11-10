'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const filterHousingType = document.querySelector(`#housing-type`);
  const filterHousingPrice = document.querySelector(`#housing-price`);
  const filterHousingRooms = document.querySelector(`#housing-rooms`);
  const filterHousingGuests = document.querySelector(`#housing-guests`);
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

  const onFilterHousingPrice = (element) => {
    return (filterHousingPrice.value === anyValue ||
      (element.offer.price < window.data.Price.MIN && filterHousingPrice.value === `low`) ||
      (element.offer.price > window.data.Price.MAX && filterHousingPrice.value === `high`) ||
      (element.offer.price >= window.data.Price.MIN && element.offer.price <= window.data.Price.MAX && filterHousingPrice.value === `middle`));
  };

  const onFilterHousingRooms = (element) => {
    return filterHousingRooms.value === anyValue ||
      (element.offer.rooms === parseInt(filterHousingRooms.value, 10));
  };

  const onFilterHousingGuests = (element) => {
    return filterHousingGuests.value === anyValue ||
      element.offer.guests === parseInt(filterHousingGuests.value, 10);
  };

  const onFilterHousingFeatures = (elements) => {
    const featuresCheckedElements = Array.from(mapFilters.querySelectorAll(`input[type="checkbox"]:checked`));
    return featuresCheckedElements.every((element) => elements.includes(element.value));
  };

  const onFilterMapAd = () => {
    return onFilterPins(load.filter((ad) => {
      return onFilterHousingType(ad) &&
      onFilterHousingPrice(ad) &&
      onFilterHousingRooms(ad) &&
      onFilterHousingGuests(ad) &&
      onFilterHousingFeatures(ad.offer.features);
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
