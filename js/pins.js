'use strict';

const formAddressElement = document.querySelector(`#address`);
const pinTemplate = document.querySelector(`#pin`)
  .content
  .querySelector(`.map__pin`);
const mapMainPinElement = document.querySelector(`.map__pin--main`);

const writeAddress = (addressX, addressY) => {
  formAddressElement.value = `${addressX}, ${addressY}`;
};

const setElementCoordinate = () => {
  writeAddress(mapMainPinElement.offsetLeft + Math.floor(window.data.PinSize.WIDTH / 2),
      mapMainPinElement.offsetTop + window.data.PinSize.WIDTH + window.data.TailSize.HEIGHT);
};

const setElementStart = () => {
  mapMainPinElement.style.top = `${window.data.PinStart.Y}px`;
  mapMainPinElement.style.left = `${window.data.PinStart.X}px`;
};

const removeActiveElement = () => {
  const mapPinActiveElement = document.querySelector(`.map__pin--active`);
  if (mapPinActiveElement) {
    mapPinActiveElement.classList.remove(`map__pin--active`);
  }
};

const loadPinCoordinate = () => {
  writeAddress(mapMainPinElement.offsetLeft + Math.floor(window.data.PinSize.WIDTH / 2), mapMainPinElement.offsetTop + Math.floor(window.data.PinSize.WIDTH / 2));
};

loadPinCoordinate();
const getRenderElement = (pin) => {
  const pinCloneNode = pinTemplate.cloneNode(true);
  const pinElement = pinCloneNode.querySelector(`img`);
  pinElement.src = pin.author.avatar;
  pinElement.alt = pin.offer.title;
  pinCloneNode.style.left = `${pin.location.x - window.data.SmallPin.WIDTH}px`;
  pinCloneNode.style.top = `${pin.location.y - window.data.SmallPin.HEIGHT}px`;
  return pinCloneNode;
};

const pinActivePageHandler = (evt) => {
  if (evt.button === 0) {
    window.main.setActivePage();
    setElementCoordinate();
    mapMainPinElement.removeEventListener(`mousedown`, pinActivePageHandler);
  }
};

const getCheckXPin = (x) => {
  const maxX = window.data.MapX.MAX - window.data.PinSize.WIDTH / 2;
  const minX = window.data.MapX.MIN - Math.floor(window.data.PinSize.WIDTH / 2);
  if (x > maxX) {
    return maxX;
  }

  if (x < minX) {
    return minX;
  }
  return x;
};

const getCheckYPin = (y) => {
  const minY = window.data.MapY.MIN - window.data.PinSize.WIDTH - window.data.TailSize.HEIGHT;
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
    setElementCoordinate();
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
    setElementCoordinate();
    mapMainPinElement.removeEventListener(`keydown`, pinKeydownHandler);
  }
};

mapMainPinElement.addEventListener(`keydown`, pinKeydownHandler);

window.pins = {
  getRenderElement,
  pinActivePageHandler,
  loadPinCoordinate,
  removeActiveElement,
  setElementStart,
};
