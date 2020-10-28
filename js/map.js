'use strict';

(() => {
  const onMapActivate = () => {
    const mapPinMain = window.pin.pinListElement.querySelector(`.map__pin--main`);
    const writeAddress = (addressX, addressY) => {
      window.form.addressField.value = `${addressX}, ${addressY}`;
    };

    window.map = {
      setMapActive: () => {
        window.pin.mapBooking.classList.remove(`map--faded`);
      }
    };
    const onPinMainCloseMouse = (evt) => {
      if (evt.button === 0) {
        window.page.setActivePage();
        writeAddress(evt.x, evt.y);
        mapPinMain.removeEventListener(`mousedown`, onPinMainCloseMouse);
      }
    };

    mapPinMain.addEventListener(`mousedown`, onPinMainCloseMouse);

    const onPinMainCloseKeyboard = (evt) => {
      if (evt.key === `Enter`) {
        window.page.setActivePage();
        writeAddress(mapPinMain.offsetLeft, mapPinMain.offsetTop);
        mapPinMain.removeEventListener(`keydown`, onPinMainCloseKeyboard);
      }
    };

    mapPinMain.addEventListener(`keydown`, onPinMainCloseKeyboard);
  };

  window.map = {
    onMapActivate,
  };

})();
