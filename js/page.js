'use strict';
(() => {
  const onPageActive = () => {
    const mapBooking = document.querySelector(`.map`);
    const mapPinMain = document.querySelector(`.map__pin--main`);
    const adForm = document.querySelector(`.ad-form`);
    const adFieldset = adForm.querySelectorAll(`fieldset`);
    const mapFilters = document.querySelector(`.map__filters`);

    const setActiveForm = () => {
      adForm.classList.remove(`ad-form--disabled`);
    };

    const setMapActive = () => {
      mapBooking.classList.remove(`map--faded`);
    };

    const setActivePage = () => {
      setMapActive();
      window.util.createElement(window.util.fragmentPin());
      window.util.setDisabled(adFieldset, true);
      window.util.setDisabled(mapFilters, true);
      setActiveForm();
      window.form.onPriceValidation();
    };

    const onPinMainCloseMouse = (evt) => {
      if (evt.button === 0) {
        setActivePage();
        window.util.writeAddress(evt.x, evt.y);
        mapPinMain.removeEventListener(`mousedown`, onPinMainCloseMouse);
      }
    };
    mapPinMain.addEventListener(`mousedown`, onPinMainCloseMouse);

    const onPinMainCloseKeyboard = (evt) => {
      if (evt.key === `Enter`) {
        setActivePage();
        window.util.writeAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
        mapPinMain.removeEventListener(`keydown`, onPinMainCloseKeyboard);
      }
    };
    mapPinMain.addEventListener(`keydown`, onPinMainCloseKeyboard);
  };
  window.form = {
    onPageActive
  };
})();
