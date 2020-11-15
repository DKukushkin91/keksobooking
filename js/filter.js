'use strict';

const MAX_PIN = 5;
const ANY_VALUE = `any`;
const mapFilterElement = document.querySelector(`.map__filters`);
const filterTypeElement = document.querySelector(`#housing-type`);
const filterPriceElement = document.querySelector(`#housing-price`);
const filterRoomsElement = document.querySelector(`#housing-rooms`);
const filterGuestsElement = document.querySelector(`#housing-guests`);

window.util.setDisabled(mapFilterElement, true);

let info = [];
window.load.dataLoadingHandler((data) => {
  info = data;
  setFilteredPins();
});

const getFilterPins = (arr) => arr.slice(0, MAX_PIN);

const getFilterHousingType = (element) => {
  return element.offer.type === filterTypeElement.value || filterTypeElement.value === ANY_VALUE;
};

const getFilterHousingPrice = (price) => {
  return (filterPriceElement.value === ANY_VALUE ||
      (price < window.data.Price.MIN && filterPriceElement.value === `low`) ||
      (price > window.data.Price.MAX && filterPriceElement.value === `high`) ||
      (price >= window.data.Price.MIN && price <= window.data.Price.MAX && filterPriceElement.value === `middle`));
};

const getFilterHousingRooms = (element) => {
  return filterRoomsElement.value === ANY_VALUE ||
      element.offer.rooms === Number(filterRoomsElement.value);
};

const getFilterHousingGuests = (guests) => {
  return filterGuestsElement.value === ANY_VALUE ||
      guests === Number(filterGuestsElement.value);
};

const getFilterHousingFeatures = (elements) => {
  const featuresCheckedElements = Array.from(mapFilterElement.querySelectorAll(`input[type="checkbox"]:checked`));
  return featuresCheckedElements.every((element) => elements.includes(element.value));
};

const getRenderMapAd = () => {
  return getFilterPins(info.filter((ad) => {
    return getFilterHousingType(ad) &&
      getFilterHousingPrice(ad.offer.price) &&
      getFilterHousingRooms(ad) &&
      getFilterHousingGuests(ad.offer.guests) &&
      getFilterHousingFeatures(ad.offer.features);
  }));
};

const setFilteredPins = () => {
  const createWidthDebounce = window.debounce(() => {
    window.main.removePins();
    window.main.removeCard();
    window.main.createElements();
  });
  mapFilterElement.addEventListener(`change`, () => {
    createWidthDebounce();
  });
};

window.filter = {
  getRenderMapAd
};
