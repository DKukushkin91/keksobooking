'use strict';

const MAX_PIN = 5;
const ANY_VALUE = `any`;
const mapFilterElement = document.querySelector(`.map__filters`);
const filterTypeElement = document.querySelector(`#housing-type`);
const filterPriceElement = document.querySelector(`#housing-price`);
const filterRoomsElement = document.querySelector(`#housing-rooms`);
const filterGuestsElement = document.querySelector(`#housing-guests`);

window.util.setDisabled(mapFilterElement, true);

const setFilteredPins = () => {
  const createWidthDebounce = window.debounce(() => {
    window.form.removePins();
    window.form.removeCard();
    window.main.createElements();
  });
  mapFilterElement.addEventListener(`change`, () => {
    createWidthDebounce();
  });
};

let info = [];
window.backend.load((data) => {
  info = data;
  setFilteredPins();
}, window.backend.getShowErrorElement);

const getFilterHousingType = (type) => type === filterTypeElement.value || filterTypeElement.value === ANY_VALUE;

const getFilterHousingPrice = (price) => {
  return (filterPriceElement.value === ANY_VALUE ||
      (price < window.data.Price.MIN && filterPriceElement.value === `low`) ||
      (price > window.data.Price.MAX && filterPriceElement.value === `high`) ||
      (price >= window.data.Price.MIN && price <= window.data.Price.MAX && filterPriceElement.value === `middle`));
};

const getFilterHousingRooms = (rooms) => filterRoomsElement.value === ANY_VALUE || rooms === Number(filterRoomsElement.value);

const getFilterHousingGuests = (guests) => filterGuestsElement.value === ANY_VALUE || guests === Number(filterGuestsElement.value);

const getFilterHousingFeatures = (features) => {
  const featuresCheckedElements = Array.from(mapFilterElement.querySelectorAll(`input[type="checkbox"]:checked`));
  return featuresCheckedElements.every((element) => features.includes(element.value));
};

const getFilteredData = () => {
  const filteredAds = [];

  for (let obj of info) {
    if (getFilterHousingType(obj.offer.type) &&
      getFilterHousingPrice(obj.offer.price) &&
      getFilterHousingRooms(obj.offer.rooms) &&
      getFilterHousingGuests(obj.offer.guests) &&
      getFilterHousingFeatures(obj.offer.features)) {
      filteredAds.push(obj);
    }
    if (filteredAds.length === MAX_PIN) {
      break;
    }
  }
  return filteredAds;
};

window.filter = {
  getFilteredData
};
