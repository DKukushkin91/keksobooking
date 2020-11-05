'use strict';

(() => {
  const roomInput = document.querySelector(`#room_number`);
  const capacityInput = document.querySelector(`#capacity`);
  const typeOfHousing = document.querySelector(`#type`);
  const pricePerNight = document.querySelector(`#price`);
  const pageForm = document.querySelector(`.ad-form`);

  const setActiveForm = () => {
    pageForm.classList.remove(`ad-form--disabled`);
  };

  const onRoomsValidation = () => {
    let validationMessage = ``;

    if (roomInput.value < capacityInput.value || roomInput.value !== `100` && capacityInput.value === `0` || roomInput.value === `100` && capacityInput.value > `0`) {
      validationMessage = `Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей`;
    }

    roomInput.setCustomValidity(validationMessage);
  };

  const setElementAttribute = (element, attribute, value) => {
    element.setAttribute(attribute, value);
  };

  const onPriceValidation = () => {
    let minPrice = 0;

    switch (typeOfHousing.value) {
      case `bungalow`:
        minPrice = window.data.MinPrice.BUNGALOW;
        break;
      case `flat`:
        minPrice = window.data.MinPrice.FLAT;
        break;
      case `house`:
        minPrice = window.data.MinPrice.HOUSE;
        break;
      case `palace`:
        minPrice = window.data.MinPrice.PALACE;
        break;
    }

    setElementAttribute(pricePerNight, `placeholder`, minPrice);
    setElementAttribute(pricePerNight, `min`, minPrice);
  };

  typeOfHousing.addEventListener(`click`, () => {
    onPriceValidation();
  });

  const timeInInput = document.querySelector(`#timein`);
  const timeOutInput = document.querySelector(`#timeout`);

  const onTimeValidation = (evt) => {
    timeInInput.value = evt.target.value;
    timeOutInput.value = evt.target.value;
  };

  timeInInput.addEventListener(`change`, onTimeValidation);
  timeOutInput.addEventListener(`change`, onTimeValidation);

  const onFormSubmit = () => {
    document
          .querySelector(`.ad-form__submit`)
          .addEventListener(`click`, () => {
            onRoomsValidation();
            onPriceValidation();
          });
  };
  onFormSubmit();

  const onFormReset = () => {
    document
          .querySelector(`.ad-form__reset`)
          .removeEventListener(`click`, onFormReset);

    document.querySelector(`.ad-form`).reset();
    pageForm.classList.add(`ad-form--disabled`);
    window.util.setDisabled(document
                                    .querySelector(`.ad-form`)
                                    .querySelectorAll(`fieldset`), true);
    window.util.setDisabled(document
                                    .querySelector(`.map__filters`), true);
    document
            .querySelector(`.map`)
            .classList.add(`map--faded`);
    const pinsElements = document
                                .querySelector(`.map__pins`)
                                .querySelectorAll(`[type="button"]`);
    for (let i = 0; i < pinsElements.length; i++) {
      document
              .querySelector(`.map__pins`)
              .removeChild(pinsElements[i]);
    }
  };

  document
          .querySelector(`.ad-form__reset`)
          .addEventListener(`click`, onFormReset);

  pageForm.addEventListener(`submit`, (evt) => {
    window.upload.clientUpload(new FormData(pageForm), () => {
      window.util.setDisabled(
          pageForm.querySelectorAll(`fieldset`), true);
    });
    evt.preventDefault();
  });

  window.form = {
    setActiveForm,
    onPriceValidation
  };
})();
