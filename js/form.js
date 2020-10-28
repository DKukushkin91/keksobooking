'use strict';

(() => {
  const onFormActivate = () => {

    const adForm = document.querySelector(`.ad-form`);
    window.util.setDisabled(window.form.adFieldset, true);
    window.form = {
      setActiveForm: () => {
        adForm.classList.remove(`ad-form--disabled`);
      },
      adFieldset: adForm.querySelectorAll(`fieldset`)
    };

    window.form = {
      addressField: adForm.querySelector(`#address`),
      mapFilters: document.querySelector(`.map__filters`),
      onValidationForm: () => {
        const roomInput = adForm.querySelector(`#room_number`);
        const capacityInput = adForm.querySelector(`#capacity`);
        const submitButton = adForm.querySelector(`.ad-form__submit`);
        const typeOfHousing = adForm.querySelector(`#type`);
        const pricePerNight = adForm.querySelector(`#price`);
        const MinPrice = {
          BUNGALOW: 0,
          FLAT: 1000,
          HOUSE: 5000,
          PALACE: 10000,
        };

        window.util.setDisabled(window.form.mapFilters, true);

        const onRoomsValidation = () => {
          let validationMessage = ``;

          if (roomInput.value < capacityInput.value || roomInput.value !== `100` && capacityInput.value === `0` || roomInput.value === `100` && capacityInput.value > `0`) {
            validationMessage = `Количество гостей, не должно привышать количество комнат, 100 комнат не для гостей`;
          }

          roomInput.setCustomValidity(validationMessage);
        };

        window.form = {
          onPriceValidation: () => {
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
          }
        };

        typeOfHousing.addEventListener(`click`, () => {
          window.form.onPriceValidation();
        });

        const timeInInput = document.querySelector(`#timein`);
        const timeOutInput = document.querySelector(`#timeout`);

        const onTimeValidation = (evt) => {
          timeInInput.value = evt.target.value;
          timeOutInput.value = evt.target.value;
        };

        timeInInput.addEventListener(`change`, onTimeValidation);
        timeOutInput.addEventListener(`change`, onTimeValidation);

        submitButton.addEventListener(`click`, () => {
          onRoomsValidation();
          window.form.onPriceValidation();
        });
      }
    };
  };
  window.form = {
    onFormActivate
  };
})();
