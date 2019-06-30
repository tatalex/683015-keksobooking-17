'use strict';

(function () {
  var MAIN_PIN_Y = 375;

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

    // resets form and map settings
  var onResetPage = function () {
    window.map.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    window.form.switchDisableAttribute(window.adFieldset, true);
    window.form.switchDisableAttribute(window.mapFieldset, true);
    window.form.switchDisableAttribute(window.mapSelect, true);
    window.adForm.reset();
    window.mainPin.style.left = window.POSITION_MAX_X / 2 - window.MAIN_PIN_WIDTH / 2 + 'px';
    window.mainPin.style.top = MAIN_PIN_Y + 'px';
    window.form.setAdressLocation(window.mainPin.style.left, window.mainPin.style.top);
    window.pin.removePins();
  };

  window.addEventListener('resize', onChangeDeviceWidth);

  window.maps = {
    activateMap: activateMap,
    onResetPage: onResetPage
  };
})();
