'use strict';

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
  window.render.onCreatePins();
  setMapActive();
  window.util.setDisabled(document
                                  .querySelector(`.ad-form`)
                                  .querySelectorAll(`fieldset`), false);
  window.util.setDisabled(document
                                  .querySelector(`.map__filters`), false);
  window.form.setActiveForm();
  window.form.onPriceValidation();
  window.form.onFormRestart();
};

window.main = {
  setActivePage,
};

