'use strict';

(() => {
  const pinListElement = document.querySelector(`.map__pins`);
  const fragmentPin = document.createDocumentFragment();
  window.data.dataRetrivial((data) => {
    for (let pin of data) {
      const pinElement = window.pins.getRenderPin(pin);
      window.card.onPinOpenCard(pinElement, pin);
      fragmentPin.appendChild(pinElement);
    }
  });

  window.util.setDisabled(document
                                .querySelector(`.ad-form`)
                                .querySelectorAll(`fieldset`), true);
  window.util.setDisabled(document
                                .querySelector(`.map__filters`), true);

  const setMapActive = () => {
    document
          .querySelector(`.map`)
          .classList.remove(`map--faded`);
  };

  const setActivePage = () => {
    setMapActive();
    window.util.createPin(pinListElement, fragmentPin);
    window.util.setDisabled(document
                                  .querySelector(`.ad-form`)
                                  .querySelectorAll(`fieldset`), false);
    window.util.setDisabled(document
                                  .querySelector(`.map__filters`), false);
    window.form.setActiveForm();
    window.form.onPriceValidation();
  };

  window.main = {
    setActivePage
  };
})();
