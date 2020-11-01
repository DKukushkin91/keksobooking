'use strict';
(() =>{
  const roomInput = document.querySelector(`#room_number`);
  const capacityInput = document.querySelector(`#capacity`);
  const typeOfHousing = document.querySelector(`#type`);
  const pricePerNight = document.querySelector(`#price`);

  const setActiveForm = () => {
    document
            .querySelector(`.ad-form`)
            .classList.remove(`ad-form--disabled`);
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

  document
          .querySelector(`.ad-form__submit`)
          .addEventListener(`click`, () => {
            onRoomsValidation();
            onPriceValidation();
          });

  window.form = {
    setActiveForm,
    onPriceValidation
  };
})();
