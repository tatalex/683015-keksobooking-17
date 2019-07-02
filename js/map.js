'use strict';

(function () {
  var MAIN_PIN_Y = 375;
  var firstActivation = true;

  var onChangeDeviceWidth = function () {
    window.POSITION_MAX_X = window.map.offsetWidth;
  };

  // creates function for active state
  var onActivateMap = function () {
    window.utils.switchDisableAttribute(window.adFieldset, false);
    window.utils.switchDisableAttribute(window.mapFieldset, false);
    window.utils.switchDisableAttribute(window.mapSelect, false);
    window.map.classList.remove('map--faded');
    window.adForm.classList.remove('ad-form--disabled');

    if (firstActivation) {
      window.load.requestData(window.data.onSuccess, window.data.onError);
      firstActivation = false;
    }
  };

  // resets form and map settings
  var onResetPage = function () {
    window.map.classList.add('map--faded');
    window.adForm.classList.add('ad-form--disabled');
    window.utils.switchDisableAttribute(window.adFieldset, true);
    window.utils.switchDisableAttribute(window.mapFieldset, true);
    window.utils.switchDisableAttribute(window.mapSelect, true);
    window.adForm.reset();
    window.mainPin.style.left = window.POSITION_MAX_X / 2 - window.MAIN_PIN_WIDTH / 2 + 'px';
    window.mainPin.style.top = MAIN_PIN_Y + 'px';
    window.form.setAdressLocation(window.mainPin.style.left, window.mainPin.style.top);
    window.pin.removePins();
    firstActivation = true;
  };

  window.addEventListener('resize', onChangeDeviceWidth);

  window.maps = {
    onActivateMap: onActivateMap,
    onResetPage: onResetPage
  };
})();
