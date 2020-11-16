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
window.backend.load((data) => {
  info = data;
  setFilteredPins();
}, window.backend.getShowErrorElement);

const getFilterHousingType = (element) => {
  return element.offer.type === filterTypeElement.value || filterTypeElement.value === ANY_VALUE;
};

const getFilterHousingPrice = (element) => {
  return (filterPriceElement.value === ANY_VALUE ||
      (element.offer.price < window.data.Price.MIN && filterPriceElement.value === `low`) ||
      (element.offer.price > window.data.Price.MAX && filterPriceElement.value === `high`) ||
      (element.offer.price >= window.data.Price.MIN && element.offer.price <= window.data.Price.MAX && filterPriceElement.value === `middle`));
};

const getFilterHousingRooms = (element) => {
  return filterRoomsElement.value === ANY_VALUE ||
      element.offer.rooms === Number(filterRoomsElement.value);
};

const getFilterHousingGuests = (element) => {
  return filterGuestsElement.value === ANY_VALUE ||
  element.offer.guests === Number(filterGuestsElement.value);
};

const getFilterHousingFeatures = (elements) => {
  const featuresCheckedElements = Array.from(mapFilterElement.querySelectorAll(`input[type="checkbox"]:checked`));
  return featuresCheckedElements.every((element) => elements.includes(element.value));
};

const getFilteredData = () => {
  let filteredAds = [];

  for (let i = 0; i < info.length; i++) {
    if (getFilterHousingType(info[i]) &&
      getFilterHousingPrice(info[i]) &&
      getFilterHousingRooms(info[i]) &&
      getFilterHousingGuests(info[i]) &&
      getFilterHousingFeatures(info[i])) {
      filteredAds.push(info[i]);
    }
    if (filteredAds.length === MAX_PIN) {
      break;
    }
  }

  return filteredAds;
};

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

window.filter = {
  getFilteredData
};
