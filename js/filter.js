'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);

  mapFilters.querySelector(`#housing-type`).addEventListener(`change`, () => {
    window.util.onCardRemove();
    window.util.onPinsRemove();
    window.render.onCreatePins();
  });

})();
