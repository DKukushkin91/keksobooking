'use strict';
const mapPinMain = document.querySelector(`.map__pin--main`);

for (let pin of window.pins.pins) {
  const pinElement = window.pins.getRenderPin(pin);
  window.card.onPinOpenCard(pinElement, pin);
  window.data.fragmentPin.appendChild(pinElement);
}

window.util.setDisabled(document
                                .querySelector(`.ad-form`)
                                .querySelectorAll(`fieldset`), true);
window.util.setDisabled(document
                                .querySelector(`.map__filters`), true);

const setMapActive = () => {
  window.data.mapBooking.classList.remove(`map--faded`);
};

const setActivePage = () => {
  setMapActive();
  window.util.createPin(window.data.pinListElement, window.data.fragmentPin);
  window.util.setDisabled(document
                                  .querySelector(`.ad-form`)
                                  .querySelectorAll(`fieldset`), false);
  window.util.setDisabled(document
                                  .querySelector(`.map__filters`), false);
  window.form.setActiveForm();
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
