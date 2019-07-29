'use strict';

(function () {
  var MAIN_PIN_Y = 375;
  var firstActivation = true;

  var onChangeDeviceWidth = function () {
    window.pin.LimitLocation.POSITION_MAX_X = window.pin.map.offsetWidth;
  };

  // creates function for active state
  var onActivateMap = function () {
    window.pin.map.classList.remove('map--faded');
    window.form.adForm.classList.remove('ad-form--disabled');
    window.utils.switchDisableAttribute(window.form.adFieldset, false);
    window.utils.switchDisableAttribute(window.form.adInput, false);
    window.utils.switchDisableAttribute(window.form.adSelect, false);
    window.utils.switchDisableAttribute(window.filters.filterFieldset, false);
    window.utils.switchDisableAttribute(window.filters.filterSelect, false);
    window.utils.switchDisableAttribute(window.filters.filterInput, false);

    if (firstActivation) {
      window.backend.getStoredtData(window.data.onSuccess, window.data.onError);
      firstActivation = false;
    }
  };

  // resets form and map settings
  var onResetPage = function () {
    window.pin.map.classList.add('map--faded');
    window.form.adForm.classList.add('ad-form--disabled');
    window.utils.switchDisableAttribute(window.form.adFieldset, true);
    window.utils.switchDisableAttribute(window.form.adInput, true);
    window.utils.switchDisableAttribute(window.form.adSelect, true);
    window.form.adForm.reset();
    window.filters.filtersOfMap.reset();
    window.pin.mainPin.style.left = window.pin.LimitLocation.POSITION_MAX_X / 2 - window.pin.PinSize.MAIN_PIN_WIDTH / 2 + 'px';
    window.pin.mainPin.style.top = MAIN_PIN_Y + 'px';
    window.form.setAdressLocation(window.pin.mainPin.style.left, window.pin.mainPin.style.top);
    window.pin.removePins();
    window.card.closePopup();
    firstActivation = true;

    window.form.timeIn.removeEventListener('change', window.form.onFieldValueChange);
    window.form.timeOut.removeEventListener('change', window.form.onFieldValueChange);
    window.form.offerType.removeEventListener('change', window.form.onHousingTypeChange);
    window.form.selectRooms.removeEventListener('change', window.form.onRoomsCountChange);
  };

  window.addEventListener('resize', onChangeDeviceWidth);

  window.map = {
    onActivateMap: onActivateMap,
    onResetPage: onResetPage
  };
})();
