'use strict';

(() => {
  const mapFilters = document.querySelector(`.map__filters`);
  const filterHousingType = mapFilters.querySelector(`#housing-type`);

  filterHousingType.addEventListener(`change`, () => {
    window.util.onCardRemove();
    window.util.onPinsRemove();
    window.render.onCreatePins();
  });

  window.filter = {
    filterHousingType
  };
})();
