"use strict";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const formAvatarElement = document.querySelector(`#avatar`);
const formPreviewAvatarElement = document.querySelector(`.ad-form-header__preview img`);
const formPhotoElement = document.querySelector(`#images`);
const formPreviewPhotoElement = document.querySelector(`.ad-form__photo`);
const defaultPreview = `img/muffin-grey.svg`;

formPreviewPhotoElement.style.display = `flex`;
formPreviewPhotoElement.style.alignItems = `center`;
formPreviewPhotoElement.style.padding = `0 15px`;
formPreviewPhotoElement.insertAdjacentHTML(`afterbegin`, `<img src="img/muffin-grey.svg" alt="Фотография жилья" width="40" height="44">`);
const previewPhoto = formPreviewPhotoElement.firstChild;

const pictureUploadHandler = (element, attribute) => {
  element.addEventListener(`change`, () => {
    const file = element.files[0];
    const fileName = file.name.toLowerCase();

    if (FILE_TYPES.some((it) => fileName.endsWith(it))) {
      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        attribute.src = reader.result;
      });

      reader.readAsDataURL(file);
    }
  });
};

const removePreview = () => {
  formPreviewAvatarElement.src = defaultPreview;
  previewPhoto.src = defaultPreview;
};

pictureUploadHandler(formAvatarElement, formPreviewAvatarElement);
pictureUploadHandler(formPhotoElement, previewPhoto);

window.picture = {
  removePreview
};
