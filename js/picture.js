"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const uploadAvatar = document.querySelector(`#avatar`);
const previewAvatar = document.querySelector(`.ad-form-header__preview img`);
const uploadPhoto = document.querySelector(`#images`);
const adFormPhoto = document.querySelector(`.ad-form__photo`);
const defaultPreview = `img/muffin-grey.svg`;

adFormPhoto.style.display = `flex`;
adFormPhoto.style.alignItems = `center`;
adFormPhoto.style.padding = `0 15px`;
adFormPhoto.insertAdjacentHTML(`afterbegin`, `<img src="img/muffin-grey.svg" alt="Фотография жилья" width="40" height="44">`);
const previewPhoto = adFormPhoto.firstChild;

const getPictureSet = (element, attribute) => {
  element.addEventListener(`change`, () => {
    const file = element.files[0];
    const fileName = file.name.toLowerCase();

    const matches = FILE_TYPES.some((it) => {
      return fileName.endsWith(it);
    });

    if (matches) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        attribute.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const removePreview = () => {
  previewAvatar.src = defaultPreview;
  previewPhoto.src = defaultPreview;
};

getPictureSet(uploadAvatar, previewAvatar);
getPictureSet(uploadPhoto, previewPhoto);

window.picture = {
  removePreview
};
