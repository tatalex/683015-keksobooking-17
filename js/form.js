'use strict';

(function () {
  var adForm = document.querySelector('.ad-form');
  var mapFilters = document.querySelector('.map__filters');
  var adFieldset = adForm.querySelectorAll('fieldset');
  var mapSelect = mapFilters.querySelectorAll('select');
  var mapFieldset = mapFilters.querySelectorAll('fieldset');
  var address = adForm.querySelector('#address');

  var offerType = adForm.querySelector('#type');
  var price = adForm.querySelector('#price');
  var timeIn = adForm.querySelector('#timein');
  var timeOut = adForm.querySelector('#timeout');

  var resetForm = adForm.querySelector('.ad-form__reset');

  // switches disable attribute
  var switchDisableAttribute = function (elements, value) {
    for (var i = 0; i < elements.length; i++) {
      elements[i].disabled = value;
    }
  };

  // synchronizes the time of departure and entry
  var onFieldValueChange = function (evt) {
    var target = evt.target;
    var selectedField = target === timeOut ? timeIn : timeOut;
    selectedField.value = target.value;
  };

  // synchronizes housing type and price
  var onHousingTypeChange = function () {
    var minPriceOfType = window.TYPES_OF_HOUSING[offerType.value];

    price.min = minPriceOfType;
    price.placeholder = minPriceOfType;
  };

  // adds location to address field
  var setAdressLocation = function (coordinateX, coordinateY) {
    coordinateX = Math.ceil(window.mainPin.offsetLeft + window.MAIN_PIN_WIDTH / 2);
    coordinateY = Math.ceil(window.mainPin.offsetTop + window.MAIN_PIN_HEIGHT);
    address.value = coordinateX + ', ' + coordinateY;
  };

  setAdressLocation();
  switchDisableAttribute(adFieldset, true);
  switchDisableAttribute(mapFieldset, true);
  switchDisableAttribute(mapSelect, true);
  timeIn.addEventListener('change', onFieldValueChange);
  timeOut.addEventListener('change', onFieldValueChange);
  offerType.addEventListener('change', onHousingTypeChange);
  resetForm.addEventListener('click', window.maps.onResetPage);

  window.adForm = adForm;
  window.mapFieldset = mapFieldset;
  window.mapSelect = mapSelect;
  window.adFieldset = adFieldset;

  window.form = {
    switchDisableAttribute: switchDisableAttribute,
    setAdressLocation: setAdressLocation
  };
})();
