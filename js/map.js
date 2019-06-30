'use strict';

(function () {

  var onChangeDeviceWidth = function () {
    window.POSITION_MAX_X = window.map.offsetWidth;
  };

  // creates function for active state
  var activateMap = function () {
    window.form.switchDisableAttribute(window.adFieldset, false);
    window.form.switchDisableAttribute(window.mapFieldset, false);
    window.form.switchDisableAttribute(window.mapSelect, false);
    window.map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');
  };

  window.addEventListener('resize', onChangeDeviceWidth);

  window.maps = {
    activateMap: activateMap
  };
})();
