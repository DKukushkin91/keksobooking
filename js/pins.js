'use strict';

const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapMainPinElement = document.querySelector(`.map__pin--main`);

const setPinCoordinate = () => {
  window.form.writeAddress(mapMainPinElement.offsetLeft + window.data.TailSize.HEIGHT + window.data.TailSize.WIDTH, mapMainPinElement.offsetTop);
};

const setPinStart = () => {
  mapMainPinElement.style.top = window.data.PinStart.Y;
  mapMainPinElement.style.left = window.data.PinStart.X;
};

setPinCoordinate();

const removeActivePin = () => {
  const mapPinActiveElement = document.querySelector(`.map__pin--active`);
  if (mapPinActiveElement) {
    mapPinActiveElement.classList.remove(`map__pin--active`);
  }
};

const getRenderPin = (pin) => {
  const pinCloneNode = pinTemplate.cloneNode(true);
  const pinElement = pinCloneNode.querySelector(`img`);
  pinElement.src = pin.author.avatar;
  pinElement.alt = pin.offer.title;
  pinCloneNode.style.left = `${pin.location.x - window.data.PinSize.WIDTH}px`;
  pinCloneNode.style.top = `${pin.location.y - window.data.PinSize.HEIGHT}px`;
  return pinCloneNode;
};

const pinActivePageHandler = (evt) => {
  if (evt.button === 0) {
    window.main.setActivePage();
    setPinStart();
    mapMainPinElement.removeEventListener(`mousedown`, pinActivePageHandler);
  }
};

const getCheckXPin = (x) => {
  const maxX = window.data.MapX.MAX - window.data.PinSize.WIDTH / 2;
  const minX = window.data.MapX.MIN - window.data.PinSize.WIDTH / 2;
  if (x > maxX) {
    return maxX;
  }

  if (x < minX) {
    return minX;
  }
  return x;
};

const getCheckYPin = (y) => {
  const minY = window.data.MapY.MIN - window.data.PinSize.HEIGHT;
  if (y > window.data.MapY.MAX) {
    return window.data.MapY.MAX;
  }

  if (y < minY) {
    return minY;
  }
  return y;
};

mapMainPinElement.addEventListener(`mousedown`, (evt) => {
  evt.preventDefault();
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const mouseMoveHandler = (moveEvt) => {
    moveEvt.preventDefault();
    setPinCoordinate();

    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const newX = mapMainPinElement.offsetLeft - shift.x;
    const newY = mapMainPinElement.offsetTop - shift.y;

    mapMainPinElement.style.left = `${getCheckXPin(newX)}px`;
    mapMainPinElement.style.top = `${getCheckYPin(newY)}px`;
  };

  const mouseUpHandler = (upEvt) => {
    upEvt.preventDefault();
    document.removeEventListener(`mousemove`, mouseMoveHandler);
    document.removeEventListener(`mouseup`, mouseUpHandler);
  };

  document.addEventListener(`mousemove`, mouseMoveHandler);
  document.addEventListener(`mouseup`, mouseUpHandler);
});

mapMainPinElement.addEventListener(`mousedown`, pinActivePageHandler);

const pinKeydownHandler = (evt) => {
  if (evt.key === `Enter`) {
    window.main.setActivePage();
    window.form.writeAddress(mapMainPinElement.offsetLeft, mapMainPinElement.offsetTop);
    mapMainPinElement.removeEventListener(`keydown`, pinKeydownHandler);
  }
};

mapMainPinElement.addEventListener(`keydown`, pinKeydownHandler);

window.pins = {
  getRenderPin,
  pinActivePageHandler,
  setPinCoordinate,
  removeActivePin,
  setPinStart
};
