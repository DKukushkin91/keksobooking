'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const DEFAULT_PREVIEW = `img/muffin-grey.svg`;
const formAvatarElement = document.querySelector(`#avatar`);
const formPreviewAvatarElement = document.querySelector(`.ad-form-header__preview img`);
const formPhotoElement = document.querySelector(`#images`);
const formPreviewPhotoElement = document.querySelector(`.ad-form__photo`);

formPreviewPhotoElement.style.display = `flex`;
formPreviewPhotoElement.style.alignItems = `center`;
formPreviewPhotoElement.style.padding = `13px 15px`;
formPreviewPhotoElement.insertAdjacentHTML(`afterbegin`, `<img width="40">`);
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
  formPreviewAvatarElement.src = DEFAULT_PREVIEW;
  previewPhoto.src = ``;
};

pictureUploadHandler(formAvatarElement, formPreviewAvatarElement);
pictureUploadHandler(formPhotoElement, previewPhoto);

window.picture = {
  removePreview
};
