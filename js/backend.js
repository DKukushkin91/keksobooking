'use strict';
const xhrHandler = (restart, success, error) => {
xhr.addEventListener(`load`, () => {
  if (xhr.status === StatusCode.OK) {
    onSuccess(xhr.response);
    restart,
    success
  } else {
    onError(getShowErrorElement(`Статус ответа: ${xhr.status} ${xhr.statusText}`));
  }
});
xhr.addEventListener(`error`, () => {
  error;
});
xhr.addEventListener(`timeout`, () => {
  error;
});

xhr.timeout = TIMEOUT_IN_MS;
};
