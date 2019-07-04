'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFieldset = adForm.querySelectorAll('fieldset');
  var mapSelect = mapFilters.querySelectorAll('select');
  var mapFieldset = mapFilters.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');
  var TYPES_OF_HOUSING = {
    palace: 10000,
    flat: 1000,
    house: 5000,
    bungalo: 0
  };

  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var resetForm = adForm.querySelector('.ad-form__reset');

  // synchronizes the time of departure and entry
  var onFieldValueChange = function (evt) {
    var target = evt.target;
    var selectedField = target === timeOut ? timeIn : timeOut;
    selectedField.value = target.value;
  };

  // synchronizes housing type and price
  var onHousingTypeChange = function () {
    var minPriceOfType = TYPES_OF_HOUSING[offerType.value];

    price.min = minPriceOfType;
    price.placeholder = minPriceOfType;
  };

  // adds location to address field
  var setAdressLocation = function (coordinateX, coordinateY) {
    coordinateX = Math.ceil(window.mainPin.offsetLeft + window.PinSize.MAIN_PIN_WIDTH / 2);
    coordinateY = Math.ceil(window.mainPin.offsetTop + window.PinSize.MAIN_PIN_HEIGHT);
    address.value = coordinateX + ', ' + coordinateY;
  };

  setAdressLocation();
  window.utils.switchDisableAttribute(adFieldset, true);
  window.utils.switchDisableAttribute(mapFieldset, true);
  window.utils.switchDisableAttribute(mapSelect, true);
  timeIn.addEventListener('change', onFieldValueChange);
  timeOut.addEventListener('change', onFieldValueChange);
  offerType.addEventListener('change', onHousingTypeChange);
  resetForm.addEventListener('click', window.maps.onResetPage);

  window.adForm = adForm;
  window.mapFieldset = mapFieldset;
  window.mapSelect = mapSelect;
  window.adFieldset = adFieldset;

  window.form = {
    setAdressLocation: setAdressLocation
  };
})();
