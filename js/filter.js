'use strict';

(() => {
  const MAX_PIN = 5;
  const ANY_VALUE = `any`;
  const mapFilters = document.querySelector(`.map__filters`);
  const filterHousingType = document.querySelector(`#housing-type`);
  const filterHousingPrice = document.querySelector(`#housing-price`);
  const filterHousingRooms = document.querySelector(`#housing-rooms`);
  const filterHousingGuests = document.querySelector(`#housing-guests`);

  let load = [];
  window.load.dataRetrivial((data) => {
    load = data;
    setFilteredPins();
  });

  const onFilterPins = (arr) => arr.slice(0, MAX_PIN);

  const onFilterHousingType = (element) => {
    return element.offer.type === filterHousingType.value || filterHousingType.value === ANY_VALUE;
  };

  const onFilterHousingPrice = (price) => {
    return (filterHousingPrice.value === ANY_VALUE ||
      (price < window.data.Price.MIN && filterHousingPrice.value === `low`) ||
      (price > window.data.Price.MAX && filterHousingPrice.value === `high`) ||
      (price >= window.data.Price.MIN && price <= window.data.Price.MAX && filterHousingPrice.value === `middle`));
  };

  const onFilterHousingRooms = (element) => {
    return filterHousingRooms.value === ANY_VALUE ||
      element.offer.rooms === Number(filterHousingRooms.value);
  };

  const onFilterHousingGuests = (guests) => {
    return filterHousingGuests.value === ANY_VALUE ||
      guests === Number(filterHousingGuests.value);
  };

  const onFilterHousingFeatures = (elements) => {
    const featuresCheckedElements = Array.from(mapFilters.querySelectorAll(`input[type="checkbox"]:checked`));
    return featuresCheckedElements.every((element) => elements.includes(element.value));
  };

  const onFilterMapAd = () => {
    return onFilterPins(load.filter((ad) => {
      return onFilterHousingType(ad) &&
      onFilterHousingPrice(ad.offer.price) &&
      onFilterHousingRooms(ad) &&
      onFilterHousingGuests(ad.offer.guests) &&
      onFilterHousingFeatures(ad.offer.features);
    }));
  };

  const setFilteredPins = () => {
    const createWidthDebounce = window.debounce(() => {
      window.util.onPinsRemove();
      window.util.onCardRemove();
      window.render.onCreatePins();
    });
    mapFilters.addEventListener(`change`, () => {
      createWidthDebounce();
    });
  };

  window.filter = {
    onFilterMapAd
  };
})();
