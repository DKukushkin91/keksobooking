'use strict';

(() => {
  const setActivePage = () => {
    window.map.setMapActive();
    window.pin.createPin();
    window.util.setDisabled(window.form.adFieldset, false);
    window.util.setDisabled(window.form.mapFilters, false);
    window.form.setActiveForm();
    window.form.onPriceValidation();
  };
  window.page = {
    setActivePage
  };
})();
