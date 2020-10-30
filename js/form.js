'use strict';

(() => {
  const onRoomsValidation = () => {
    const roomInput = document.querySelector(`#room_number`);
    const capacityInput = document.querySelector(`#capacity`);
    let validationMessage = ``;

    if (roomInput.value < capacityInput.value || roomInput.value !== `100` && capacityInput.value === `0` || roomInput.value === `100` && capacityInput.value > `0`) {
      validationMessage = `Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей`;
    }

    roomInput.setCustomValidity(validationMessage);
  };

  const priceValidation = () => {
    const typeOfHousing = document.querySelector(`#type`);

    const onPriceValidation = () => {
      const pricePerNight = document.querySelector(`#price`);
      const MinPrice = {
        BUNGALOW: 0,
        FLAT: 1000,
        HOUSE: 5000,
        PALACE: 10000,
      };
      let minPrice = 0;

      switch (typeOfHousing.value) {
        case `bungalow`:
          minPrice = MinPrice.BUNGALOW;
          break;
        case `flat`:
          minPrice = MinPrice.FLAT;
          break;
        case `house`:
          minPrice = MinPrice.HOUSE;
          break;
        case `palace`:
          minPrice = MinPrice.PALACE;
          break;
      }

      window.util.setElementAttribute(pricePerNight, `placeholder`, minPrice);
      window.util.setElementAttribute(pricePerNight, `min`, minPrice);
    };

    typeOfHousing.addEventListener(`click`, () => {
      onPriceValidation();
    });
  };

  const timeValidation = () => {
    const timeInInput = document.querySelector(`#timein`);
    const timeOutInput = document.querySelector(`#timeout`);

    const onTimeValidation = (evt) => {
      timeInInput.value = evt.target.value;
      timeOutInput.value = evt.target.value;
    };

    timeInInput.addEventListener(`change`, onTimeValidation);
    timeOutInput.addEventListener(`change`, onTimeValidation);
  };

  const onFormSubmit = () => {
    const submitButton = document.querySelector(`.ad-form__submit`);
    submitButton.addEventListener(`click`, () => {
      onRoomsValidation();
      priceValidation();
    });
  };

  window.form = {
    onRoomsValidation,
    priceValidation,
    timeValidation,
    onFormSubmit
  };
})();
